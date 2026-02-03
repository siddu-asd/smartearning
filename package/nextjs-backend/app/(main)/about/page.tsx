import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { value: '50K+', label: 'Happy Users' },
    { value: '10K+', label: 'Deals Shared' },
    { value: '₹5Cr+', label: 'Money Saved' },
    { value: '100+', label: 'Partner Brands' },
  ];

  const values = [
    { title: 'User First', icon: '🎯', desc: 'Every decision we make prioritizes your savings' },
    { title: 'Transparency', icon: '🔓', desc: 'We only share genuine deals and disclose partnerships' },
    { title: 'Quality', icon: '⭐', desc: 'We verify every deal before sharing' },
    { title: 'Community', icon: '❤️', desc: 'Building a community of smart shoppers' },
  ];

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '60px 24px 120px', textAlign: 'center' }}>
        <nav style={{ marginBottom: '24px' }}>
          <ol style={{ display: 'flex', gap: '8px', justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
            <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
            <li style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>About Us</li>
          </ol>
        </nav>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
          About StudentsCrazyDeals
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          On a mission to help everyone save money and shop smarter
        </p>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '0 24px', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', background: '#dbeafe', color: '#2563eb', padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>📖 OUR STORY</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>How It All Started</h2>
          </div>

          <div style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, marginBottom: '16px' }}>
              StudentsCrazyDeals was born from a simple idea: every student deserves access to the best deals. We started as a small team passionate about helping students save money on their everyday purchases.
            </p>
            <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, marginBottom: '16px' }}>
              Today, we&apos;ve grown into India&apos;s trusted deals platform, helping thousands of users save money every day. Our team works around the clock to find, verify, and share the best deals from across the web.
            </p>
            <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.8, margin: 0 }}>
              We believe that smart shopping isn&apos;t just about finding low prices – it&apos;s about getting real value for your money. That&apos;s why we verify every deal before sharing it with our community.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '40px 24px 60px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', background: '#dbeafe', color: '#2563eb', padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>💎 OUR VALUES</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>What We Stand For</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {values.map((value, i) => (
              <div key={i} style={{ background: 'white', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{value.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{value.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Ready to Start Saving?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '24px' }}>Join thousands of smart shoppers today</p>
          <Link href="/deals" style={{ display: 'inline-block', background: 'white', color: '#2563eb', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
            Explore Deals →
          </Link>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'About Us - StudentsCrazyDeals',
  description: 'Learn about StudentsCrazyDeals - India\'s trusted student deals platform helping students save money every day.',
};
