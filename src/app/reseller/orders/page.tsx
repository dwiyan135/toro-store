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
    return payload as { userId: string; storeName: string };
  } catch { redirect('/login'); }
}

export const dynamic = 'force-dynamic';

const STATUS_BADGE: Record<string, string> = {
  NEW: 'bg-blue-500/10 text-blue-400',
  CONFIRMED: 'bg-amber-500/10 text-amber-400',
  DONE: 'bg-emerald-500/10 text-emerald-400',
  CANCELED: 'bg-red-500/10 text-red-400',
};

const PAY_BADGE: Record<string, string> = {
  PENDING: 'bg-amber-500/10 text-amber-400',
  PAID: 'bg-emerald-500/10 text-emerald-400',
  FAILED: 'bg-red-500/10 text-red-400',
};

function fmt(d: Date | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default async function ResellerOrdersPage() {
  const session = await getSession();
  const orders = await getResellerOrders(session.userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h1 className="text-2xl font-bold">Order Saya</h1>
          <p className="text-neutral-400 text-sm mt-1">{orders.length} total order dari {session.storeName}</p>
        </div>
        <Link href="/reseller/orders/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm w-fit">
          <i className="fa-solid fa-plus" /> Buat Order Baru
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#0d0f17] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" style={{ minWidth: '1100px' }}>
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0c14]">
                {[
                  'Order ID', 'Paket / Nama Item', 'Harga Reseller', 'Qty',
                  'ID Akun + Server', 'Username', 'Status Order', 'Status Bayar',
                  'Metode Bayar', 'Store', 'Tgl Bayar', 'Tgl Selesai', 'Dibuat'
                ].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-400 text-xs whitespace-nowrap">{o.orderCode}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-white font-medium">{o.itemName}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{o.package?.name} · {o.package?.category}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-violet-400 font-semibold whitespace-nowrap">
                    {o.package?.resellerPrice || <span className="text-neutral-600 text-xs italic">—</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-300">{o.qty}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-mono text-neutral-300">{o.mlbbId}</p>
                    <p className="text-xs text-neutral-500">Server: {o.serverId}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-300">{o.nickname || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${STATUS_BADGE[o.status] || ''}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${PAY_BADGE[o.paymentStatus] || ''}`}>{o.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-400 whitespace-nowrap">{o.paymentMethod || '—'}</td>
                  <td className="px-4 py-3 text-sm text-neutral-300 whitespace-nowrap">{o.storeName || '—'}</td>
                  <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">{fmt(o.payDate)}</td>
                  <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">{fmt(o.finishedDate)}</td>
                  <td className="px-4 py-3 text-xs text-neutral-600 whitespace-nowrap">{fmt(o.createdAt)}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={13} className="p-16 text-center">
                    <div className="flex flex-col items-center gap-4 text-neutral-600">
                      <i className="fa-solid fa-box-open text-4xl opacity-30" />
                      <p>Belum ada order</p>
                      <Link href="/reseller/orders/new" className="text-blue-400 hover:text-blue-300 text-sm transition">Buat order pertama →</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-neutral-600">
        <p>Status Order:</p>
        {Object.entries(STATUS_BADGE).map(([k, v]) => <span key={k} className={`px-2 py-0.5 rounded-full ${v}`}>{k}</span>)}
        <p className="ml-4">Status Bayar:</p>
        {Object.entries(PAY_BADGE).map(([k, v]) => <span key={k} className={`px-2 py-0.5 rounded-full ${v}`}>{k}</span>)}
      </div>
    </div>
  );
}
