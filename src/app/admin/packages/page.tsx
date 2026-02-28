'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
  getAdminPackages,
  deletePackage,
  updatePackage,
  bulkDeletePackages,
  bulkUpdatePackages,
} from '@/actions/package';

type Package = {
  id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string | null;
  stock: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  _count: { orders: number };
};

const CATEGORIES = ['Semua', 'Basic', 'Premium', 'Special', 'Event', 'Limited'];
const PAGE_SIZES = [6, 12, 24];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading]   = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // id being acted on

  // Filter / Search / Sort / Pagination state
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('Semua');
  const [status,   setStatus]   = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy,   setSortBy]   = useState<'sortOrder' | 'name' | 'price' | 'stock' | 'orders' | 'newest'>('sortOrder');
  const [pageSize, setPageSize] = useState(12);
  const [page,     setPage]     = useState(1);

  // Bulk select
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const data = await getAdminPackages();
    setPackages(data as Package[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  // Reset page when filters change
  useEffect(() => { setPage(1); setSelected(new Set()); }, [search, category, status, sortBy, pageSize]);

  // ---- Derived filtered/sorted/paginated list ----
  const filtered = useMemo(() => {
    let list = [...packages];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (category !== 'Semua') list = list.filter(p => p.category === category);
    if (status === 'active')   list = list.filter(p => p.isActive);
    if (status === 'inactive') list = list.filter(p => !p.isActive);

    list.sort((a, b) => {
      switch (sortBy) {
        case 'name':     return a.name.localeCompare(b.name);
        case 'price':    return a.price.localeCompare(b.price);
        case 'stock':    return b.stock - a.stock;
        case 'orders':   return b._count.orders - a._count.orders;
        case 'newest':   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:         return a.sortOrder - b.sortOrder;
      }
    });
    return list;
  }, [packages, search, category, status, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  // All ids on current page
  const pageIds = paginated.map(p => p.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every(id => selected.has(id));
  const somePageSelected = pageIds.some(id => selected.has(id));

  // ---- Handlers ----
  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelected(prev => { const n = new Set(prev); pageIds.forEach(id => n.delete(id)); return n; });
    } else {
      setSelected(prev => { const n = new Set(prev); pageIds.forEach(id => n.add(id)); return n; });
    }
  };

  const handleToggleStatus = async (pkg: Package) => {
    setActionLoading(pkg.id);
    const res = await updatePackage(pkg.id, { isActive: !pkg.isActive });
    if (res.success) {
      toast.success(pkg.isActive ? `"${pkg.name}" dinonaktifkan.` : `"${pkg.name}" diaktifkan.`);
      fetchPackages();
    } else {
      toast.error(res.error || 'Gagal mengubah status.');
    }
    setActionLoading(null);
  };

  const handleDelete = async (pkg: Package) => {
    if (!confirm(`Hapus paket "${pkg.name}"?\n\nSemua order terkait juga akan dihapus.`)) return;
    setActionLoading(pkg.id);
    const res = await deletePackage(pkg.id);
    if (res.success) {
      toast.success(`Paket "${pkg.name}" berhasil dihapus.`);
      setSelected(prev => { const n = new Set(prev); n.delete(pkg.id); return n; });
      fetchPackages();
    } else {
      toast.error(res.error || 'Gagal menghapus paket.');
    }
    setActionLoading(null);
  };

  const handleBulkActivate = async () => {
    const ids = [...selected];
    if (!ids.length) return;
    const res = await bulkUpdatePackages(ids, { isActive: true });
    if (res.success) { toast.success(`${res.count} paket diaktifkan.`); setSelected(new Set()); fetchPackages(); }
    else toast.error(res.error);
  };

  const handleBulkDeactivate = async () => {
    const ids = [...selected];
    if (!ids.length) return;
    const res = await bulkUpdatePackages(ids, { isActive: false });
    if (res.success) { toast.success(`${res.count} paket dinonaktifkan.`); setSelected(new Set()); fetchPackages(); }
    else toast.error(res.error);
  };

  const handleBulkDelete = async () => {
    const ids = [...selected];
    if (!ids.length) return;
    if (!confirm(`Hapus ${ids.length} paket yang dipilih?\n\nSemua order terkait juga akan dihapus. Tindakan ini tidak bisa diurungkan.`)) return;
    const res = await bulkDeletePackages(ids);
    if (res.success) { toast.success(`${res.count} paket berhasil dihapus.`); setSelected(new Set()); fetchPackages(); }
    else toast.error(res.error);
  };

  // ---- Render ----
  return (
    <div className="space-y-5">

      {/* ===== HEADER ===== */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-3xl font-bold">Manajemen Paket</h1>
          <p className="text-neutral-400 mt-1">
            {loading ? 'Memuat...' : `${packages.length} paket terdaftar · ${filtered.length} ditampilkan`}
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 shrink-0"
        >
          <i className="fa-solid fa-plus" /> Tambah Paket
        </Link>
      </header>

      {/* ===== TOOLBAR: Search + Filters + Sort + Page Size ===== */}
      <div className="space-y-3">
        {/* Row 1: Search + Refresh */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama atau kategori paket..."
              className="w-full bg-[#0d0f17] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
          </div>
          <button
            onClick={fetchPackages}
            disabled={loading}
            className="px-3.5 py-2.5 bg-[#0d0f17] border border-white/10 rounded-xl text-neutral-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            title="Refresh"
          >
            <i className={`fa-solid fa-rotate-right text-sm ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Row 2: Category tabs + Status + Sort + PageSize */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Category filter */}
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  category === cat
                    ? 'bg-blue-500 text-neutral-950'
                    : 'bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-2 items-center flex-wrap justify-end">
            {/* Status filter */}
            <select
              value={status}
              onChange={e => setStatus(e.target.value as typeof status)}
              className="bg-[#0d0f17] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-neutral-400 outline-none cursor-pointer hover:border-white/20 transition-all"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#0d0f17] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-neutral-400 outline-none cursor-pointer hover:border-white/20 transition-all"
            >
              <option value="sortOrder">Urutan</option>
              <option value="name">Nama A-Z</option>
              <option value="newest">Terbaru</option>
              <option value="stock">Stok ↓</option>
              <option value="orders">Order ↓</option>
            </select>

            {/* Page size */}
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="bg-[#0d0f17] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-neutral-400 outline-none cursor-pointer hover:border-white/20 transition-all"
            >
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s} / hal</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ===== BULK ACTION BAR ===== */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
          <i className="fa-solid fa-check-square text-blue-400" />
          <span className="text-blue-300 font-semibold">{selected.size} paket dipilih</span>
          <div className="ml-auto flex gap-2 flex-wrap">
            <button
              onClick={handleBulkActivate}
              className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-lg text-xs font-semibold transition-colors"
            >
              <i className="fa-solid fa-eye mr-1" />Aktifkan
            </button>
            <button
              onClick={handleBulkDeactivate}
              className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 rounded-lg text-xs font-semibold transition-colors"
            >
              <i className="fa-solid fa-eye-slash mr-1" />Nonaktifkan
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-xs font-semibold transition-colors"
            >
              <i className="fa-solid fa-trash mr-1" />Hapus
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="px-3 py-1.5 bg-neutral-800 text-neutral-400 hover:text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Batalkan
            </button>
          </div>
        </div>
      )}

      {/* ===== SELECT ALL TOGGLE (shown when results exist) ===== */}
      {!loading && filtered.length > 0 && (
        <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allPageSelected}
              ref={el => { if (el) el.indeterminate = somePageSelected && !allPageSelected; }}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
            />
            <span>Pilih semua di halaman ini ({paginated.length})</span>
          </label>
          <span>
            Hal. {page} dari {totalPages} · {filtered.length} hasil
          </span>
        </div>
      )}

      {/* ===== LOADING ===== */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}

      {/* ===== EMPTY STATE ===== */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#0d0f17] border border-dashed border-neutral-700 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center mb-4">
            <i className={`text-2xl text-neutral-500 fa-solid ${search || category !== 'Semua' || status !== 'all' ? 'fa-search' : 'fa-box-open'}`} />
          </div>
          <h3 className="font-bold text-lg mb-2">
            {search || category !== 'Semua' || status !== 'all' ? 'Tidak ada hasil' : 'Belum ada paket'}
          </h3>
          <p className="text-neutral-500 mb-6 text-sm">
            {search ? `Tidak ditemukan paket dengan kata kunci "${search}".` : 'Coba ubah filter atau tambah paket baru.'}
          </p>
          {search || category !== 'Semua' || status !== 'all' ? (
            <button
              onClick={() => { setSearch(''); setCategory('Semua'); setStatus('all'); }}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-sm font-semibold transition-colors"
            >
              <i className="fa-solid fa-xmark mr-2" />Reset Filter
            </button>
          ) : (
            <Link href="/admin/packages/new" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold rounded-xl transition-all text-sm">
              <i className="fa-solid fa-plus mr-2" />Tambah Paket Pertama
            </Link>
          )}
        </div>
      )}

      {/* ===== PACKAGE GRID ===== */}
      {!loading && paginated.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {paginated.map(pkg => {
            const isSelected = selected.has(pkg.id);
            const isActing   = actionLoading === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`relative bg-[#0d0f17] border rounded-2xl overflow-hidden transition-all group ${
                  isSelected
                    ? 'border-blue-500/50 ring-1 ring-blue-500/30'
                    : pkg.isActive
                    ? 'border-white/5 hover:border-white/10'
                    : 'border-white/5 opacity-60'
                }`}
              >
                {/* Checkbox top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(pkg.id)}
                    className="w-4 h-4 rounded accent-blue-500 cursor-pointer shadow-lg"
                    onClick={e => e.stopPropagation()}
                  />
                </div>

                {/* Image */}
                <div className="relative h-44 bg-neutral-800 overflow-hidden cursor-pointer" onClick={() => toggleSelect(pkg.id)}>
                  {pkg.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fa-solid fa-image text-4xl text-neutral-700" />
                    </div>
                  )}
                  {/* Status badge */}
                  <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
                    pkg.isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-neutral-700 text-neutral-400 border border-neutral-600'
                  }`}>
                    {pkg.isActive ? 'Aktif' : 'Nonaktif'}
                  </div>
                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-neutral-300 backdrop-blur-sm">
                    {pkg.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold leading-tight line-clamp-1">{pkg.name}</h3>
                    <span className="text-amber-400 font-bold text-sm shrink-0">{pkg.price}</span>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className={`flex items-center gap-1 font-semibold ${
                      pkg.stock === 0 ? 'text-red-400' : pkg.stock <= 5 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      <i className="fa-solid fa-boxes-stacked" /> {pkg.stock} stok
                    </span>
                    <span className="text-neutral-700">·</span>
                    <span className="text-neutral-500">
                      <i className="fa-solid fa-shopping-cart mr-1" />{pkg._count.orders} order
                    </span>
                    <span className="text-neutral-700">·</span>
                    <span className="text-neutral-600">#{pkg.sortOrder}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1.5 mt-3 pt-3 border-t border-neutral-800">
                    {/* Edit */}
                    <Link
                      href={`/admin/packages/${pkg.id}/edit`}
                      className="flex-1 text-center text-xs font-semibold py-2 px-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      <i className="fa-solid fa-pen-to-square mr-1" />Edit
                    </Link>
                    {/* Toggle */}
                    <button
                      onClick={() => handleToggleStatus(pkg)}
                      disabled={isActing}
                      className={`text-xs font-semibold py-2 px-2.5 rounded-lg transition-colors disabled:opacity-50 ${
                        pkg.isActive
                          ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                      title={pkg.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    >
                      <i className={`fa-solid ${isActing ? 'fa-circle-notch animate-spin' : pkg.isActive ? 'fa-eye-slash' : 'fa-eye'}`} />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(pkg)}
                      disabled={isActing}
                      className="text-xs font-semibold py-2 px-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                      title="Hapus paket"
                    >
                      <i className={`fa-solid ${isActing ? 'fa-circle-notch animate-spin' : 'fa-trash'}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== PAGINATION ===== */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-angles-left text-xs" />
          </button>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-angle-left text-xs" />
          </button>

          {/* Page number pills */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | '...')[]>((acc, p, i, arr) => {
              if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="text-neutral-600 px-1">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                    page === p
                      ? 'bg-blue-500 text-neutral-950'
                      : 'bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {p}
                </button>
              )
            )
          }

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-angle-right text-xs" />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0d0f17] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <i className="fa-solid fa-angles-right text-xs" />
          </button>
        </div>
      )}

    </div>
  );
}
