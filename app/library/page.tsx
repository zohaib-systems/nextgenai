import { Suspense } from "react";
import { getAllPrompts, type Prompt } from "@/lib/supabase";
import LibraryClient from "./LibraryClient";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LibraryPage() {
  const prompts = await getAllPrompts();
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading library...</div>}>
      <LibraryClient prompts={prompts ?? []} />
    </Suspense>
  );
}
