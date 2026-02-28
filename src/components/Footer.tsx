import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-neutral-800 pt-14 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="Toro Store" width={120} height={60} className="object-contain drop-shadow-lg" />
            </Link>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed mb-5">
              Layanan Gift Skin &amp; Event Pass Mobile Legends terpercaya di Indonesia. Jujur, cepat, dan 100% aman.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition">
                <i className="fa-brands fa-instagram text-sm" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition">
                <i className="fa-brands fa-telegram text-sm" />
              </a>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'}`} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center text-[#25d366] hover:bg-[#25d366] hover:text-white transition">
                <i className="fa-brands fa-whatsapp text-sm" />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-bold mb-4 text-sm text-neutral-200">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/',         label: 'Beranda' },
                { href: '/packages', label: 'Katalog Paket' },
                { href: '/order',    label: 'Pesan Sekarang' },
                { href: '/faq',      label: 'FAQ & Panduan' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-neutral-500 hover:text-blue-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-bold mb-4 text-sm text-neutral-200">Disclaimer</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Toro Store berdiri secara independen dan bukan bagian dari Moonton. Semua logo dan merek dagang Mobile Legends adalah properti Moonton.
            </p>
            <div className="mt-4 space-y-1.5 text-xs text-neutral-600">
              <p><i className="fa-solid fa-shield-halved text-blue-400/60 mr-2" />Transaksi dijamin amanah</p>
              <p><i className="fa-solid fa-bolt text-amber-400/60 mr-2" />Fast response 24 jam</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 text-center text-xs text-neutral-700">
          <p>&copy; {new Date().getFullYear()} Toro Store. All rights reserved.</p>
        </div>
      </div>

      {/* Floating WA button — mobile only */}
      <a href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'}`} target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 w-[52px] h-[52px] bg-[#25d366] text-white rounded-full flex items-center justify-center text-2xl shadow-xl shadow-[#25d366]/30 hover:scale-110 transition-transform z-40 md:hidden"
        aria-label="Chat WhatsApp">
        <i className="fa-brands fa-whatsapp" />
      </a>
    </footer>
  );
}
