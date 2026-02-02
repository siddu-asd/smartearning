import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { value: '50K+', label: 'Happy Students' },
    { value: '10K+', label: 'Deals Shared' },
    { value: '₹5Cr+', label: 'Money Saved' },
    { value: '100+', label: 'Partner Brands' },
  ];

  const team = [
    { name: 'Finding Deals', icon: '🔍', desc: 'We scour the internet for the best deals' },
    { name: 'Verification', icon: '✅', desc: 'Every deal is manually verified' },
    { name: 'Publishing', icon: '📢', desc: 'We share deals instantly with you' },
    { name: 'Support', icon: '💬', desc: '24/7 help for any questions' },
  ];

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          padding: '60px 20px 100px',
          textAlign: 'center',
        }}
      >
        <nav style={{ marginBottom: 20 }}>
          <ol style={{ display: 'flex', gap: 8, justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Home</Link></li>
            <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
            <li style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>About</li>
          </ol>
        </nav>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', marginBottom: 12 }}>
          👋 About Us
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          We&apos;re on a mission to help students save money every single day.
        </p>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 20px', marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            background: 'white',
            borderRadius: 20,
            padding: '40px 32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 24,
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#6366F1' }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#111827', marginBottom: 20 }}>Our Story</h2>
          <p style={{ color: '#4b5563', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            StudentCrazyDeals started with a simple idea: college students shouldn&apos;t have to pay full price for anything. 
            As students ourselves, we knew the struggle of balancing academics with a tight budget.
          </p>
          <p style={{ color: '#4b5563', fontSize: 16, lineHeight: 1.8 }}>
            Today, we&apos;re India&apos;s largest student deals platform, helping over 50,000 students save money on everything 
            from laptops and phones to fashion and food. Our team works 24/7 to find, verify, and share the best deals 
            so you can focus on what matters most — your education.
          </p>
        </div>
      </section>

      {/* How We Work */}
      <section style={{ padding: '0 20px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
            How We Work
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 24,
            }}
          >
            {team.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 28,
                  textAlign: 'center',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}
              >
                <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>{item.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{item.name}</h3>
                <p style={{ fontSize: 14, color: '#6b7280' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
            Ready to Start Saving?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 32 }}>
            Join thousands of students saving money every day
          </p>
          <Link
            href="/deals"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#6366F1',
              padding: '16px 40px',
              borderRadius: 50,
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Browse Deals →
          </Link>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'About Us - StudentCrazyDeals',
  description: 'Learn about StudentCrazyDeals — India\'s #1 student deals platform.',
};
