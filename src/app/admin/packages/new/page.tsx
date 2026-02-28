'use client';

import { useState, useRef } from 'react';
import { createPackage } from '@/actions/package';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// --- Utilities ---

/** Format angka ke "Rp 50.000" (titik sebagai pemisah ribuan) */
function formatRupiah(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const num = parseInt(digits, 10);
  if (isNaN(num)) return '';
  // Indonesian thousand separator: 1.000.000
  return 'Rp ' + num.toLocaleString('id-ID');
}

/** Ambil angka bersih dari string Rp (untuk state rawPrice) */
function stripNonDigits(str: string): string {
  return str.replace(/\D/g, '');
}

/** Label skala nilai untuk hint */
function priceHint(digits: string): string {
  const n = parseInt(digits || '0', 10);
  if (!n) return '';
  if (n >= 1_000_000_000_000) return `${(n / 1_000_000_000_000).toFixed(2).replace('.', ',')} Triliun`;
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2).replace('.', ',')} Miliar`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Juta`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)} Ribu`;
  return n.toString();
}

// --- Component ---

export default function NewPackagePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rawPrice, setRawPrice] = useState(''); // digits only
  const [category, setCategory] = useState('');
  const [stockRaw, setStockRaw] = useState(''); // digits only
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Derived values
  const priceFormatted = formatRupiah(rawPrice);          // display in input
  const priceToSave    = priceFormatted;                  // save as "Rp 50.000"
  const stock          = parseInt(stockRaw || '0', 10);

  // --- Handlers ---

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = stripNonDigits(e.target.value);
    setRawPrice(digits);
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = stripNonDigits(e.target.value);
    setStockRaw(digits);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setImageUrl(data.url);
        toast.success('Gambar berhasil diupload!');
      } else {
        toast.error(data.error || 'Upload gagal');
      }
    } catch {
      toast.error('Upload gagal. Coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Nama paket wajib diisi.'); return; }
    if (!rawPrice)    { toast.error('Harga wajib diisi.'); return; }
    if (!category)    { toast.error('Kategori wajib dipilih.'); return; }
    setSaving(true);
    const res = await createPackage({
      name: name.trim(),
      description: description.trim() || undefined,
      price: priceToSave,
      category,
      imageUrl: imageUrl || undefined,
      stock,
      isActive,
      sortOrder,
    });
    if (res.success) {
      toast.success('Paket berhasil ditambahkan!');
      setTimeout(() => router.push('/admin/packages'), 800);
    } else {
      toast.error(res.error || 'Gagal membuat paket.');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <header className="mb-8 border-b border-neutral-800 pb-5">
        <h1 className="text-3xl font-bold">Tambah Paket Baru</h1>
        <p className="text-neutral-400 mt-1">Isi detail paket yang akan ditampilkan di halaman utama.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-300">Gambar Paket</label>
          <div
            className="relative h-48 bg-neutral-900 border-2 border-dashed border-neutral-700 hover:border-blue-500/50 rounded-xl cursor-pointer transition-colors overflow-hidden"
            onClick={() => fileRef.current?.click()}
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-neutral-500">
                <i className="fa-solid fa-cloud-arrow-up text-3xl" />
                <span className="text-sm font-medium">Klik untuk upload gambar</span>
                <span className="text-xs">JPG, PNG, WebP — maks. 10MB</span>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
                <span className="text-xs text-neutral-400">Mengupload & konversi ke WebP...</span>
              </div>
            )}
            {imageUrl && !uploading && (
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg">
                <i className="fa-solid fa-check text-emerald-400 text-xs" />
                <span className="text-xs text-emerald-400 font-medium">Gambar berhasil diupload (WebP)</span>
                <button
                  type="button"
                  onClick={(ev) => { ev.stopPropagation(); setImageUrl(''); setImagePreview(''); }}
                  className="ml-auto text-neutral-500 hover:text-red-400 transition-colors text-xs"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </div>

        {/* Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-300">
              Nama Paket <span className="text-red-400">*</span>
            </label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="cth: Basic Gift Skin Lylia"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-300">
              Kategori <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={category} onChange={e => setCategory(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Pilih Kategori...</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Special">Special</option>
                <option value="Event">Event</option>
                <option value="Limited">Limited</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xs pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-neutral-300">Deskripsi</label>
          <textarea
            value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Deskripsi singkat tentang isi paket ini..."
            rows={3}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none resize-none"
          />
        </div>

        {/* Price & Stock — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* PRICE */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-300">
              Harga <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-semibold text-sm select-none">Rp</span>
              <input
                type="text"
                inputMode="numeric"
                value={rawPrice ? parseInt(rawPrice, 10).toLocaleString('id-ID') : ''}
                onChange={handlePriceChange}
                placeholder="0"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-white font-mono text-lg placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
              />
            </div>
            {rawPrice ? (
              <p className="text-xs text-amber-400 flex items-center gap-1">
                <i className="fa-solid fa-tag" />
                {priceHint(rawPrice)} · disimpan sebagai <span className="font-mono">{priceFormatted}</span>
              </p>
            ) : (
              <p className="text-xs text-neutral-600">Ketik angka, format otomatis  — cth: 50000</p>
            )}
          </div>

          {/* STOCK */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-300">Stok</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm select-none">
                <i className="fa-solid fa-boxes-stacked" />
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={stockRaw}
                onChange={handleStockChange}
                placeholder="0"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-white font-mono text-lg placeholder:text-neutral-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
              />
            </div>
            <p className={`text-xs flex items-center gap-1 ${stock === 0 ? 'text-neutral-600' : stock <= 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {stock === 0
                ? <><i className="fa-solid fa-ban" /> Stok 0 — tidak bisa diorder</>
                : stock <= 5
                ? <><i className="fa-solid fa-triangle-exclamation" /> Hampir habis — {stock} unit tersisa</>
                : <><i className="fa-solid fa-check" /> {stock} unit tersedia</>
              }
            </p>
          </div>
        </div>

        {/* Sort Order & Active */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-300">Urutan Tampil</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSortOrder(Math.max(0, sortOrder - 1))}
                className="w-10 h-12 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 text-neutral-300 transition-colors shrink-0"
              >
                <i className="fa-solid fa-minus text-xs" />
              </button>
              <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-3 text-center font-mono text-white text-lg font-bold">
                {sortOrder}
              </div>
              <button
                type="button"
                onClick={() => setSortOrder(sortOrder + 1)}
                className="w-10 h-12 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 text-neutral-300 transition-colors shrink-0"
              >
                <i className="fa-solid fa-plus text-xs" />
              </button>
            </div>
            <p className="text-xs text-neutral-600">Angka kecil muncul lebih dulu</p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-neutral-300">Status Paket</label>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`w-full h-12 rounded-xl font-semibold text-sm transition-all border flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:bg-neutral-700'
              }`}
            >
              <i className={`fa-solid ${isActive ? 'fa-eye' : 'fa-eye-slash'}`} />
              {isActive ? 'Aktif — Tampil di publik' : 'Nonaktif — Disembunyikan'}
            </button>
            <p className="text-xs text-neutral-600">
              {isActive ? 'Pelanggan bisa melihat dan memesan paket ini.' : 'Paket tidak tampil di halaman utama.'}
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2 border-t border-neutral-800">
          <button
            type="button" onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 font-semibold transition-colors text-sm"
          >
            <i className="fa-solid fa-arrow-left mr-2 text-xs" /> Batal
          </button>
          <button
            type="submit" disabled={saving || uploading}
            className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20 text-sm"
          >
            {saving
              ? <><i className="fa-solid fa-circle-notch animate-spin mr-2" />Menyimpan...</>
              : <><i className="fa-solid fa-floppy-disk mr-2" />Simpan Paket</>
            }
          </button>
        </div>
      </form>
    </div>
  );
}
