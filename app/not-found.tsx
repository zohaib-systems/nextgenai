import Link from 'next/link';

export default function NotFound() {
  return <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 24px' }}>
    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Page not found</h1>
    <p style={{ color: '#9696b8', margin: '20px 0' }}>This page could not be found. Explore the library to find a prompt.</p>
    <Link href="/library" className="btn-primary" style={{ display: 'inline-block' }}>Browse the library</Link>
  </section>;
}
