'use client';

import { useState, useEffect, Suspense } from 'react';
import { createOrder } from '@/actions/order';
import { getPackages } from '@/actions/package';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type Package = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  category: string;
  imageUrl: string | null;
  stock: number;
};

export function CheckoutForm() {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>}>
      <CheckoutFormContent />
    </Suspense>
  );
}

function CheckoutFormContent() {
  const searchParams = useSearchParams();
  const defaultPkgId = searchParams.get('pkg');

  const [packages, setPackages] = useState<Package[]>([]);
  const [loadingPkgs, setLoadingPkgs] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [itemName, setItemName] = useState('');
  const [mlbbId, setMlbbId] = useState('');
  const [serverId, setServerId] = useState('');
  const [nickname, setNickname] = useState('');
  const [note, setNote] = useState('');
  const [waNumber, setWaNumber] = useState('');

  useEffect(() => {
    getPackages().then(data => {
      const pkgs = data as Package[];
      setPackages(pkgs);
      setLoadingPkgs(false);
      if (defaultPkgId) {
        const found = pkgs.find(p => p.id === defaultPkgId);
        if (found && found.stock > 0) setSelectedPackage(found);
      }
    });
  }, [defaultPkgId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !itemName || !mlbbId || !serverId || !nickname || !waNumber) {
      setError('Harap isi semua field wajib (*)');
      return;
    }
    
    // Validasi nomor WhatsApp minimal 10 digit (kode negara + nomor)
    if (waNumber.replace(/[^0-9]/g, '').length < 10) {
       setError('Nomor WhatsApp kurang valid. Pastikan nomor benar.');
       return;
    }

    if (selectedPackage.stock <= 0) {
      setError('Paket yang dipilih sedang habis stok.');
      return;
    }
    setLoading(true);
    setError('');

    const res = await createOrder({
      packageId: selectedPackage.id,
      itemName,
      mlbbId,
      serverId,
      nickname,
      note,
      waNumber,
    });

    if (res.success && res.orderCode) {
      const adminWa = process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890';
      const msg = `Halo Toro Store, saya mau order gift skin MLBB.\nOrder: ${res.orderCode}\nPaket: ${res.packageName}\nNama Skin/Event: ${itemName}\nID: ${mlbbId}\nServer: ${serverId}\nNickname: ${nickname || '-'}\nCatatan: ${note || '-'}\nTerima kasih.`;
      const url = `https://wa.me/${adminWa}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      window.location.href = '/order-success';
    } else {
      setError(res.error || 'Terjadi kesalahan sistem');
      setLoading(false);
    }
  };

  const isOutOfStock = selectedPackage && selectedPackage.stock <= 0;

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

      <h3 className="text-2xl font-bold mb-6">Form Pemesanan</h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {/* Step 1 — Package Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">1</span>
            Pilih Paket
          </h4>

          {loadingPkgs ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-neutral-800 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packages.map(pkg => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg.id === selectedPackage?.id ? null : pkg)}
                  disabled={pkg.stock <= 0}
                  className={`relative text-left p-4 rounded-xl border transition-all group overflow-hidden ${
                    selectedPackage?.id === pkg.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : pkg.stock <= 0
                      ? 'border-neutral-800 bg-neutral-900/50 opacity-50 cursor-not-allowed'
                      : 'border-neutral-700 bg-neutral-900/50 hover:border-neutral-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {pkg.imageUrl && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-800">
                        <Image src={pkg.imageUrl} alt={pkg.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm truncate">{pkg.name}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">{pkg.category}</span>
                      </div>
                      <div className="text-amber-400 font-bold text-sm mt-0.5">{pkg.price}</div>
                    </div>
                  </div>
                  <div className={`mt-2 text-xs font-medium ${pkg.stock === 0 ? 'text-red-400' : pkg.stock <= 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    <i className="fa-solid fa-circle text-[6px] mr-1 align-middle"></i>
                    {pkg.stock === 0 ? 'Habis' : pkg.stock <= 5 ? `Sisa ${pkg.stock} slot` : `${pkg.stock} slot tersedia`}
                  </div>
                  {selectedPackage?.id === pkg.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <i className="fa-solid fa-check text-white text-[10px]"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Step 2 — Skin Name */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">2</span>
            Nama Skin / Event *
          </h4>
          <input
            type="text"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            placeholder="Ketik Nama Skin / Event..."
            className="w-full bg-neutral-950/60 border border-neutral-700 rounded-xl p-3.5 text-white placeholder-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
          />
        </div>

        {/* Step 3 — Account Data */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">3</span>
            Data Akun MLBB
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">User ID *</label>
              <input type="number" value={mlbbId} onChange={e => setMlbbId(e.target.value)} placeholder="Masukkan User ID..."
                className="w-full bg-neutral-950/60 border border-neutral-700 rounded-xl p-3.5 text-white placeholder-neutral-500 focus:border-blue-500 transition-all outline-none font-mono text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Zone ID *</label>
              <input type="number" value={serverId} onChange={e => setServerId(e.target.value)} placeholder="Masukkan Zone ID..."
                className="w-full bg-neutral-950/60 border border-neutral-700 rounded-xl p-3.5 text-white placeholder-neutral-500 focus:border-blue-500 transition-all outline-none font-mono text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Nickname MLBB *</label>
              <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Ketik Nickname MLBB..."
                className="w-full bg-neutral-950/60 border border-neutral-700 rounded-xl p-3.5 text-white placeholder-neutral-500 focus:border-blue-500 transition-all outline-none text-sm" />
            </div>
            <div className="space-y-1.5 checkout-phone-wrapper flex flex-col">
              <label className="text-xs font-medium text-neutral-400">No. WhatsApp *</label>
              <div className="relative w-full">
                <PhoneInput
                  country={'id'}
                  value={waNumber}
                  onChange={phone => setWaNumber(phone)}
                  inputClass="!w-full !bg-neutral-950/60 !border-neutral-700 !rounded-xl !text-white !h-auto !py-3.5 !pl-14 hover:!border-neutral-500 focus:!border-blue-500 !transition-all"
                  buttonClass="!bg-transparent !border-r !border-r-neutral-700 !border-y-0 !border-l-0 !rounded-l-xl !pl-2 hover:!bg-white/5 !transition-all"
                  dropdownClass="!bg-neutral-900 !border-neutral-700 !text-sm !text-neutral-300"
                  searchClass="!bg-neutral-950 !border-neutral-700 !text-white"
                  containerClass="w-full flex"
                  enableSearch={true}
                  disableSearchIcon={true}
                  searchPlaceholder="Cari negara..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-400">Catatan <span className="text-neutral-600">(opsional)</span></label>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Pesan khusus untuk admin..." rows={3}
            className="w-full bg-neutral-950/60 border border-neutral-700 rounded-xl p-3.5 text-white placeholder-neutral-600 focus:border-blue-500 transition-all outline-none resize-none text-sm" />
        </div>

        {/* Summary */}
        {selectedPackage && (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Paket dipilih:</span>
              <span className="font-bold">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-neutral-400">Harga:</span>
              <span className="font-bold text-amber-400">{selectedPackage.price}</span>
            </div>
          </div>
        )}

        {isOutOfStock ? (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-sm text-center">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>Paket habis — hubungi admin untuk Pre-Order.
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA || '6281234567890'}?text=Halo admin, saya mau PO paket ${selectedPackage.name}`} target="_blank" rel="noreferrer"
              className="block mt-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-lg transition">
              Pre-Order via WhatsApp →
            </a>
          </div>
        ) : (
          <button type="submit" disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-neutral-950 font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex justify-center items-center gap-2 group">
            {loading ? <span className="animate-pulse">Memproses...</span> : (
              <><i className="fa-brands fa-whatsapp text-xl"></i>Kirim Order ke WhatsApp<i className="fa-solid fa-arrow-right ml-1 group-hover:translate-x-1 transition-transform"></i></>
            )}
          </button>
        )}

        <p className="text-xs text-center text-neutral-600">Dengan klik tombol di atas, Anda setuju dengan syarat Toro Store.</p>
      </form>
    </div>
  );
}
