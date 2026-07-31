"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PromptCard from "@/components/PromptCard";
import { type Prompt } from "@/lib/supabase";
import { Search } from "lucide-react";

interface Props {
  prompts?: Prompt[];
}

const categories = ["All", "Writing", "Development", "Marketing"];

const categoryColors: Record<string, { active: string; border: string }> = {
  All: { active: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', border: 'rgba(139,92,246,0.5)' },
  Writing: { active: 'linear-gradient(135deg, #7c3aed, #a855f7)', border: 'rgba(168,85,247,0.5)' },
  Development: { active: 'linear-gradient(135deg, #0891b2, #06b6d4)', border: 'rgba(6,182,212,0.5)' },
  Marketing: { active: 'linear-gradient(135deg, #ea580c, #f97316)', border: 'rgba(249,115,22,0.5)' },
};

export default function LibraryClient({ prompts = [] }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") ?? "";
  const initialCat = searchParams?.get("category") ?? "All";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCat);
  const [focused, setFocused] = useState(false);

  const safePrompts = Array.isArray(prompts) ? prompts : [];

  const filtered = safePrompts.filter((p) => {
    const matchesCat = category === "All" || p.category === category;
    const lower = query.toLowerCase();
    const matchesQuery =
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.prompt_text.toLowerCase().includes(lower);
    return matchesCat && matchesQuery;
  });

  const updateUrl = (q: string, cat: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat && cat !== "All") params.set("category", cat);
    router.replace(`/library?${params.toString()}`);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    updateUrl(val, category);
  };

  const handleCategoryClick = (cat: string) => {
    setCategory(cat);
    updateUrl(query, cat);
  };

  return (
    <section style={{ minHeight: '100vh', padding: '32px 24px 80px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 40, paddingTop: 16 }}>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 8px',
          background: 'linear-gradient(90deg, #f0f0ff, #c4b5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Prompt Library
        </h1>
        <p style={{ color: '#6666a0', fontSize: '1rem', margin: 0 }}>
          {filtered.length} prompt{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Sticky search + filters */}
      <div style={{
        position: 'sticky', top: 12, zIndex: 20, marginBottom: 36,
      }}>
        <div style={{
          background: 'rgba(8,8,20,0.85)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139,92,246,0.15)', borderRadius: 20,
          padding: '16px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {/* Search input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: focused ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${focused ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 12, padding: '10px 16px',
            transition: 'all 0.2s ease',
            marginBottom: 14,
            boxShadow: focused ? '0 0 20px rgba(139,92,246,0.12)' : 'none',
          }}>
            <Search size={16} style={{ color: '#6060a0', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search prompts by title, description, or content..."
              value={query}
              onChange={handleQueryChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#f0f0ff', fontSize: '0.9rem', fontFamily: 'inherit',
              }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); updateUrl('', category); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#6060a0', fontSize: '1.1rem', lineHeight: 1, padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const active = category === cat;
              const c = categoryColors[cat] ?? categoryColors.All;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    padding: '6px 18px', borderRadius: 50, fontSize: '0.82rem',
                    fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    minHeight: 44,
                    background: active ? c.active : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                    color: active ? '#fff' : '#8888aa',
                    boxShadow: active ? `0 0 16px ${c.border}` : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#4444668' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>✦</div>
          <p style={{ fontSize: '1.1rem', color: '#5555808' }}>No prompts found. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} style={{ animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}>
              <PromptCard {...p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
