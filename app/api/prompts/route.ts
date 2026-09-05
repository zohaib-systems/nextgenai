// app/api/prompts/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

// Admin passcode – fallback to dev default if not set
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? 'admin123';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      passcode,
      title,
      description,
      prompt_text,
      image_url,
      category,
      tags,
    } = payload as {
      passcode: string;
      title: string;
      description: string;
      prompt_text: string;
      image_url: string;
      category: string;
      tags: string[];
    };

    // Server‑side validation of admin passcode
    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin Passcode' },
        { status: 401 }
      );
    }

    // Insert using service‑role client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('prompts')
      .insert({
        title,
        description,
        prompt_text,
        image_url,
        category,
        tags,
      })
      .select(); // return inserted rows for ID

    if (error) {
      console.error('Supabase admin insert error:', error);
      return NextResponse.json(
        { success: false, error: error.message || 'Insert failed' },
        { status: 500 }
      );
    }

    revalidatePath('/');
    revalidatePath('/library');
    revalidatePath('/sitemap.xml');
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('Unexpected error in create prompt API:', err);
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
