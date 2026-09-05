import { Suspense } from "react";
import { getAllPrompts } from "@/lib/supabase";
import type { Metadata } from "next";
import LibraryClient from "./LibraryClient";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean(params.q || params.category);
  return {
    title: 'AI Prompt Library — NextGenAI',
    description: 'Browse AI prompts for writing, development, and marketing. Search by title, description, or prompt content.',
    alternates: { canonical: '/library' },
    robots: filtered ? { index: false, follow: true } : undefined,
    openGraph: { title: 'AI Prompt Library — NextGenAI', url: '/library' },
  };
}

export default async function LibraryPage() {
  const prompts = await getAllPrompts();
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading library...</div>}>
      <LibraryClient prompts={prompts ?? []} />
    </Suspense>
  );
}
