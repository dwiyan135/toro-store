import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckoutForm } from '@/components/CheckoutForm';

export const dynamic = 'force-dynamic';

export default function OrderPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#0a0c12] font-sans">
      <Navigation />

      <section className="pt-32 pb-24 relative flex-1">
        {/* Decorative glow */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side info */}
            <div className="lg:col-span-5 space-y-8 sticky top-32">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Mulai <span className="text-blue-400">Order</span></h1>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  Isi form pemesanan dengan teliti. Pastikan ID dan Server game Anda benar.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { n: '1', color: 'text-blue-400',    title: 'Pilih & Isi Data', desc: 'Pilih paket dan masukkan ID MLBB dengan benar.' },
                  { n: '2', color: 'text-amber-400',   title: 'Konfirmasi WA',    desc: 'Sistem merangkum pesananmu untuk dikirim ke Admin otomatis.' },
                  { n: '3', color: 'text-emerald-400', title: 'Bayar & Proses',   desc: 'Selesaikan pembayaran, berteman 7 hari, dan tunggu skin dikirim!' },
                ].map(s => (
                  <div key={s.n} className="flex gap-4 group">
                    <div className={`w-12 h-12 rounded-2xl bg-[#0d0f17] flex items-center justify-center shrink-0 border border-white/5 group-hover:border-white/20 transition-colors ${s.color} font-bold text-xl`}>
                      {s.n}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-lg leading-tight">{s.title}</h4>
                      <p className="text-neutral-500 text-sm mt-1">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                <h5 className="font-bold mb-2 flex items-center gap-2 text-blue-400">
                  <i className="fa-solid fa-headset" /> Butuh Bantuan?
                </h5>
                <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                  Bingung memilih paket atau format order? Jangan ragu untuk konsultasi langsung lewat WhatsApp.
                </p>
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'}?text=Halo admin, saya mau tanya soal gift skin.`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-neutral-950 bg-blue-500 hover:bg-blue-400 py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                  <i className="fa-brands fa-whatsapp text-lg" /> Hubungi Admin
                </a>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:col-span-7">
              <CheckoutForm />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
