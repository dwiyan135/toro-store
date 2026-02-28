'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePackage, updatePackage } from '@/actions/package';
import { toast } from 'react-toastify';

type Props = {
  id: string;
  name: string;
  isActive: boolean;
};

export function PackageActions({ id, name, isActive }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const res = await updatePackage(id, { isActive: !isActive });
    if (res.success) {
      toast.success(isActive ? `"${name}" dinonaktifkan.` : `"${name}" diaktifkan.`);
      router.refresh();
    } else {
      toast.error(res.error || 'Gagal mengubah status paket.');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Hapus paket "${name}"? Order terkait tidak bisa diakses lagi.`)) return;
    setLoading(true);
    const res = await deletePackage(id);
    if (res.success) {
      toast.success(`Paket "${name}" berhasil dihapus.`);
      router.refresh();
    } else {
      toast.error(res.error || 'Gagal menghapus paket.');
    }
    setLoading(false);
  };

  return (
    <div className="flex gap-2 mt-4 pt-4 border-t border-neutral-800">
      <button
        onClick={() => router.push(`/admin/packages/${id}/edit`)}
        className="flex-1 text-center text-sm font-semibold py-2 px-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
        disabled={loading}
      >
        <i className="fa-solid fa-pen-to-square mr-1.5" />Edit
      </button>
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`text-sm font-semibold py-2 px-3 rounded-lg transition-colors disabled:opacity-50 ${
          isActive
            ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
        }`}
      >
        <i className={`fa-solid ${isActive ? 'fa-eye-slash' : 'fa-eye'} mr-1.5`} />
        {isActive ? 'Nonaktif' : 'Aktifkan'}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-sm font-semibold py-2 px-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? <i className="fa-solid fa-circle-notch animate-spin" /> : <i className="fa-solid fa-trash" />}
      </button>
    </div>
  );
}
