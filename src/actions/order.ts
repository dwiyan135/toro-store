'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createOrder(data: {
  packageId: string;
  itemName: string;
  mlbbId: string;
  serverId: string;
  nickname: string;
  note?: string;
  waNumber: string;
}) {
  try {
    // 1. Verify package exists and has stock
    const pkg = await prisma.package.findUnique({ where: { id: data.packageId } });
    if (!pkg) return { success: false, error: 'Paket tidak ditemukan.' };
    if (!pkg.isActive) return { success: false, error: 'Paket tidak aktif.' };
    if (pkg.stock <= 0) return { success: false, error: 'Stok habis.' };

    // 2. Generate unique order code (TS-YYYY-RND4)
    const year = new Date().getFullYear();
    const rnd = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `TS-${year}-${rnd}`;

    // 3. Save order to database
    const order = await prisma.order.create({
      data: {
        orderCode,
        packageId: data.packageId,
        itemName: data.itemName,
        mlbbId: data.mlbbId,
        serverId: data.serverId,
        nickname: data.nickname,
        note: data.note,
        waNumber: data.waNumber,
        status: 'NEW',
        events: {
          create: {
            eventType: 'ORDER_CREATED',
            message: 'Order placed by user',
          },
        },
      },
    });

    return { success: true, orderCode: order.orderCode, packageName: pkg.name };
  } catch (error) {
    console.error('Failed to create order:', error);
    return { success: false, error: 'Terjadi kesalahan sistem.' };
  }
}

export async function getAdminOrders() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { package: { select: { name: true, category: true } } },
    });
    return orders;
  } catch (error) {
    console.error('Failed to fetch admin orders:', error);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED'
) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    await prisma.orderEvent.create({
      data: {
        orderId,
        eventType: 'STATUS_UPDATED',
        message: `Status diubah menjadi ${newStatus}`,
      },
    });
    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Failed to update status:', error);
    return { success: false, error: 'Gagal mengupdate status' };
  }
}
