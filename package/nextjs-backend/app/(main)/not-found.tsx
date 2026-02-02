import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px',
        textAlign: 'center',
        background: '#fafafa',
      }}
    >
      <span style={{ fontSize: 80, marginBottom: 24 }}>🔍</span>
      <h1 style={{ fontSize: 48, fontWeight: 900, color: '#111827', marginBottom: 12 }}>404</h1>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#374151', marginBottom: 16 }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: 32, maxWidth: 400 }}>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: 50,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Go Home
        </Link>
        <Link
          href="/deals"
          style={{
            background: 'white',
            color: '#6366F1',
            padding: '14px 32px',
            borderRadius: 50,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            border: '2px solid #6366F1',
          }}
        >
          Browse Deals
        </Link>
      </div>
    </div>
  );
}
