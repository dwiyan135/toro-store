'use client';

import { useEffect, useState, useMemo } from 'react';
import { getPackages } from '@/actions/package';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PackageModal } from '@/components/PackageModal';

type Package = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  category: string;
  imageUrl: string | null;
  stock: number;
};

const CATEGORIES = ['Semua', 'Basic', 'Premium', 'Special', 'Event', 'Limited'];

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Semua');
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);

  useEffect(() => {
    getPackages().then(data => {
      setPackages(data as Package[]);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (category === 'Semua') return packages;
    return packages.filter(p => p.category === category);
  }, [packages, category]);

  return (
    <main className="flex flex-col min-h-screen font-sans bg-[#0a0c12]">
      <Navigation />

      <section className="pt-32 pb-24 relative flex-1">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Katalog <span className="text-blue-400">Paket</span></h1>
            <p className="text-neutral-400 max-w-xl mx-auto">Pilih paket gift skin sesuai dengan kebutuhanmu. Tersedia berbagai pilihan lengkap.</p>
          </div>

          {/* Categories Tab */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  category === cat
                    ? 'bg-blue-500 text-neutral-950 shadow-lg shadow-blue-500/20'
                    : 'bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-[#0d0f17] border border-dashed border-white/10 rounded-3xl">
              <i className="fa-solid fa-box-open text-4xl text-neutral-600 mb-4 block" />
              <p className="text-neutral-400">Belum ada paket di kategori ini.</p>
              {category !== 'Semua' && (
                <button onClick={() => setCategory('Semua')} className="mt-4 text-blue-400 hover:underline text-sm font-semibold">
                  Lihat Semua Paket
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(pkg => {
                const outOfStock = pkg.stock <= 0;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className="text-left group relative bg-[#0d0f17] border border-white/5 hover:border-blue-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-neutral-800 overflow-hidden">
                      {pkg.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fa-solid fa-image text-4xl text-neutral-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 text-neutral-300 backdrop-blur-sm border border-white/10">
                        {pkg.category}
                      </div>
                      <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
                        outOfStock ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : pkg.stock <= 5 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {outOfStock ? 'Habis' : pkg.stock <= 5 ? `Sisa ${pkg.stock}` : 'Tersedia'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">{pkg.name}</h3>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-amber-400 font-extrabold text-lg">{pkg.price}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                          outOfStock 
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-neutral-950'
                        }`}>
                          {outOfStock ? 'Lihat Detail' : (
                            <>Order <i className="fa-solid fa-arrow-right text-[10px]" /></>
                          )}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <PackageModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </main>
  );
}
