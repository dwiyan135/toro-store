'use client';

import { useState } from 'react';
import { updateUser } from '@/actions/users';
import { Loader2, Save } from 'lucide-react';

type ProfileData = {
  id: string;
  username: string;
  fullName: string;
  email: string | null;
  phone: string;
  ktpNumber: string | null;
  storeName: string;
  storeDescription: string | null;
  storeInstagram: string | null;
  storePlatform: string | null;
  address: string | null;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
};

const PLATFORMS = ['WhatsApp', 'Shopee', 'TikTok Shop', 'Instagram', 'Facebook', 'Tokopedia', 'Lainnya'];
const inputCls = "w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0f17] border border-white/5 rounded-2xl p-6 space-y-5">
      <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
        <i className={icon} />{title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-neutral-300">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
      {children}
    </div>
  );
}

export default function ProfileClient({ profile }: { profile: ProfileData }) {
  const [form, setForm] = useState({
    fullName: profile.fullName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    ktpNumber: profile.ktpNumber || '',
    storeName: profile.storeName || '',
    storeDescription: profile.storeDescription || '',
    storeInstagram: profile.storeInstagram || '',
    storePlatform: profile.storePlatform || '',
    address: profile.address || '',
    bankName: profile.bankName || '',
    bankAccountNumber: profile.bankAccountNumber || '',
    bankAccountName: profile.bankAccountName || '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setMsg({ type: 'error', text: 'Password baru tidak cocok.' }); return;
    }
    setSaving(true); setMsg(null);
    const res = await updateUser(profile.id, {
      fullName: form.fullName,
      email: form.email || undefined,
      phone: form.phone,
      ktpNumber: form.ktpNumber || undefined,
      storeName: form.storeName,
      storeDescription: form.storeDescription || undefined,
      storeInstagram: form.storeInstagram || undefined,
      storePlatform: form.storePlatform || undefined,
      address: form.address || undefined,
      bankName: form.bankName || undefined,
      bankAccountNumber: form.bankAccountNumber || undefined,
      bankAccountName: form.bankAccountName || undefined,
      newPassword: form.newPassword || undefined,
    });
    setSaving(false);
    if (res.error) setMsg({ type: 'error', text: res.error });
    else { setMsg({ type: 'success', text: 'Profil berhasil diperbarui!' }); setForm(p => ({ ...p, newPassword: '', confirmPassword: '' })); }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border-b border-white/5 pb-5">
        <h1 className="text-2xl font-bold">Profil Saya</h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
            {form.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-white">{profile.username}</p>
            <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">RESELLER</span>
          </div>
        </div>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-sm flex items-center gap-2 border ${msg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          <i className={`fa-solid ${msg.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`} />
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Identity */}
        <Section title="Data Diri" icon="fa-solid fa-user text-blue-400 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Lengkap" required>
              <input type="text" value={form.fullName} onChange={set('fullName')} className={inputCls} required />
            </Field>
            <Field label="No. HP / WhatsApp" required>
              <input type="tel" value={form.phone} onChange={set('phone')} className={inputCls} required />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={set('email')} className={inputCls} />
            </Field>
            <Field label="No. KTP">
              <input type="text" value={form.ktpNumber} onChange={set('ktpNumber')} className={`${inputCls} font-mono`} maxLength={16} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Alamat Domisili">
                <input type="text" value={form.address} onChange={set('address')} className={inputCls} />
              </Field>
            </div>
          </div>
        </Section>

        {/* Store Info */}
        <Section title="Info Toko" icon="fa-solid fa-store text-emerald-400 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Toko" required>
              <input type="text" value={form.storeName} onChange={set('storeName')} className={inputCls} required />
            </Field>
            <Field label="Platform Jualan">
              <select value={form.storePlatform} onChange={set('storePlatform')} className={inputCls}>
                <option value="">— Pilih —</option>
                {PLATFORMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Instagram Toko">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-500 text-sm">@</span>
                <input type="text" value={form.storeInstagram} onChange={set('storeInstagram')} className={`${inputCls} pl-8`} />
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Deskripsi Toko">
                <textarea value={form.storeDescription} onChange={set('storeDescription')} className={`${inputCls} resize-none`} rows={2} />
              </Field>
            </div>
          </div>
        </Section>

        {/* Bank */}
        <Section title="Info Rekening Bank" icon="fa-solid fa-credit-card text-violet-400 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Nama Bank">
              <input type="text" value={form.bankName} onChange={set('bankName')} className={inputCls} placeholder="BCA, BRI..." />
            </Field>
            <Field label="No. Rekening">
              <input type="text" value={form.bankAccountNumber} onChange={set('bankAccountNumber')} className={`${inputCls} font-mono`} />
            </Field>
            <Field label="Atas Nama">
              <input type="text" value={form.bankAccountName} onChange={set('bankAccountName')} className={inputCls} />
            </Field>
          </div>
        </Section>

        {/* Change Password */}
        <Section title="Ganti Password" icon="fa-solid fa-lock text-amber-400 text-xs">
          <p className="text-xs text-neutral-500">Kosongkan jika tidak ingin mengganti password</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Password Baru">
              <input type="password" value={form.newPassword} onChange={set('newPassword')} className={`${inputCls} font-mono tracking-widest`} placeholder="Min. 6 karakter" />
            </Field>
            <Field label="Konfirmasi Password Baru">
              <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} className={`${inputCls} font-mono tracking-widest`} placeholder="Ulangi password baru" />
            </Field>
          </div>
        </Section>

        <button type="submit" disabled={saving}
          className="w-full py-3.5 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70">
          {saving ? <><Loader2 className="w-5 h-5 animate-spin" />Menyimpan...</> : <><Save className="w-5 h-5" />Simpan Perubahan</>}
        </button>
      </form>
    </div>
  );
}
