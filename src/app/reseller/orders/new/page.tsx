'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/actions/order';
import { getPackages } from '@/actions/package';
import { Loader2 } from 'lucide-react';

type Package = { id: string; name: string; category: string; price: string; resellerPrice?: string | null; stock: number };

const PAYMENT_METHODS = [
  'Transfer BCA', 'Transfer BRI', 'Transfer BNI', 'Transfer Mandiri',
  'Dana', 'GoPay', 'OVO', 'ShopeePay', 'QRIS', 'COD', 'Lainnya'
];

const inputCls = "w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";
const labelCls = "text-sm font-medium text-neutral-300";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className={labelCls}>{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      {children}
    </div>
  );
}

export default function NewOrderPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState({
    packageId: '', itemName: '', qty: 1, mlbbId: '', serverId: '',
    nickname: '', note: '', waNumber: '', paymentMethod: '', paymentProofUrl: '',
  });
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getPackages().then(pkgs => setPackages(pkgs as Package[]));
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = k === 'qty' ? Number(e.target.value) : e.target.value;
    setForm(p => ({ ...p, [k]: v }));
    if (k === 'packageId') {
      const pkg = packages.find(p => p.id === e.target.value) || null;
      setSelectedPkg(pkg);
      if (pkg) setForm(p => ({ ...p, itemName: pkg.name, packageId: e.target.value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      const res = await createOrder({
        ...form,
        totalPrice: selectedPkg?.resellerPrice
          ? `${parseInt(selectedPkg.resellerPrice.replace(/\D/g, '') || '0') * form.qty}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '*'
          : undefined,
      });
      if (!res.success) { setError(res.error || 'Gagal membuat order.'); return; }
      setSuccess(`Order berhasil dibuat! Kode: ${res.orderCode}`);
      setTimeout(() => router.push('/reseller/orders'), 1800);
    } catch { setError('Terjadi kesalahan sistem.'); }
    finally { setSubmitting(false); }
  };

  const byCategory = packages.reduce<Record<string, Package[]>>((acc, pkg) => {
    if (!acc[pkg.category]) acc[pkg.category] = [];
    acc[pkg.category].push(pkg);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-white/5 pb-5">
        <h1 className="text-2xl font-bold">Buat Order Baru</h1>
        <p className="text-neutral-400 text-sm mt-1">Isi semua data dengan benar sebelum submit</p>
      </div>

      {success && (
        <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 flex items-center gap-3">
          <i className="fa-solid fa-circle-check text-xl" />
          <div>
            <p className="font-bold">Order Berhasil Dibuat!</p>
            <p className="text-sm opacity-80">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 space-y-8">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation" />{error}
            </div>
          )}

          {/* Section: Paket */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
              <i className="fa-solid fa-layer-group text-blue-400" /> Pilih Paket
            </h3>
            <Field label="Paket / Gift Skin" required>
              <select value={form.packageId} onChange={set('packageId')} className={inputCls} required>
                <option value="">— Pilih Paket —</option>
                {Object.entries(byCategory).map(([cat, pkgs]) => (
                  <optgroup key={cat} label={`── ${cat} ──`}>
                    {pkgs.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} {p.resellerPrice ? `(Reseller: ${p.resellerPrice})` : `(${p.price})`} {p.stock <= 5 ? `⚠ Stok ${p.stock}` : ''}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            {/* Price display */}
            {selectedPkg && (
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[140px] bg-neutral-950 border border-neutral-800 rounded-xl p-4">
                  <p className="text-xs text-neutral-500 mb-1">Harga Publik</p>
                  <p className="text-white font-bold">{selectedPkg.price}</p>
                </div>
                <div className="flex-1 min-w-[140px] bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
                  <p className="text-xs text-violet-400 mb-1">Harga Reseller</p>
                  <p className="text-violet-300 font-bold">{selectedPkg.resellerPrice || 'Sama dengan publik'}</p>
                </div>
                <div className="flex-1 min-w-[100px] bg-neutral-950 border border-neutral-800 rounded-xl p-4">
                  <p className="text-xs text-neutral-500 mb-1">Stok</p>
                  <p className={`font-bold ${selectedPkg.stock <= 5 ? 'text-red-400' : 'text-emerald-400'}`}>{selectedPkg.stock}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Field label="Nama Item / Skin" required>
                <input type="text" value={form.itemName} onChange={set('itemName')} className={inputCls} placeholder="cth: Saber Codename Freedom" required />
              </Field>
              <Field label="Qty" required>
                <input type="number" value={form.qty} onChange={set('qty')} className={inputCls} min={1} max={100} required />
              </Field>
            </div>
          </div>

          {/* Section: ID Akun */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
              <i className="fa-solid fa-gamepad text-emerald-400" /> Data Akun MLBB
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Field label="ID Akun MLBB" required>
                <input type="text" value={form.mlbbId} onChange={set('mlbbId')} className={`${inputCls} font-mono`} placeholder="123456789" required />
              </Field>
              <Field label="Server ID" required>
                <input type="text" value={form.serverId} onChange={set('serverId')} className={`${inputCls} font-mono`} placeholder="cth: 2121" required />
              </Field>
            </div>
            <Field label="Username / Nickname (opsional)">
              <input type="text" value={form.nickname} onChange={set('nickname')} className={inputCls} placeholder="Nama karakter di game" />
            </Field>
          </div>

          {/* Section: Pembayaran */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
              <i className="fa-solid fa-credit-card text-violet-400" /> Info Pembayaran
            </h3>
            <Field label="Metode Pembayaran" required>
              <select value={form.paymentMethod} onChange={set('paymentMethod')} className={inputCls} required>
                <option value="">— Pilih Metode —</option>
                {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Link / URL Bukti Transfer (opsional)">
              <input type="url" value={form.paymentProofUrl} onChange={set('paymentProofUrl')} className={inputCls} placeholder="https://drive.google.com/... atau link lainnya" />
            </Field>
          </div>

          {/* Section: Kontak */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider border-b border-white/5 pb-2 flex items-center gap-2">
              <i className="fa-solid fa-phone text-amber-400" /> Kontak & Catatan
            </h3>
            <Field label="No. WA Pelanggan (opsional)">
              <input type="tel" value={form.waNumber} onChange={set('waNumber')} className={inputCls} placeholder="08xxxxxxxxxx" />
            </Field>
            <Field label="Catatan Tambahan (opsional)">
              <textarea value={form.note} onChange={set('note')} className={`${inputCls} resize-none`} rows={3} placeholder="Catatan khusus untuk order ini..." />
            </Field>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-[#0a0c14] border-t border-white/5 px-6 py-4 flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 rounded-xl transition-all font-semibold text-sm">
            Batal
          </button>
          <button type="submit" disabled={submitting}
            className="flex-1 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm disabled:opacity-70">
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Membuat Order...</> : <><i className="fa-solid fa-paper-plane" />Submit Order</>}
          </button>
        </div>
      </form>
    </div>
  );
}
