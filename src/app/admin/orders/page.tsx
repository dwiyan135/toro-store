'use client';

import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus } from '@/actions/order';

type Order = {
  id: string;
  orderCode: string;
  package: { name: string; category: string } | null;
  itemName: string;
  mlbbId: string;
  serverId: string;
  nickname: string | null;
  waNumber: string | null;
  status: 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED';
  createdAt: Date;
};

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  CONFIRMED: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  DONE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  CANCELED: 'bg-red-500/10 text-red-400 border-red-500/30',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED'>('ALL');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await getAdminOrders();
    // @ts-ignore
    setOrders(data);
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED') => {
    setUpdatingId(id);
    const res = await updateOrderStatus(id, newStatus);
    if (res.success) await fetchOrders();
    else alert(res.error);
    setUpdatingId(null);
  };

  const copyTemplate = (order: Order) => {
    const text = `Halo kak ${order.nickname || ''},\n\nOrder #${order.orderCode} (${order.package?.name ?? ''}) untuk skin/event "${order.itemName}" sudah kami proses ya.\n\nTerima kasih sudah percayakan ke Toro Store! 🎮`;
    navigator.clipboard.writeText(text);
    alert('Template balasan disalin!');
  };

  const filtered = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

  if (isLoading) return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
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
          <i className="fa-solid fa-rotate-right"></i> Refresh
        </button>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['ALL', 'NEW', 'CONFIRMED', 'DONE', 'CANCELED'] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              filter === s
                ? s === 'ALL' ? 'bg-white text-neutral-950' : `${statusColors[s]} border`
                : 'bg-neutral-800 text-neutral-500 hover:text-white'
            }`}
          >
            {s === 'ALL' ? `Semua (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Order</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Detail Game</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pesanan</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 align-top">
                    <div className="font-mono text-sm text-blue-400 font-bold">{order.orderCode}</div>
                    <div className="text-xs text-neutral-600 mt-1">{new Date(order.createdAt).toLocaleString('id-ID')}</div>
                  </td>
                  <td className="p-4 align-top">
                    <div className="text-sm"><span className="text-neutral-500">ID:</span> <span className="font-mono">{order.mlbbId}</span> <span className="text-neutral-600">({order.serverId})</span></div>
                    {order.nickname && <div className="text-sm mt-1 text-neutral-400">{order.nickname}</div>}
                    {order.waNumber && <div className="text-xs mt-1 text-neutral-600 font-mono">{order.waNumber}</div>}
                  </td>
                  <td className="p-4 align-top">
                    <div className="text-sm font-bold text-amber-400">{order.package?.name ?? <span className="text-neutral-600 italic">Paket dihapus</span>}</div>
                    <div className="text-sm text-neutral-300 mt-0.5">{order.itemName}</div>
                    {order.package?.category && <div className="text-xs text-neutral-600 mt-1">{order.package.category}</div>}
                  </td>
                  <td className="p-4 align-top">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`text-xs font-bold rounded-lg px-3 py-2 border appearance-none cursor-pointer outline-none transition-all ${statusColors[order.status]} ${updatingId === order.id ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="DONE">DONE</option>
                      <option value="CANCELED">CANCELED</option>
                    </select>
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => copyTemplate(order)} className="w-8 h-8 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition text-neutral-400 hover:text-white" title="Copy template WA">
                        <i className="fa-regular fa-copy text-xs"></i>
                      </button>
                      {order.waNumber && (
                        <a href={`https://wa.me/${order.waNumber}`} target="_blank"
                          className="w-8 h-8 flex items-center justify-center bg-[#25d366]/10 hover:bg-[#25d366]/20 rounded-lg border border-[#25d366]/20 text-[#25d366] transition">
                          <i className="fa-brands fa-whatsapp text-xs"></i>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="p-16 text-center">
                  <i className="fa-solid fa-inbox text-4xl text-neutral-700 mb-3 block"></i>
                  <p className="text-neutral-500">Tidak ada order dengan filter ini.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
