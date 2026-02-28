import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12 rounded-2xl max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse-custom">
          <i className="fa-solid fa-check"></i>
        </div>

        <h1 className="text-3xl font-bold mb-4 font-sans text-white">Order Terkirim!</h1>
        
        <p className="text-neutral-400 mb-8 leading-relaxed">
          Order kamu sedang diproses. Silakan cek aplikasi WhatsApp untuk mengirim rincian ke Admin Toro Store dan menyelesaikan pembayaran.
        </p>

        <div className="space-y-3">
          <Link href="/" className="block w-full px-6 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-colors border border-neutral-700">
            Kembali ke Beranda
          </Link>
          <a href="https://wa.me/6281234567890" target="_blank" className="block w-full px-6 py-4 bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] font-bold rounded-xl transition-colors border border-[#25d366]/30">
            <i className="fa-brands fa-whatsapp mr-2"></i> Buka WhatsApp Manual
          </a>
        </div>
      </div>
    </div>
  );
}
