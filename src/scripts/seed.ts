/**
 * Seed script: creates the default admin user if it doesn't exist.
 * 
 * Run AFTER migration:
 *   npx tsx src/scripts/seed.ts
 * OR via npm script (see package.json)
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (existing) {
    console.log('✅ Admin user already exists, skipping seed.');
    return;
  }

  const password = process.env.ADMIN_PASSWORD || 'admin_toro';
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: 'admin',
      passwordHash,
      role: 'ADMIN',
      fullName: 'Administrator',
      phone: '0',
      storeName: 'Toro Store Admin',
      isActive: true,
    },
  });

  console.log(`✅ Admin user created! Login: admin / ${password}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
