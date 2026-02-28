import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'draft_session'

function getSecret() {
  const secret = process.env.DRAFT_ADMIN_SECRET
  if (!secret) return null
  return new TextEncoder().encode(secret)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /insights/draft/* routes (except login)
  if (!pathname.startsWith('/insights/draft')) {
    return NextResponse.next()
  }

  // Allow the login page through
  if (pathname === '/insights/draft/login') {
    // If already authenticated, redirect to dashboard
    const token = request.cookies.get(SESSION_COOKIE)?.value
    if (token) {
      const secret = getSecret()
      if (secret) {
        try {
          await jwtVerify(token, secret)
          return NextResponse.redirect(new URL('/insights/draft', request.url))
        } catch {
          // Token invalid — let them see login page
        }
      }
    }
    return NextResponse.next()
  }

  // All other /insights/draft/* routes require authentication
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/insights/draft/login', request.url))
  }

  const secret = getSecret()
  if (!secret) {
    return NextResponse.redirect(new URL('/insights/draft/login', request.url))
  }

  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    // Token expired or invalid
    const response = NextResponse.redirect(
      new URL('/insights/draft/login', request.url)
    )
    response.cookies.delete(SESSION_COOKIE)
    return response
  }
}

export const config = {
  matcher: ['/insights/draft/:path*'],
}
