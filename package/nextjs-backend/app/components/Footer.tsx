'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Deals', href: '/deals' },
    { name: 'Latest Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const categories = [
    { name: 'Mobiles', href: '/deals?cat=mobiles' },
    { name: 'Laptops', href: '/deals?cat=laptops' },
    { name: 'Electronics', href: '/deals?cat=electronics' },
    { name: 'Fashion', href: '/deals?cat=fashion' },
    { name: 'Home & Living', href: '/deals?cat=home' },
  ];

  return (
    <footer style={{ background: '#111827', color: 'white' }}>
      {/* Newsletter Section */}
      <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '50px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>📬 Newsletter</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>Never Miss a Deal Again!</h2>
          <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '32px' }}>Subscribe to get daily deals and exclusive offers delivered to your inbox.</p>

          {subscribed ? (
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px 32px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>✅</span>
              <span style={{ fontWeight: 600 }}>Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required style={{ flex: '1 1 280px', padding: '16px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', background: 'white', color: '#111827', outline: 'none' }} />
              <button type="submit" style={{ padding: '16px 32px', borderRadius: '8px', background: '#111827', color: 'white', fontSize: '16px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Subscribe →</button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '20px', textDecoration: 'none' }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'white' }}>Students<span style={{ color: '#60a5fa' }}>CrazyDeals</span></div>
            </Link>
            <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '14px' }}>India&apos;s trusted destination for the best deals, discounts, and savings.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px', color: 'white' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px', color: 'white' }}>Categories</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px', color: 'white' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="mailto:hello@studentscrazydeals.in" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📧</span> hello@studentscrazydeals.in
              </a>
              <div style={{ color: '#9ca3af', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📍</span> Bangalore, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>© {new Date().getFullYear()} StudentsCrazyDeals. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
