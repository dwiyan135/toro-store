'use server';

// This file is kept for backward compatibility.
// All package/stock management is now done via Package model.
// See /actions/package.ts for the new CRUD actions.

export async function getStock() {
  // Returns a dummy value to avoid breaking old references
  return { basicStock: 0, premiumStock: 0, specialStock: 0 };
}

export async function updateStock() {
  return { success: false, error: 'Gunakan halaman Paket untuk mengelola stok.' };
}
