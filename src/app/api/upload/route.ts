import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

// Resolve the correct project root regardless of where `next` is invoked from.
// When running `next dev toro-store-app` from scratch/, process.cwd() = scratch/
// But the public folder is in scratch/toro-store-app/public/
function getPublicDir(): string {
  const subDirCandidate = path.join(process.cwd(), 'toro-store-app', 'public');
  if (existsSync(subDirCandidate)) {
    return subDirCandidate;
  }
  // Running from inside the project folder directly (e.g., `next dev`)
  return path.join(process.cwd(), 'public');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: 'File tidak ditemukan.' }, { status: 400 });
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.' },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Ukuran file maksimal 10MB.' },
        { status: 400 }
      );
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // Convert to WebP for smaller file size
    const webpBuffer = await sharp(inputBuffer)
      .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const filename = `pkg_${Date.now()}.webp`;
    const uploadDir = path.join(getPublicDir(), 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), webpBuffer);

    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ success: false, error: 'Upload gagal.' }, { status: 500 });
  }
}
