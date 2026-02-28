import { getAdminOrders } from '@/actions/order';
import { getAdminPackages } from '@/actions/package';
import Link from 'next/link';

export default async function AdminDashboard() {
  const recentOrders = await getAdminOrders();
  const packages = await getAdminPackages();

  const totalOrders = recentOrders.length;
  const newOrders = recentOrders.filter(o => o.status === 'NEW').length;
  const doneOrders = recentOrders.filter(o => o.status === 'DONE').length;
  const activePackages = packages.filter(p => p.isActive).length;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end border-b border-white/5 pb-5">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Ringkasan aktivitas Toro Store</p>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Order', value: totalOrders, color: 'text-white', border: 'border-white/5', sub: 'semua waktu' },
          { label: 'Pending', value: newOrders, color: 'text-blue-400', border: 'border-blue-500/20', sub: 'menunggu konfirmasi' },
          { label: 'Selesai', value: doneOrders, color: 'text-emerald-400', border: 'border-emerald-500/20', sub: 'berhasil diproses' },
          { label: 'Paket Aktif', value: activePackages, color: 'text-amber-400', border: 'border-amber-500/20', sub: 'tampil di publik' },
        ].map(s => (
          <div key={s.label} className={`bg-[#0d0f17] border ${s.border} p-5 rounded-2xl`}>
            <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-4xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-neutral-600 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/packages" className="flex items-center gap-4 p-5 bg-[#0d0f17] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl border border-blue-500/20">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div>
            <h3 className="font-bold group-hover:text-blue-400 transition-colors">Manajemen Paket</h3>
            <p className="text-neutral-500 text-sm">{packages.length} paket terdaftar</p>
          </div>
          <i className="fa-solid fa-arrow-right ml-auto text-neutral-700 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"></i>
        </Link>
        <Link href="/admin/orders" className="flex items-center gap-4 p-5 bg-[#0d0f17] border border-white/5 rounded-2xl hover:border-amber-500/30 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-xl border border-amber-500/20">
            <i className="fa-solid fa-list-check"></i>
          </div>
          <div>
            <h3 className="font-bold group-hover:text-amber-400 transition-colors">Data Order</h3>
            <p className="text-neutral-500 text-sm">{newOrders} order menunggu</p>
          </div>
          <i className="fa-solid fa-arrow-right ml-auto text-neutral-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all"></i>
        </Link>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Order Terbaru</h2>
          <Link href="/admin/orders" className="text-sm text-blue-400 hover:text-blue-300 transition">Lihat Semua →</Link>
        </div>
        <div className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Order ID</th>
                  <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Paket</th>
                  <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Skin/Event</th>
                  <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-white/2 transition-colors">
                    <td className="p-4 text-sm font-mono text-blue-400">{order.orderCode}</td>
                    <td className="p-4 text-sm text-neutral-300">{order.package?.name ?? '—'}</td>
                    <td className="p-4 text-sm text-neutral-300">{order.itemName}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        order.status === 'NEW' ? 'bg-blue-500/10 text-blue-400'
                        : order.status === 'CONFIRMED' ? 'bg-amber-500/10 text-amber-400'
                        : order.status === 'DONE' ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                      }`}>{order.status}</span>
                    </td>
                    <td className="p-4 text-sm text-neutral-600 whitespace-nowrap">
                      {order.createdAt.toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr><td colSpan={5} className="p-10 text-center text-neutral-600">Belum ada order masuk</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
