import { NextResponse } from 'next/server'
import {
  validateCredentials,
  createSession,
  buildSessionCookie,
} from '@/lib/draft-auth'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

// 5 login attempts per IP per 15-minute window
const LOGIN_RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 }

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const rl = rateLimit(`login:${ip}`, LOGIN_RATE_LIMIT)

    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil(rl.resetMs / 1000)) },
        }
      )
    }

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = await createSession(username)
    const response = NextResponse.json({ success: true })
    response.headers.set('Set-Cookie', buildSessionCookie(token))
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
