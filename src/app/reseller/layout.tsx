import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/actions/auth';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'toro_store_jwt_fallback_2024'
);

async function getResellerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) redirect('/login?from=reseller');
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; role: string; storeName: string; username: string };
  } catch {
    redirect('/login?from=reseller');
  }
}

async function LogoutButton() {
  return (
    <form action={async () => { 'use server'; await logout(); redirect('/login'); }}>
      <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all">
        <i className="fa-solid fa-right-from-bracket" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </form>
  );
}

export default async function ResellerLayout({ children }: { children: React.ReactNode }) {
  const session = await getResellerSession();

  const navLinks = [
    { href: '/reseller', label: 'Dashboard', icon: 'fa-solid fa-gauge' },
    { href: '/reseller/orders', label: 'Order Saya', icon: 'fa-solid fa-box-open' },
    { href: '/reseller/orders/new', label: 'Buat Order', icon: 'fa-solid fa-plus-circle' },
    { href: '/reseller/profile', label: 'Profil Saya', icon: 'fa-solid fa-id-card' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col">
      {/* Top Nav */}
      <header className="border-b border-white/5 bg-[#0a0b10] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-sm font-bold">
              T
            </div>
            <div>
              <p className="font-bold text-sm leading-none">Toro Store</p>
              <p className="text-xs text-neutral-500 leading-none mt-0.5">Reseller Portal</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/60 rounded-xl transition-all">
                <i className={link.icon} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Store name + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <i className="fa-solid fa-store text-blue-400 text-xs" />
              <span className="text-blue-300 text-xs font-semibold">{session.storeName}</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a0b10] border-t border-white/5 flex items-center justify-around h-16">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href}
            className="flex flex-col items-center gap-1 px-3 py-2 text-neutral-500 hover:text-white transition-all">
            <i className={`${link.icon} text-base`} />
            <span className="text-[10px]">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
