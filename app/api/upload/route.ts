import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? 'admin123';
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? 'prompt-images';
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

function sanitizeFilename(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? 'image';
  const cleaned = base
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return cleaned.slice(0, 80) || 'image';
}

function extensionFor(type: string, filename: string): string {
  const fromName = filename.includes('.') ? filename.split('.').pop() : '';
  if (fromName && /^[a-z0-9]{2,5}$/i.test(fromName)) return fromName.toLowerCase();
  if (type === 'image/jpeg') return 'jpg';
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  if (type === 'image/gif') return 'gif';
  return 'bin';
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const passcode = String(form.get('passcode') ?? '');
    const file = form.get('file');

    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Passcode' },
        { status: 401 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: 'Image must be between 1 byte and 5 MB' },
        { status: 400 }
      );
    }

    const safeName = sanitizeFilename(file.name);
    const ext = extensionFor(file.type, safeName);
    const path = `prompts/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: '31536000',
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return NextResponse.json(
        { success: false, error: uploadError.message || 'Upload failed' },
        { status: 500 }
      );
    }

    const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
    if (!data?.publicUrl) {
      return NextResponse.json(
        { success: false, error: 'Upload succeeded but public URL was missing' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: data.publicUrl, path });
  } catch (err) {
    console.error('Unexpected error in upload API:', err);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
