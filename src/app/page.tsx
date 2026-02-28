import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen font-sans">
      <Navigation />

      {/* HERO */}
      <section className="relative flex-1 flex items-center justify-center pt-28 pb-24 md:pt-40 md:pb-36 overflow-hidden min-h-[90vh]">
        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-semibold mb-8 animate-pulse">
            <i className="fa-solid fa-crown" /> Premium MLBB Services
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl mx-auto">
            Gift Skin MLBB{' '}
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Cepat &amp; Aman
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Harga transparan, proses jelas, siap bantu event terbaru. Tingkatkan pengalaman bermainmu bersama{' '}
            <span className="text-white font-semibold">Toro Store</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/packages"
              className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-full transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group text-base"
            >
              Lihat Paket <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/order"
              className="w-full sm:w-auto px-8 py-4 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 text-base"
            >
              <i className="fa-solid fa-shopping-cart text-neutral-400" /> Order Sekarang
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 text-neutral-500 text-sm font-medium">
            <div className="flex items-center gap-2"><i className="fa-solid fa-bolt text-amber-400" /> Fast Process</div>
            <div className="flex items-center gap-2"><i className="fa-solid fa-shield-halved text-blue-400" /> 100% Trusted</div>
            <div className="flex items-center gap-2"><i className="fa-solid fa-hand-holding-dollar text-emerald-400" /> Harga Jelas</div>
          </div>
        </div>
      </section>

      {/* Quick preview stats */}
      <section className="bg-neutral-950 border-y border-white/5 py-10">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          {[
            { num: '500+', label: 'Order Selesai',   icon: 'fa-check-circle',       color: 'text-emerald-400' },
            { num: '4.9★', label: 'Rating Pembeli',  icon: 'fa-star',               color: 'text-amber-400' },
            { num: '24/7', label: 'Admin Online',    icon: 'fa-headset',             color: 'text-blue-400' },
            { num: '100%', label: 'Aman & Terpercaya', icon: 'fa-shield-halved',    color: 'text-purple-400' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <i className={`fa-solid ${s.icon} text-2xl ${s.color} mb-2 block`} />
              <div className="text-2xl font-extrabold">{s.num}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-bold mb-4">
              <i className="fa-solid fa-clipboard-list" /> CARA ORDER
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold">3 Langkah Mudah</h2>
            <p className="text-neutral-500 mt-3">Proses cepat, transparan, dan aman.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { n: '1', color: 'border-blue-500/30 bg-blue-500/5',   num_color: 'text-blue-400',    title: 'Pilih Paket & Isi Form', desc: 'Pilih paket sesuai kebutuhan dan isi data ID MLBB kamu.' },
              { n: '2', color: 'border-amber-500/30 bg-amber-500/5', num_color: 'text-amber-400',  title: 'Kirim via WhatsApp',       desc: 'Sistem generate pesan WA otomatis untuk konfirmasi ke admin.' },
              { n: '3', color: 'border-emerald-500/30 bg-emerald-500/5', num_color: 'text-emerald-400', title: 'Bayar & Tunggu',    desc: 'Bayar, tunggu pertemanan 7 hari MLBB, skin dikirim!' },
            ].map(s => (
              <div key={s.n} className={`p-6 rounded-2xl border ${s.color} text-center relative`}>
                <div className={`w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-4 border border-neutral-700 ${s.num_color} text-xl font-extrabold`}>{s.n}</div>
                <h4 className="font-bold mb-2">{s.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/order" className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-full transition-all shadow-lg shadow-blue-500/20">
              <i className="fa-brands fa-whatsapp" /> Mulai Order Sekarang
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
