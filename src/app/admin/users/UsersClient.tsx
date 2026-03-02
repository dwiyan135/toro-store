'use client';

import { useState } from 'react';
import { createUser, toggleUserActive, deleteUser, type CreateUserData } from '@/actions/users';
import { Loader2, Plus, Trash2, ToggleLeft, ToggleRight, X, Eye, EyeOff, ChevronDown, ChevronUp, User, Store, CreditCard, MapPin } from 'lucide-react';

type UserData = {
  id: string;
  username: string;
  role: string;
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
  isActive: boolean;
  adminNote: string | null;
  joinDate: Date;
  createdAt: Date;
  _count: { orders: number };
};

const EMPTY_FORM: CreateUserData = {
  username: '', password: '', fullName: '', email: '',
  phone: '', ktpNumber: '', storeName: '', storeDescription: '',
  storeInstagram: '', storePlatform: '', address: '',
  bankName: '', bankAccountNumber: '', bankAccountName: '', adminNote: '',
};

const PLATFORMS = ['WhatsApp', 'Shopee', 'TikTok Shop', 'Instagram', 'Facebook', 'Tokopedia', 'Lainnya'];

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-red-400'}`} />
      {active ? 'Aktif' : 'Nonaktif'}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${role === 'ADMIN' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'}`}>
      {role}
    </span>
  );
}

function ExpandableRow({ user, onToggle, onDelete }: { user: UserData; onToggle: (id: string) => void; onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr className="border-b border-white/5 hover:bg-white/2 transition-colors cursor-pointer" onClick={() => setExpanded(p => !p)}>
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{user.fullName}</p>
              <p className="text-neutral-500 text-xs font-mono">@{user.username}</p>
            </div>
          </div>
        </td>
        <td className="p-4 hidden md:table-cell">
          <p className="text-sm text-neutral-300 font-medium">{user.storeName}</p>
          {user.storeInstagram && <p className="text-xs text-neutral-500 mt-0.5">@{user.storeInstagram}</p>}
        </td>
        <td className="p-4 hidden lg:table-cell text-sm text-neutral-400 font-mono">{user.phone}</td>
        <td className="p-4"><RoleBadge role={user.role} /></td>
        <td className="p-4"><StatusBadge active={user.isActive} /></td>
        <td className="p-4 hidden md:table-cell">
          <span className="text-sm text-neutral-400">{user._count.orders} order</span>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            {user.role !== 'ADMIN' && (
              <>
                <button onClick={e => { e.stopPropagation(); onToggle(user.id); }} title={user.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                  className={`p-2 rounded-lg transition-all ${user.isActive ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-neutral-500 hover:bg-neutral-700/50'}`}>
                  {user.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                </button>
                <button onClick={e => { e.stopPropagation(); onDelete(user.id); }} title="Hapus"
                  className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button onClick={e => { e.stopPropagation(); setExpanded(p => !p); }} className="p-2 rounded-lg text-neutral-500 hover:text-white transition-all">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-[#0a0b12] border-b border-white/5">
          <td colSpan={7} className="px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
              {/* Identity */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5"><User className="w-3 h-3" /> Identitas</h4>
                <InfoRow label="Email" value={user.email} />
                <InfoRow label="No. KTP" value={user.ktpNumber} mono />
                <InfoRow label="Alamat" value={user.address} />
              </div>
              {/* Store */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5"><Store className="w-3 h-3" /> Info Toko</h4>
                <InfoRow label="Deskripsi" value={user.storeDescription} />
                <InfoRow label="Instagram" value={user.storeInstagram ? `@${user.storeInstagram}` : null} />
                <InfoRow label="Platform" value={user.storePlatform} />
              </div>
              {/* Bank */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5"><CreditCard className="w-3 h-3" /> Rekening</h4>
                <InfoRow label="Bank" value={user.bankName} />
                <InfoRow label="No. Rekening" value={user.bankAccountNumber} mono />
                <InfoRow label="Atas Nama" value={user.bankAccountName} />
              </div>
              {/* Admin note */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Lainnya</h4>
                <InfoRow label="Tgl Bergabung" value={new Date(user.joinDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} />
                <InfoRow label="Total Order" value={`${user._count.orders} order`} />
                {user.adminNote && (
                  <div>
                    <p className="text-neutral-500 text-xs mb-1">Catatan Admin</p>
                    <p className="text-amber-300 text-xs bg-amber-500/5 border border-amber-500/10 rounded-lg p-2">{user.adminNote}</p>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) {
  return (
    <div>
      <p className="text-neutral-500 text-xs mb-0.5">{label}</p>
      <p className={`text-neutral-300 text-sm break-all ${mono ? 'font-mono' : ''}`}>{value || <span className="text-neutral-600 italic">—</span>}</p>
    </div>
  );
}

function FormSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/5">
        {icon}{title}
      </h3>
      {children}
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-neutral-300">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm";

export default function UsersClient({ users: initial }: { users: UserData[] }) {
  const [users, setUsers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateUserData>(EMPTY_FORM);
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  const set = (k: keyof CreateUserData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const res = await createUser(form);
    setSaving(false);
    if (res.error) { setError(res.error); return; }
    setShowForm(false);
    setForm(EMPTY_FORM);
    window.location.reload();
  };

  const handleToggle = async (id: string) => {
    setLoading(id + '_toggle');
    await toggleUserActive(id);
    setLoading(null);
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus akun reseller ini?')) return;
    setLoading(id + '_delete');
    const res = await deleteUser(id);
    setLoading(null);
    if (res.error) alert(res.error);
    else window.location.reload();
  };

  const resellerCount = users.filter(u => u.role === 'RESELLER').length;
  const activeCount = users.filter(u => u.role === 'RESELLER' && u.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Reseller</h1>
          <p className="text-neutral-400 text-sm mt-1">{resellerCount} reseller terdaftar · {activeCount} aktif</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm">
          <Plus className="w-4 h-4" /> Tambah Reseller
        </button>
      </div>

      {/* Stats quick view */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Reseller', value: resellerCount, color: 'text-white' },
          { label: 'Aktif', value: activeCount, color: 'text-emerald-400' },
          { label: 'Nonaktif', value: resellerCount - activeCount, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-[#0d0f17] border border-white/5 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-neutral-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Reseller</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Nama Toko</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">No. HP</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">Order</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <ExpandableRow key={u.id} user={u} onToggle={handleToggle} onDelete={handleDelete} />
              ))}
              {users.length === 0 && (
                <tr><td colSpan={7} className="p-12 text-center text-neutral-600">Belum ada user terdaftar</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-2xl my-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500" />
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-lg font-bold">Tambah Akun Reseller</h2>
                <p className="text-neutral-500 text-sm mt-0.5">Lengkapi semua data yang diperlukan</p>
              </div>
              <button onClick={() => { setShowForm(false); setError(''); }} className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-8">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation" />{error}
                </div>
              )}

              {/* Account Credentials */}
              <FormSection title="Kredensial Login" icon={<i className="fa-solid fa-key text-amber-400 text-xs" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Username" required>
                    <input type="text" value={form.username} onChange={set('username')} className={inputCls} placeholder="cth: reseller_budi" required />
                  </FormField>
                  <FormField label="Password" required>
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} className={inputCls + ' pr-11 font-mono tracking-widest'} placeholder="Min. 8 karakter" required minLength={6} />
                      <button type="button" onClick={() => setShowPw(p => !p)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-600 hover:text-neutral-400">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormField>
                </div>
              </FormSection>

              {/* Identity */}
              <FormSection title="Data Diri" icon={<User className="w-3 h-3 text-blue-400" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Nama Lengkap" required>
                    <input type="text" value={form.fullName} onChange={set('fullName')} className={inputCls} placeholder="Nama sesuai KTP" required />
                  </FormField>
                  <FormField label="No. HP / WhatsApp" required>
                    <input type="tel" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="08xxxxxxxxxx" required />
                  </FormField>
                  <FormField label="Email">
                    <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="email@contoh.com" />
                  </FormField>
                  <FormField label="No. KTP">
                    <input type="text" value={form.ktpNumber} onChange={set('ktpNumber')} className={`${inputCls} font-mono`} placeholder="16 digit" maxLength={16} />
                  </FormField>
                  <FormField label="Alamat Domisili">
                    <input type="text" value={form.address} onChange={set('address')} className={inputCls} placeholder="Kota, Provinsi" />
                  </FormField>
                </div>
              </FormSection>

              {/* Store Info */}
              <FormSection title="Info Toko" icon={<Store className="w-3 h-3 text-emerald-400" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Nama Toko / Store" required>
                    <input type="text" value={form.storeName} onChange={set('storeName')} className={inputCls} placeholder="cth: Budi Gaming Store" required />
                  </FormField>
                  <FormField label="Platform Jualan">
                    <select value={form.storePlatform} onChange={set('storePlatform')} className={inputCls}>
                      <option value="">— Pilih Platform —</option>
                      {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Instagram Toko">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-500 text-sm">@</span>
                      <input type="text" value={form.storeInstagram} onChange={set('storeInstagram')} className={`${inputCls} pl-8`} placeholder="nama_toko" />
                    </div>
                  </FormField>
                  <FormField label="Deskripsi Toko">
                    <input type="text" value={form.storeDescription} onChange={set('storeDescription')} className={inputCls} placeholder="Singkat tentang toko" />
                  </FormField>
                </div>
              </FormSection>

              {/* Bank Info */}
              <FormSection title="Info Rekening Bank" icon={<CreditCard className="w-3 h-3 text-violet-400" />}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Nama Bank">
                    <input type="text" value={form.bankName} onChange={set('bankName')} className={inputCls} placeholder="BCA, BRI, BNI..." />
                  </FormField>
                  <FormField label="No. Rekening">
                    <input type="text" value={form.bankAccountNumber} onChange={set('bankAccountNumber')} className={`${inputCls} font-mono`} placeholder="xxxxxxxx" />
                  </FormField>
                  <FormField label="Atas Nama">
                    <input type="text" value={form.bankAccountName} onChange={set('bankAccountName')} className={inputCls} placeholder="Nama pemilik rekening" />
                  </FormField>
                </div>
              </FormSection>

              {/* Admin Note */}
              <FormSection title="Catatan Admin" icon={<i className="fa-solid fa-note-sticky text-amber-400 text-xs" />}>
                <FormField label="Catatan (opsional)">
                  <textarea value={form.adminNote} onChange={set('adminNote')} className={`${inputCls} resize-none`} rows={3} placeholder="Catatan internal tentang reseller ini..." />
                </FormField>
              </FormSection>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowForm(false); setError(''); }} className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-all font-semibold text-sm">
                  Batal
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm disabled:opacity-70">
                  {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Menyimpan...</> : <><Plus className="w-4 h-4" />Buat Akun Reseller</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
