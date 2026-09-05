export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      padding: '100px 24px 80px',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%', width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
        animation: 'float 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '10%', width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite reverse',
      }} />

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(139,92,246,0.12)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: 50, padding: '6px 18px',
        marginBottom: 32,
        backdropFilter: 'blur(8px)',
      }}>
        <span style={{ fontSize: 13, color: '#a78bfa', fontWeight: 600, letterSpacing: '0.08em' }}>
          ✦ AI Prompt Library
        </span>
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
        fontWeight: 900,
        lineHeight: 1.1,
        marginBottom: 24,
        letterSpacing: '-0.02em',
      }}>
        <span style={{
          background: 'linear-gradient(90deg, #f0f0ff 30%, #c4b5fd 60%, #67e8f9 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Discover AI
        </span>
        <br />
        <span style={{
          background: 'linear-gradient(90deg, #a78bfa, #818cf8, #67e8f9)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Prompt Gems
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.15rem', color: '#9090b8', maxWidth: 560,
        margin: '0 auto 48px', lineHeight: 1.7, fontWeight: 400,
      }}>
        Browse, copy, and share the best AI prompts curated for creators, developers, and marketers.
      </p>

      {/* Search */}
      <form action="/library" method="get" role="search" className="hero-search" style={{
        display: 'flex', maxWidth: 540, margin: '0 auto',
        background: 'rgba(14,14,31,0.8)',
        border: '1.5px solid rgba(139,92,246,0.2)',
        borderRadius: 50, padding: '6px 6px 6px 22px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'all 0.25s ease',
        gap: 8,
      }}>
        <input
          type="search"
          name="q"
          aria-label="Search prompts"
          placeholder="Search prompts..."
          style={{
            flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none',
            color: '#f0f0ff', fontSize: '1rem', fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
            color: '#fff', border: 'none', borderRadius: 50,
            flexShrink: 0,
            padding: '10px 28px', fontWeight: 700, fontSize: '0.9rem',
            cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit',
            boxShadow: '0 4px 12px rgba(139,92,246,0.4)',
            letterSpacing: '0.02em',
          }}
        >
          Search
        </button>
      </form>

      {/* Stats row */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 40, marginTop: 56,
        flexWrap: 'wrap',
      }}>
        {[['500+', 'Prompts'], ['10k+', 'Users'], ['50+', 'Categories']].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa' }}>{num}</div>
            <div style={{ fontSize: '0.8rem', color: '#666699', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
