'use server';

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.ADMIN_PASSWORD || 'admin_toro_fallback_secret_key'
);

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin_toro';

  if (password !== adminPassword) {
    return { error: 'Password salah' };
  }

  // Create JWT token using edge-compatible formatting
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Set 24 hour session
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin', // Scope to admin area
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', '', {
    path: '/admin',
    maxAge: 0,
  });
}
