'use server';

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'toro_store_jwt_fallback_2024'
);

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return { error: 'Username atau password salah.' };
  }
  if (!user.isActive) {
    return { error: 'Akun tidak aktif. Hubungi admin.' };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: 'Username atau password salah.' };
  }

  const token = await new SignJWT({
    userId: user.id,
    role: user.role,
    storeName: user.storeName ?? '',
    username: user.username,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return { success: true, role: user.role };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    path: '/',
    maxAge: 0,
  });
}

export async function getSessionUser() {
  const { jwtVerify } = await import('jose');
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; role: string; storeName: string; username: string };
  } catch {
    return null;
  }
}

/** Seeds the default admin user if none exists */
export async function seedAdminUser() {
  const existing = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (existing) return;

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin_toro', 10);
  await prisma.user.create({
    data: {
      username: 'admin',
      passwordHash: hashed,
      role: 'ADMIN',
      fullName: 'Administrator',
      phone: '0',
      storeName: 'Toro Store Admin',
      isActive: true,
    },
  });
}
