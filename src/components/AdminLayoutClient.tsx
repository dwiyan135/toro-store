'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/actions/auth';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-chart-line', exact: true },
  { href: '/admin/orders', label: 'Data Order', icon: 'fa-list-check' },
  { href: '/admin/packages', label: 'Paket', icon: 'fa-layer-group' },
  { href: '/admin/stock', label: 'Stok Lama', icon: 'fa-boxes-stacked' },
];

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <main className="min-h-screen bg-neutral-950 text-white font-sans">{children}</main>;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex h-screen bg-[#0a0c12] text-white font-sans overflow-hidden">

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#0d0f17] border-r border-white/5 flex flex-col shrink-0 z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Toro Store" width={80} height={40} className="object-contain" />
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Admin</span>
          </Link>
          <button className="lg:hidden text-neutral-500 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-medium ${isActive(item)
                ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                : 'hover:bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-4 shrink-0`}></i>
              {item.label}
              {isActive(item) && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-neutral-500 hover:text-neutral-300 hover:bg-white/5 transition-all">
            <i className="fa-solid fa-arrow-left w-4"></i> Web Utama
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-4"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Mobile topbar */}
        <header className="lg:hidden bg-[#0d0f17] border-b border-white/5 p-4 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white"
          >
            <i className="fa-solid fa-bars text-sm"></i>
          </button>
          <span className="font-bold">Toro Store Admin</span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0a0c12]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ background: '#1a1d2a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
      />
    </div>
  );
}
