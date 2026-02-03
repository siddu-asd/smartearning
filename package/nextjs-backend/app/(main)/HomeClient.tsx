'use client';

import Link from 'next/link';
import { Product } from '../../lib/db';
import ProductCard from '../components/ProductCard';

interface Props {
  products: Product[];
}

export default function HomeClient({ products }: Props) {
  const categories = [
    { name: 'Mobiles', icon: '📱', href: '/deals?cat=mobiles' },
    { name: 'Laptops', icon: '💻', href: '/deals?cat=laptops' },
    { name: 'Audio', icon: '🎧', href: '/deals?cat=audio' },
    { name: 'Electronics', icon: '📺', href: '/deals?cat=electronics' },
    { name: 'Fashion', icon: '👕', href: '/deals?cat=fashion' },
    { name: 'Home & Living', icon: '🏠', href: '/deals?cat=home' },
  ];

  const stats = [
    { value: '50K+', label: 'Happy Users' },
    { value: '10K+', label: 'Deals Shared' },
    { value: '₹5Cr+', label: 'Money Saved' },
    { value: '100+', label: 'Brands' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '80px 24px 120px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>
                500+ Active Deals
              </span>

              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '20px' }}>
                Save Money on Everything You Love
              </h1>

              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
                India&apos;s most trusted deals platform. Get exclusive discounts on mobiles, laptops, fashion & more.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/deals" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#2563eb', padding: '16px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                  Explore Deals
                </Link>
                <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'white', padding: '16px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.4)' }}>
                  About Us
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '4px' }}>{stat.value}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '60px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', background: '#dbeafe', color: '#2563eb', padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>CATEGORIES</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>Shop by Category</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', background: 'white', padding: '24px 16px', borderRadius: '12px', textDecoration: 'none', border: '1px solid #e5e7eb' }}>
                <span style={{ fontSize: '32px' }}>{cat.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '60px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#dbeafe', color: '#2563eb', padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>HOT DEALS</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>Today&apos;s Best Deals</h2>
            </div>
            <Link href="/deals" style={{ color: '#2563eb', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All Deals →
            </Link>
          </div>

          {products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f9fafb', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>No deals available</h3>
              <p style={{ color: '#6b7280' }}>Check back soon for new deals!</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '60px 24px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', background: '#dbeafe', color: '#2563eb', padding: '8px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>WHY US</span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>Why Choose StudentsCrazyDeals</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🎯', title: 'Handpicked Deals', desc: 'Every deal is manually verified by our team' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Real-time updates on the latest deals' },
              { icon: '🛡️', title: '100% Genuine', desc: 'Only authentic deals from trusted platforms' },
              { icon: '💰', title: 'Maximum Savings', desc: 'Get the best prices guaranteed' },
            ].map((feature, i) => (
              <div key={i} style={{ background: 'white', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
