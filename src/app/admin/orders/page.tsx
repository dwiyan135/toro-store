'use client';

import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus, updatePaymentStatus } from '@/actions/order';
import { Loader2 } from 'lucide-react';

type Order = {
  id: string;
  orderCode: string;
  package: { name: string; category: string; resellerPrice: string | null } | null;
  itemName: string;
  qty: number;
  totalPrice: string | null;
  mlbbId: string;
  serverId: string;
  nickname: string | null;
  waNumber: string | null;
  note: string | null;
  status: 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod: string | null;
  paymentProofUrl: string | null;
  payDate: Date | null;
  finishedDate: Date | null;
  storeName: string | null;
  reseller: { storeName: string; fullName: string; phone: string } | null;
  createdAt: Date;
};

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  CONFIRMED: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  DONE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  CANCELED: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const PAY_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  PAID: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  FAILED: 'bg-red-500/10 text-red-400 border-red-500/30',
};

function fmt(d: Date | string | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED'>('ALL');
  const [storeFilter, setStoreFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState<'ALL' | 'RESELLER' | 'PUBLIC'>('ALL');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await getAdminOrders();
    setOrders(data as unknown as Order[]);
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: Order['status']) => {
    setUpdatingId(id + '_status');
    await updateOrderStatus(id, newStatus);
    await fetchOrders();
    setUpdatingId(null);
  };

  const handlePaymentChange = async (id: string, payStatus: Order['paymentStatus']) => {
    setUpdatingId(id + '_pay');
    await updatePaymentStatus(id, payStatus);
    await fetchOrders();
    setUpdatingId(null);
  };

  const stores = ['ALL', ...Array.from(new Set(orders.filter(o => o.storeName).map(o => o.storeName!)))];

  const filtered = orders.filter(o => {
    if (filter !== 'ALL' && o.status !== filter) return false;
    if (storeFilter !== 'ALL' && o.storeName !== storeFilter) return false;
    if (sourceFilter === 'RESELLER' && !o.reseller) return false;
    if (sourceFilter === 'PUBLIC' && o.reseller) return false;
    return true;
  });

  if (isLoading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-3xl font-bold">Data Order</h1>
          <p className="text-neutral-400 mt-1">{orders.length} total pesanan masuk</p>
        </div>
        <button onClick={fetchOrders} className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium shrink-0">
          <i className="fa-solid fa-rotate-right" /> Refresh
        </button>
      </header>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 flex-wrap">
          <p className="text-xs text-neutral-500 self-center mr-1">Status:</p>
          {(['ALL', 'NEW', 'CONFIRMED', 'DONE', 'CANCELED'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${filter === s ? s === 'ALL' ? 'bg-white text-neutral-950 border-white' : `${STATUS_COLORS[s]}` : 'bg-neutral-800 text-neutral-500 hover:text-white border-transparent'}`}>
              {s === 'ALL' ? `Semua (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <p className="text-xs text-neutral-500">Sumber:</p>
          {(['ALL', 'RESELLER', 'PUBLIC'] as const).map(s => (
            <button key={s} onClick={() => setSourceFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${sourceFilter === s ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-neutral-800 text-neutral-500 hover:text-white'}`}>
              {s}
            </button>
          ))}
          {stores.length > 1 && (
            <>
              <p className="text-xs text-neutral-500 ml-2">Store:</p>
              <select value={storeFilter} onChange={e => setStoreFilter(e.target.value)}
                className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-300 outline-none focus:border-blue-500">
                {stores.map(s => <option key={s}>{s}</option>)}
              </select>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: '1200px' }}>
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0c14]">
                {['Order ID', 'Detail Akun', 'Paket / Item', 'Qty', 'Store', 'Status Order', 'Status Bayar', 'Metode Bayar', 'Tgl Bayar', 'Tgl Selesai', 'Aksi'].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((order) => {
                const isUpdating = updatingId?.startsWith(order.id);
                return (
                  <tr key={order.id} className={`hover:bg-white/[0.02] transition-colors ${isUpdating ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-3 align-top">
                      <p className="font-mono text-blue-400 text-xs font-bold">{order.orderCode}</p>
                      <p className="text-neutral-600 text-xs mt-0.5">{fmt(order.createdAt)}</p>
                      {order.reseller && (
                        <span className="inline-block mt-1 text-xs px-1.5 py-0.5 bg-violet-500/10 text-violet-400 rounded">Reseller</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <p className="text-sm font-mono text-neutral-300">{order.mlbbId} ({order.serverId})</p>
                      {order.nickname && <p className="text-xs text-neutral-500 mt-0.5">{order.nickname}</p>}
                      {order.waNumber && <p className="text-xs text-neutral-600 font-mono mt-0.5">{order.waNumber}</p>}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <p className="text-sm font-bold text-amber-400">{order.package?.name ?? <span className="text-neutral-600 italic text-xs">Paket dihapus</span>}</p>
                      <p className="text-sm text-neutral-300">{order.itemName}</p>
                      {order.totalPrice && <p className="text-xs text-violet-400 mt-0.5">{order.totalPrice}</p>}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-300">{order.qty}</td>
                    <td className="px-4 py-3 align-top">
                      {order.storeName ? (
                        <div>
                          <p className="text-sm text-neutral-300 font-medium">{order.storeName}</p>
                          {order.reseller && <p className="text-xs text-neutral-500">{order.reseller.phone}</p>}
                        </div>
                      ) : <span className="text-neutral-600 text-xs">Publik</span>}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border appearance-none cursor-pointer outline-none transition-all ${STATUS_COLORS[order.status]} ${isUpdating ? 'opacity-50 cursor-wait' : ''}`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="DONE">DONE</option>
                        <option value="CANCELED">CANCELED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.paymentStatus}
                        disabled={isUpdating}
                        onChange={(e) => handlePaymentChange(order.id, e.target.value as Order['paymentStatus'])}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border appearance-none cursor-pointer outline-none transition-all ${PAY_COLORS[order.paymentStatus]} ${isUpdating ? 'opacity-50 cursor-wait' : ''}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-neutral-400">{order.paymentMethod || '—'}</td>
                    <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">{fmt(order.payDate)}</td>
                    <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">{fmt(order.finishedDate)}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-1.5">
                        {order.paymentProofUrl && (
                          <a href={order.paymentProofUrl} target="_blank" title="Lihat Bukti Bayar"
                            className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/20 text-emerald-400 transition text-xs">
                            <i className="fa-solid fa-receipt" />
                          </a>
                        )}
                        {order.waNumber && (
                          <a href={`https://wa.me/${order.waNumber}`} target="_blank"
                            className="w-8 h-8 flex items-center justify-center bg-[#25d366]/10 hover:bg-[#25d366]/20 rounded-lg border border-[#25d366]/20 text-[#25d366] transition text-xs">
                            <i className="fa-brands fa-whatsapp" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={11} className="p-16 text-center">
                  <i className="fa-solid fa-inbox text-4xl text-neutral-700 mb-3 block" />
                  <p className="text-neutral-500">Tidak ada order ditemukan.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
