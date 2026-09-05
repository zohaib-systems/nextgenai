import type { Metadata } from "next";
export const revalidate = 300;
export const metadata: Metadata = { alternates: { canonical: "/" } };
import HeroSection from '@/components/HeroSection';
import PromptCard from '@/components/PromptCard';
import ExploreCTA from '@/components/ExploreCTA';
import { getLatestPrompts } from '@/lib/supabase';

export default async function Home() {
  const prompts = await getLatestPrompts(6);
  return (
    <>
      <HeroSection />

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px 40px' }}>
        {/* Section header */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
              ✦ Featured Picks
            </p>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, margin: 0,
              background: 'linear-gradient(90deg, #f0f0ff, #c4b5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Trending Prompts
            </h2>
          </div>
          <a href="/library" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600,
            textDecoration: 'none', borderBottom: '1px solid rgba(167,139,250,0.3)',
            paddingBottom: 2, transition: 'all 0.2s',
          }}>
            View all →
          </a>
        </div>

        {prompts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9090b8', padding: '60px 0' }}>
            No prompts found yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, i) => (
              <div key={prompt.id} style={{ animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
                <PromptCard
                  id={prompt.id}
                  title={prompt.title}
                  description={prompt.description}
                  prompt_text={prompt.prompt_text}
                  image_url={prompt.image_url}
                  category={prompt.category}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <ExploreCTA />
    </>
  );
}
