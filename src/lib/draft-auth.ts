import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'draft_session'
const SESSION_MAX_AGE = 60 * 60 * 24 // 24 hours in seconds

function getSecret() {
  const secret = process.env.DRAFT_ADMIN_SECRET
  if (!secret) throw new Error('DRAFT_ADMIN_SECRET environment variable is not set')
  return new TextEncoder().encode(secret)
}

/**
 * Create a signed JWT session token
 */
export async function createSession(username: string): Promise<string> {
  const token = await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret())

  return token
}

/**
 * Verify a session token and return the payload
 */
export async function verifySession(
  token: string
): Promise<{ username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as { username: string; role: string }
  } catch {
    return null
  }
}

/**
 * Validate admin credentials against environment variables
 */
export function validateCredentials(username: string, password: string): boolean {
  const validUser = process.env.DRAFT_ADMIN_USER
  const validPass = process.env.DRAFT_ADMIN_PASS
  if (!validUser || !validPass) {
    throw new Error('DRAFT_ADMIN_USER and DRAFT_ADMIN_PASS must be set')
  }
  return username === validUser && password === validPass
}

/**
 * Get the session cookie value from the request
 */
export async function getSessionFromCookies(): Promise<{
  username: string
  role: string
} | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySession(token)
}

/**
 * Build Set-Cookie header value for the session
 */
export function buildSessionCookie(token: string): string {
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${SESSION_MAX_AGE}`,
  ]
  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure')
  }
  return parts.join('; ')
}

/**
 * Build Set-Cookie header to clear the session
 */
export function buildClearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}
