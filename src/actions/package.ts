'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

function getPublicDir(): string {
  const subDirCandidate = path.join(process.cwd(), 'toro-store-app', 'public');
  if (existsSync(subDirCandidate)) return subDirCandidate;
  return path.join(process.cwd(), 'public');
}

export async function getPackages() {
  try {
    return await prisma.package.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
  } catch (error) {
    console.error('Failed to fetch packages:', error);
    return [];
  }
}

export async function getAdminPackages() {
  try {
    return await prisma.package.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      include: { _count: { select: { orders: true } } },
    });
  } catch (error) {
    console.error('Failed to fetch admin packages:', error);
    return [];
  }
}

export async function getPackageById(id: string) {
  try {
    return await prisma.package.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export async function createPackage(data: {
  name: string;
  description?: string;
  price: string;
  category: string;
  imageUrl?: string;
  stock: number;
  isActive: boolean;
  sortOrder: number;
}) {
  try {
    await prisma.package.create({ data });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    return { success: true };
  } catch (error) {
    console.error('Failed to create package:', error);
    return { success: false, error: 'Gagal membuat paket.' };
  }
}

export async function updatePackage(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: string;
    category?: string;
    imageUrl?: string;
    stock?: number;
    isActive?: boolean;
    sortOrder?: number;
  }
) {
  try {
    await prisma.package.update({ where: { id }, data });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    return { success: true };
  } catch (error) {
    console.error('Failed to update package:', error);
    return { success: false, error: 'Gagal mengupdate paket.' };
  }
}

export async function deletePackage(id: string) {
  try {
    // Delete order events first, then orders, then package (cascade)
    const orders = await prisma.order.findMany({ where: { packageId: id }, select: { id: true } });
    const orderIds = orders.map(o => o.id);
    if (orderIds.length > 0) {
      await prisma.orderEvent.deleteMany({ where: { orderId: { in: orderIds } } });
      await prisma.order.deleteMany({ where: { id: { in: orderIds } } });
    }
    await prisma.package.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete package:', error);
    return { success: false, error: 'Gagal menghapus paket.' };
  }
}

export async function bulkDeletePackages(ids: string[]) {
  try {
    const orders = await prisma.order.findMany({ where: { packageId: { in: ids } }, select: { id: true } });
    const orderIds = orders.map(o => o.id);
    if (orderIds.length > 0) {
      await prisma.orderEvent.deleteMany({ where: { orderId: { in: orderIds } } });
      await prisma.order.deleteMany({ where: { id: { in: orderIds } } });
    }
    await prisma.package.deleteMany({ where: { id: { in: ids } } });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    revalidatePath('/admin');
    return { success: true, count: ids.length };
  } catch (error) {
    console.error('Failed to bulk delete:', error);
    return { success: false, error: 'Gagal menghapus paket.' };
  }
}

export async function bulkUpdatePackages(ids: string[], data: { isActive?: boolean }) {
  try {
    await prisma.package.updateMany({ where: { id: { in: ids } }, data });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    return { success: true, count: ids.length };
  } catch (error) {
    console.error('Failed to bulk update:', error);
    return { success: false, error: 'Gagal mengupdate paket.' };
  }
}

export async function uploadPackageImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;
    if (!file || file.size === 0) return { success: false, error: 'File tidak ditemukan.' };

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!allowed.includes(file.type)) return { success: false, error: 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.' };

    if (file.size > 10 * 1024 * 1024) return { success: false, error: 'Ukuran file maksimal 10MB.' };

    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const webpBuffer = await sharp(inputBuffer)
      .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const filename = `pkg_${Date.now()}.webp`;
    const uploadDir = path.join(getPublicDir(), 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), webpBuffer);

    return { success: true, url: `/uploads/${filename}` };
  } catch (error) {
    console.error('Upload failed:', error);
    return { success: false, error: 'Upload gagal.' };
  }
}
