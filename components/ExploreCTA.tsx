import Link from 'next/link';

export default function ExploreCTA() {
  return (
    <section style={{
      padding: '60px 24px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow backdrop */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 200,
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content box */}
      <div style={{
        maxWidth: 600, margin: '0 auto',
        background: 'linear-gradient(145deg, rgba(14,14,31,0.8), rgba(18,10,40,0.6))',
        border: '1px solid rgba(139,92,246,0.25)',
        borderRadius: 24, padding: '48px 40px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 0 60px rgba(139,92,246,0.1), 0 24px 64px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16,
        }}>
          ✦ Full Collection
        </div>
        <h2 style={{
          fontSize: '2rem', fontWeight: 800, margin: '0 0 16px',
          background: 'linear-gradient(90deg, #f0f0ff, #c4b5fd)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Ready to explore more?
        </h2>
        <p style={{ color: '#9696b8', marginBottom: 32, fontSize: '1rem', lineHeight: 1.65 }}>
          Browse our entire collection of hand-picked AI prompts across writing, coding, marketing, and more.
        </p>
        <Link href="/library" className="explore-button" style={{ padding: '12px 36px', fontSize: '1rem' }}>
          Explore Full Library →
        </Link>
      </div>
    </section>
  );
}
