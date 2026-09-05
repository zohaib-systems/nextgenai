"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 24px' }}>
    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Unable to load this page</h1>
    <p role="alert" style={{ color: '#9696b8', margin: '20px 0' }}>Please try again in a moment.</p>
    <button onClick={reset} className="btn-primary">Try again</button>
  </section>;
}
