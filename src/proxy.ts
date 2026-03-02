import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'toro_store_jwt_fallback_2024'
);

async function getTokenPayload(request: NextRequest) {
  const token = request.cookies.get('session')?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── /admin routes ──────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const payload = await getTokenPayload(request);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login?from=admin', request.url));
    }
    return NextResponse.next();
  }

  // Old admin login → redirect to unified /login
  if (pathname.startsWith('/admin/login')) {
    const payload = await getTokenPayload(request);
    if (payload?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ── /reseller routes ───────────────────────────────────────────
  if (pathname.startsWith('/reseller')) {
    const payload = await getTokenPayload(request);
    if (!payload || payload.role !== 'RESELLER') {
      return NextResponse.redirect(new URL('/login?from=reseller', request.url));
    }
    return NextResponse.next();
  }

  // ── /login (prevent re-login) ──────────────────────────────────
  if (pathname === '/login') {
    const payload = await getTokenPayload(request);
    if (payload?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (payload?.role === 'RESELLER') {
      return NextResponse.redirect(new URL('/reseller', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/reseller/:path*', '/login'],
};
