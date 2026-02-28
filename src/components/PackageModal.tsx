'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

type Package = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  category: string;
  imageUrl: string | null;
  stock: number;
};

type Props = {
  pkg: Package | null;
  onClose: () => void;
};

export function PackageModal({ pkg, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (pkg) { document.body.style.overflow = 'hidden'; }
    return () => { document.body.style.overflow = ''; };
  }, [pkg]);

  if (!pkg) return null;

  const outOfStock = pkg.stock <= 0;
  const lowStock   = pkg.stock > 0 && pkg.stock <= 5;

  const orderUrl = `/order?pkg=${pkg.id}`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-0 sm:px-4"
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg max-h-[90vh] bg-[#0d0f17] border border-white/10 rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300">
        {/* Image */}
        <div className="relative h-52 sm:h-60 bg-neutral-800 shrink-0 overflow-hidden">
          {pkg.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <i className="fa-solid fa-image text-5xl text-neutral-700" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-black/80 transition-all border border-white/10"
          >
            <i className="fa-solid fa-xmark" />
          </button>

          {/* Category + Stock badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-neutral-300 backdrop-blur-sm border border-white/10">
              {pkg.category}
            </span>
          </div>
          <div className={`absolute bottom-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            outOfStock ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : lowStock  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {outOfStock ? 'Habis' : lowStock ? `Sisa ${pkg.stock} slot` : 'Tersedia'}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-1">{pkg.name}</h2>
          <div className="text-2xl font-extrabold text-amber-400 mb-4">{pkg.price}</div>

          {pkg.description && (
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 mb-4">
              <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">{pkg.description}</p>
            </div>
          )}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-3 text-sm">
              <div className="text-neutral-500 text-xs mb-1">Kategori</div>
              <div className="font-semibold">{pkg.category}</div>
            </div>
            <div className="bg-neutral-900/60 border border-white/5 rounded-xl p-3 text-sm">
              <div className="text-neutral-500 text-xs mb-1">Stok</div>
              <div className={`font-semibold ${outOfStock ? 'text-red-400' : lowStock ? 'text-amber-400' : 'text-emerald-400'}`}>
                {outOfStock ? 'Habis' : `${pkg.stock} slot`}
              </div>
            </div>
          </div>

          {/* Process steps */}
          <div className="space-y-2 mb-5">
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Proses Pengiriman</h4>
            {[
              'Pertemanan MLBB 7 hari wajib dipenuhi',
              'Skin dikirim otomatis via Gift Shop di hari ke-8',
              'Konfirmasi via WhatsApp setelah pembayaran',
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                <i className="fa-solid fa-check-circle text-emerald-400 shrink-0" />
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 p-4 sm:p-5 border-t border-white/5 bg-[#0d0f17]">
          {outOfStock ? (
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'}?text=Halo admin, saya ingin Pre-Order paket yang sedang habis stok.`}
              target="_blank" rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl transition-all text-sm"
            >
              <i className="fa-brands fa-whatsapp" /> Pre-Order via WhatsApp
            </a>
          ) : (
            <Link
              href={orderUrl}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-xl transition-all text-sm shadow-lg shadow-blue-500/25"
            >
              <i className="fa-solid fa-shopping-cart" /> Order Paket Ini
              <i className="fa-solid fa-arrow-right text-xs ml-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
