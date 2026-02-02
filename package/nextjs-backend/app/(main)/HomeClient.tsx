'use client';

import Link from 'next/link';
import { Product } from '../../lib/db';
import ProductCard from '../components/ProductCard';

interface Props {
  products: Product[];
}

export default function HomeClient({ products }: Props) {
  const categories = [
    { name: 'Mobiles', icon: '📱', color: '#6366F1', count: '200+', href: '/deals?cat=mobiles' },
    { name: 'Laptops', icon: '💻', color: '#8B5CF6', count: '150+', href: '/deals?cat=laptops' },
    { name: 'Audio', icon: '🎧', color: '#A855F7', count: '100+', href: '/deals?cat=audio' },
    { name: 'Electronics', icon: '📺', color: '#EC4899', count: '180+', href: '/deals?cat=electronics' },
    { name: 'Fashion', icon: '👕', color: '#F43F5E', count: '300+', href: '/deals?cat=fashion' },
    { name: 'Home', icon: '🏠', color: '#10B981', count: '120+', href: '/deals?cat=home' },
  ];

  const stats = [
    { value: '50K+', label: 'Happy Students', icon: '🎓' },
    { value: '10K+', label: 'Deals Shared', icon: '🏷️' },
    { value: '₹5Cr+', label: 'Money Saved', icon: '💰' },
    { value: '100+', label: 'Top Brands', icon: '⭐' },
  ];

  return (
    <div style={{ background: '#fafafa' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)',
          padding: '80px 20px 120px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', fontSize: 60, opacity: 0.1 }}>🛍️</div>
        <div style={{ position: 'absolute', top: '30%', right: '10%', fontSize: 50, opacity: 0.1 }}>💰</div>
        <div style={{ position: 'absolute', bottom: '20%', left: '15%', fontSize: 55, opacity: 0.1 }}>🎉</div>

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 20px',
              borderRadius: 50,
              marginBottom: 24,
            }}
          >
            <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }} />
            <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>🔥 500+ Active Deals Right Now</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: 'white', marginBottom: 20, lineHeight: 1.1 }}>
            Save Big on Everything<br />You Love to Buy
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
            India&apos;s #1 student deals platform. Get exclusive discounts on mobiles, laptops, fashion & more.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/deals"
              style={{
                background: 'white',
                color: '#6366F1',
                padding: '14px 32px',
                borderRadius: 50,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              🔥 Explore Deals
            </Link>
            <Link
              href="/blog"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '14px 32px',
                borderRadius: 50,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              📖 Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '0 20px', marginTop: -60, position: 'relative', zIndex: 10 }}>
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
              <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>{stat.icon}</span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>{stat.value}</div>
              <div style={{ fontSize: 14, color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                display: 'inline-block',
                background: '#eef2ff',
                color: '#6366F1',
                padding: '6px 16px',
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              🏷️ CATEGORIES
            </span>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#111827' }}>Shop by Category</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 16,
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '28px 16px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  border: '1px solid #f3f4f6',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: `${cat.color}15`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    margin: '0 auto 12px',
                  }}
                >
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{cat.name}</h3>
                <span style={{ fontSize: 13, color: cat.color, fontWeight: 600 }}>{cat.count} Deals</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section style={{ padding: '0 20px 80px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#fef3c7',
                    color: '#d97706',
                    padding: '6px 16px',
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  🔥 HOT DEALS
                </span>
                <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#111827' }}>Featured Deals</h2>
              </div>
              <Link
                href="/deals"
                style={{
                  color: '#6366F1',
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                View All →
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 24,
              }}
            >
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 48 }}>
            Why Choose Us?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 24,
            }}
          >
            {[
              { icon: '✅', title: 'Verified Deals', desc: 'Every deal is manually verified' },
              { icon: '⚡', title: 'Real-time Updates', desc: 'Get notified when prices drop' },
              { icon: '🔒', title: '100% Secure', desc: 'Shop through trusted platforms' },
              { icon: '💯', title: 'Best Prices', desc: 'Guaranteed lowest prices' },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  background: '#fafafa',
                  borderRadius: 16,
                  padding: 28,
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>{f.icon}</span>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            Join 50,000+ students saving money every day
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
            Browse All Deals →
          </Link>
        </div>
      </section>
    </div>
  );
}
