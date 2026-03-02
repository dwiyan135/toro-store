'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export type CreateUserData = {
  username: string;
  password: string;
  fullName: string;
  email?: string;
  phone: string;
  ktpNumber?: string;
  storeName: string;
  storeDescription?: string;
  storeInstagram?: string;
  storePlatform?: string;
  address?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  adminNote?: string;
};

export type UpdateUserData = Partial<Omit<CreateUserData, 'username' | 'password'>> & {
  newPassword?: string;
  isActive?: boolean;
};

export async function createUser(data: CreateUserData) {
  try {
    const exists = await prisma.user.findUnique({ where: { username: data.username } });
    if (exists) return { success: false, error: 'Username sudah digunakan.' };

    const passwordHash = await bcrypt.hash(data.password, 10);

    await prisma.user.create({
      data: {
        username: data.username,
        passwordHash,
        role: 'RESELLER',
        fullName: data.fullName,
        email: data.email || null,
        phone: data.phone,
        ktpNumber: data.ktpNumber || null,
        storeName: data.storeName,
        storeDescription: data.storeDescription || null,
        storeInstagram: data.storeInstagram || null,
        storePlatform: data.storePlatform || null,
        address: data.address || null,
        bankName: data.bankName || null,
        bankAccountNumber: data.bankAccountNumber || null,
        bankAccountName: data.bankAccountName || null,
        adminNote: data.adminNote || null,
        isActive: true,
      },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { success: false, error: 'Gagal membuat akun reseller.' };
  }
}

export async function updateUser(id: string, data: UpdateUserData) {
  try {
    const updateData: Record<string, unknown> = { ...data };
    delete updateData.newPassword;

    if (data.newPassword) {
      updateData.passwordHash = await bcrypt.hash(data.newPassword, 10);
    }

    await prisma.user.update({ where: { id }, data: updateData });
    revalidatePath('/admin/users');
    revalidatePath('/reseller/profile');
    return { success: true };
  } catch (error) {
    console.error('Failed to update user:', error);
    return { success: false, error: 'Gagal memperbarui data.' };
  }
}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      username: true,
      role: true,
      fullName: true,
      email: true,
      phone: true,
      ktpNumber: true,
      storeName: true,
      storeDescription: true,
      storeInstagram: true,
      storePlatform: true,
      address: true,
      bankName: true,
      bankAccountNumber: true,
      bankAccountName: true,
      isActive: true,
      adminNote: true,
      joinDate: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      role: true,
      fullName: true,
      email: true,
      phone: true,
      ktpNumber: true,
      storeName: true,
      storeDescription: true,
      storeInstagram: true,
      storePlatform: true,
      address: true,
      bankName: true,
      bankAccountNumber: true,
      bankAccountName: true,
      isActive: true,
      adminNote: true,
      joinDate: true,
      createdAt: true,
    },
  });
}

export async function toggleUserActive(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return { success: false, error: 'User tidak ditemukan.' };
    await prisma.user.update({ where: { id }, data: { isActive: !user.isActive } });
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle user:', error);
    return { success: false, error: 'Gagal mengubah status.' };
  }
}

export async function deleteUser(id: string) {
  try {
    const activeOrders = await prisma.order.count({
      where: { resellerId: id, status: { in: ['NEW', 'CONFIRMED'] } },
    });
    if (activeOrders > 0) {
      return { success: false, error: `Tidak bisa dihapus: ada ${activeOrders} order aktif.` };
    }
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, error: 'Gagal menghapus user.' };
  }
}
