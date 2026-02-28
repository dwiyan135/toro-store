'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/packages', label: 'Paket', icon: 'fa-layer-group' },
  { href: '/order',    label: 'Order',  icon: 'fa-shopping-cart' },
  { href: '/faq',      label: 'FAQ',    icon: 'fa-circle-question' },
];

export function Navigation() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  useEffect(() => { setMobileMenu(false); }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled || mobileMenuOpen
        ? 'bg-neutral-950/90 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
        : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center relative z-20">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Toro Store" width={110} height={55} className="object-contain drop-shadow-lg" priority />
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenu(v => !v)}
          aria-label="Toggle Menu"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark text-red-400' : 'fa-bars text-white'} text-xl transition-all`} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                isActive(link.href)
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/order"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-blue-500/20"
        >
          <i className="fa-brands fa-whatsapp" /> Order Sekarang
        </Link>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-neutral-950/98 z-10 md:hidden transition-transform duration-300 flex flex-col pt-24 px-6 pb-8 gap-4 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-semibold transition-all ${
                isActive(link.href)
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-neutral-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              <i className={`fa-solid ${link.icon} w-6 text-center text-neutral-500`} />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href="/order"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold text-lg transition-all shadow-lg shadow-blue-500/20"
          >
            <i className="fa-brands fa-whatsapp text-2xl" /> Mulai Pemesanan
          </Link>
        </div>
      </div>
    </header>
  );
}
