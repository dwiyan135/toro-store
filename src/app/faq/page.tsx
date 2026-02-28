import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen font-sans bg-[#0a0c12]">
      <Navigation />

      <section className="pt-32 pb-24 relative flex-1">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">FAQ &amp; <span className="text-blue-400">Panduan</span></h1>
            <p className="text-neutral-400 max-w-xl mx-auto">Jawaban atas pertanyaan yang sering diajukan seputar proses gift skin MLBB di Toro Store.</p>
          </div>

          {/* WHY TORO STORE */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <i className="fa-solid fa-crown text-amber-400" /> Kenapa Memilih Toro Store?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: 'fa-bolt', color: 'group-hover:text-blue-500', title: 'Fast Response', desc: 'Admin sigap melayani pertanyaan dan mengurus antrian orderanmu dengan cepat.' },
                { icon: 'fa-shield-halved', color: 'group-hover:text-emerald-500', title: 'Aman 100%', desc: 'Proses legal via gift in-game resmi tanpa perlu memberikan password akun.' },
                { icon: 'fa-clipboard-list', color: 'group-hover:text-amber-500', title: 'Antrian Jelas', desc: 'Setiap slot pertemanan 7 hari kami rekap transparan. Tidak ada janji palsu.' },
                { icon: 'fa-calendar-star', color: 'group-hover:text-purple-500', title: 'Update Event', desc: 'Selalu support event kolaborasi terbaru dan varian pass terkini.' },
              ].map(f => (
                <div key={f.title} className="bg-[#0d0f17] border border-white/5 p-6 rounded-2xl hover:border-white/20 transition-colors group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 transition-colors ${f.color}`}>
                      <i className={`fa-solid ${f.icon} text-xl text-neutral-500 group-hover:text-current`} />
                    </div>
                    <h4 className="text-lg font-bold leading-tight">{f.title}</h4>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed pr-4">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
             <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <i className="fa-solid fa-messages text-blue-400" /> Frequently Asked Questions
            </h2>
            <div className="border border-white/5 rounded-3xl overflow-hidden bg-[#0d0f17]">
              <div className="divide-y divide-white/5">
                {[
                  { q: 'Berapa lama proses gift skin Mobile Legends?', a: 'Aturan resmi Moonton mewajibkan pertemanan in-game selama minimal 7 hari (168 jam) sebelum bisa mengirim gift. Skin akan dikirimkan otomatis dan instan pada hari ke-8 setelah masa pertemanan selesai.' },
                  { q: 'Apakah aman tanpa harus login akun saya?', a: 'Sangat aman dan 100% legal. Kami hanya membutuhkan User ID dan Server ID Anda (contoh: 1234567(1234)) untuk menambahkan pertemanan. Skin dikirimkan langsung lewat fitur Gift Shop resmi di dalam game.' },
                  { q: 'Bagaimana kalau harga event naik tiba-tiba?', a: 'Kami berkomitmen transparan sejak awal. Jika ada kebijakan dari Moonton yang merubah harga secara mendadak, admin akan mengkonfirmasi terlebih dahulu. Jika Anda membatalkan pesanan, dana akan di-refund 100% tanpa potongan.' },
                  { q: 'Apakah saya bisa ubah nickname saat delay 7 hari?', a: 'Bisa. Perubahan nickname pada akun Anda tidak akan merubah data pertemanan in-game karena sistem ID di MLBB sudah tetap (Server dan User ID). Namun, mohon hubungi admin agar kami mengupdate data antrian.' },
                  { q: 'Saya mau order lebih dari satu skin, bagaimana caranya?', a: 'Stok pada sistem mencatat slot pertemanan akun gift kami. Jika Anda mau membeli banyak skin untuk ID MLBB yang sama, Anda hanya perlu 1 slot pertemanan. Silahkan pesan 1 menu utama, lalu tuliskan skin tambahannya di Catatan agar admin menyesuaikan harganya.' },
                ].map((faq, i) => (
                  <div key={i} className="p-6 md:p-8 hover:bg-white/[0.02] transition-colors group">
                    <h4 className="font-bold text-lg md:text-xl mb-3 text-neutral-200 group-hover:text-blue-400 transition-colors leading-snug">
                      <span className="text-blue-500/50 mr-2">Q:</span>{faq.q}
                    </h4>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed pl-8 border-l-2 border-neutral-800 ml-1.5 py-1 text-justify">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
             <p className="text-neutral-500 mb-6">Masih ada pertanyaan yang belum terjawab?</p>
             <a href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'}?text=Halo admin Toro Store, saya punya pertanyaan...`} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d0f17] border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all">
                <i className="fa-brands fa-whatsapp text-emerald-400 text-xl" /> Chat Admin Sekarang
             </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
