'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createOrder(data: {
  packageId: string;
  itemName: string;
  qty?: number;
  totalPrice?: string;
  mlbbId: string;
  serverId: string;
  nickname: string;
  note?: string;
  waNumber?: string;
  paymentMethod?: string;
  paymentProofUrl?: string;
  // Reseller context (passed from session)
  storeName?: string;
  resellerId?: string;
}) {
  try {
    const pkg = await prisma.package.findUnique({ where: { id: data.packageId } });
    if (!pkg) return { success: false, error: 'Paket tidak ditemukan.' };
    if (!pkg.isActive) return { success: false, error: 'Paket tidak aktif.' };
    if (pkg.stock <= 0) return { success: false, error: 'Stok habis.' };

    const year = new Date().getFullYear();
    const rnd = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `TS-${year}-${rnd}`;

    const order = await prisma.order.create({
      data: {
        orderCode,
        packageId: data.packageId,
        itemName: data.itemName,
        qty: data.qty ?? 1,
        totalPrice: data.totalPrice || null,
        mlbbId: data.mlbbId,
        serverId: data.serverId,
        nickname: data.nickname,
        note: data.note || null,
        waNumber: data.waNumber || null,
        paymentMethod: data.paymentMethod || null,
        paymentProofUrl: data.paymentProofUrl || null,
        storeName: data.storeName || null,
        resellerId: data.resellerId || null,
        status: 'NEW',
        paymentStatus: 'PENDING',
        events: {
          create: {
            eventType: 'ORDER_CREATED',
            message: data.resellerId
              ? `Order dibuat oleh reseller: ${data.storeName}`
              : 'Order dibuat oleh pelanggan',
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
      take: 200,
      include: {
        package: { select: { name: true, category: true, resellerPrice: true } },
        reseller: { select: { storeName: true, fullName: true, phone: true } },
      },
    });
    return orders;
  } catch (error) {
    console.error('Failed to fetch admin orders:', error);
    return [];
  }
}

export async function getResellerOrders(resellerId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { resellerId },
      orderBy: { createdAt: 'desc' },
      include: {
        package: { select: { name: true, category: true, resellerPrice: true, price: true } },
      },
    });
    return orders;
  } catch (error) {
    console.error('Failed to fetch reseller orders:', error);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: 'NEW' | 'CONFIRMED' | 'DONE' | 'CANCELED'
) {
  try {
    const updateData: Record<string, unknown> = { status: newStatus };
    if (newStatus === 'DONE') {
      updateData.finishedDate = new Date();
    }

    await prisma.order.update({ where: { id: orderId }, data: updateData });
    await prisma.orderEvent.create({
      data: {
        orderId,
        eventType: 'STATUS_UPDATED',
        message: `Status diubah menjadi ${newStatus}`,
      },
    });
    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    revalidatePath('/reseller');
    revalidatePath('/reseller/orders');
    return { success: true };
  } catch (error) {
    console.error('Failed to update status:', error);
    return { success: false, error: 'Gagal mengupdate status' };
  }
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED',
  paymentMethod?: string,
  paymentProofUrl?: string
) {
  try {
    const updateData: Record<string, unknown> = { paymentStatus };
    if (paymentMethod) updateData.paymentMethod = paymentMethod;
    if (paymentProofUrl) updateData.paymentProofUrl = paymentProofUrl;
    if (paymentStatus === 'PAID') updateData.payDate = new Date();

    await prisma.order.update({ where: { id: orderId }, data: updateData });
    await prisma.orderEvent.create({
      data: {
        orderId,
        eventType: 'PAYMENT_UPDATED',
        message: `Status pembayaran: ${paymentStatus}${paymentMethod ? ` via ${paymentMethod}` : ''}`,
      },
    });
    revalidatePath('/admin/orders');
    revalidatePath('/reseller/orders');
    return { success: true };
  } catch (error) {
    console.error('Failed to update payment:', error);
    return { success: false, error: 'Gagal update status pembayaran' };
  }
}
