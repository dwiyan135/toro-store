import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import { getResellerOrders } from '@/actions/order';
import Link from 'next/link';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'toro_store_jwt_fallback_2024');

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) redirect('/login');
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string; storeName: string; username: string };
  } catch { redirect('/login'); }
}

export const dynamic = 'force-dynamic';

export default async function ResellerDashboard() {
  const session = await getSession();
  const orders = await getResellerOrders(session.userId);

  const total = orders.length;
  const pending = orders.filter(o => o.status === 'NEW' || o.status === 'CONFIRMED').length;
  const done = orders.filter(o => o.status === 'DONE').length;
  const paid = orders.filter(o => o.paymentStatus === 'PAID').length;
  const unpaid = orders.filter(o => o.paymentStatus === 'PENDING').length;
  const recentOrders = orders.slice(0, 5);

  const statusStyle = (s: string) => {
    if (s === 'NEW') return 'bg-blue-500/10 text-blue-400';
    if (s === 'CONFIRMED') return 'bg-amber-500/10 text-amber-400';
    if (s === 'DONE') return 'bg-emerald-500/10 text-emerald-400';
    return 'bg-red-500/10 text-red-400';
  };

  const payStyle = (s: string) => {
    if (s === 'PAID') return 'bg-emerald-500/10 text-emerald-400';
    if (s === 'FAILED') return 'bg-red-500/10 text-red-400';
    return 'bg-amber-500/10 text-amber-400';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Selamat Datang,</h1>
        <p className="text-neutral-400 mt-1">
          <span className="text-white font-semibold">{session.storeName}</span> — ringkasan aktivitas reseller Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total Order', value: total, color: 'text-white', border: 'border-white/5' },
          { label: 'Menunggu', value: pending, color: 'text-blue-400', border: 'border-blue-500/20' },
          { label: 'Selesai', value: done, color: 'text-emerald-400', border: 'border-emerald-500/20' },
          { label: 'Lunas', value: paid, color: 'text-violet-400', border: 'border-violet-500/20' },
          { label: 'Belum Bayar', value: unpaid, color: 'text-amber-400', border: 'border-amber-500/20' },
        ].map(s => (
          <div key={s.label} className={`bg-[#0d0f17] border ${s.border} p-5 rounded-2xl`}>
            <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/reseller/orders/new" className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-2xl hover:border-blue-500/50 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl border border-blue-500/30">
            <i className="fa-solid fa-plus" />
          </div>
          <div>
            <h3 className="font-bold group-hover:text-blue-400 transition-colors">Buat Order Baru</h3>
            <p className="text-neutral-500 text-sm">Input order dari pelanggan Anda</p>
          </div>
          <i className="fa-solid fa-arrow-right ml-auto text-neutral-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </Link>
        <Link href="/reseller/orders" className="flex items-center gap-4 p-5 bg-[#0d0f17] border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl border border-emerald-500/20">
            <i className="fa-solid fa-list-check" />
          </div>
          <div>
            <h3 className="font-bold group-hover:text-emerald-400 transition-colors">Riwayat Order</h3>
            <p className="text-neutral-500 text-sm">{pending} order sedang berjalan</p>
          </div>
          <i className="fa-solid fa-arrow-right ml-auto text-neutral-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Order Terbaru</h2>
          <Link href="/reseller/orders" className="text-sm text-blue-400 hover:text-blue-300 transition">Lihat Semua →</Link>
        </div>
        <div className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order ID', 'Paket / Item', 'Status Order', 'Status Bayar', 'Waktu'].map(h => (
                    <th key={h} className="p-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map(o => (
                  <tr key={o.id} className="hover:bg-white/2 transition-colors">
                    <td className="p-4 font-mono text-blue-400 text-sm">{o.orderCode}</td>
                    <td className="p-4">
                      <p className="text-sm text-white font-medium">{o.itemName}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{o.package?.name}</p>
                    </td>
                    <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyle(o.status)}`}>{o.status}</span></td>
                    <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${payStyle(o.paymentStatus)}`}>{o.paymentStatus}</span></td>
                    <td className="p-4 text-sm text-neutral-500 whitespace-nowrap">
                      {o.createdAt.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={5} className="p-12 text-center text-neutral-600">Belum ada order. <Link href="/reseller/orders/new" className="text-blue-400 hover:underline">Buat order pertama →</Link></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
