import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import { getUserById } from '@/actions/users';
import ProfileClient from './ProfileClient';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'toro_store_jwt_fallback_2024');

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) redirect('/login');
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string };
  } catch { redirect('/login'); }
}

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getSession();
  const profile = await getUserById(session.userId);
  if (!profile) redirect('/login');
  return <ProfileClient profile={profile} />;
}
