'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Deals', href: '/deals' },
    { name: 'Blog', href: '/blog' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const categories = [
    { name: 'Mobile Deals', href: '/deals?cat=mobiles' },
    { name: 'Laptop Deals', href: '/deals?cat=laptops' },
    { name: 'Audio Deals', href: '/deals?cat=audio' },
    { name: 'Electronics', href: '/deals?cat=electronics' },
    { name: 'Fashion', href: '/deals?cat=fashion' },
  ];

  return (
    <footer style={{ background: '#111827', color: 'white', marginTop: 'auto' }}>
      {/* Newsletter */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          padding: '48px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>💌</span>
          <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Never Miss a Deal!</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 24 }}>
            Subscribe for exclusive deals & discount codes delivered to your inbox.
          </p>
          {subscribed ? (
            <div
              style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '16px 24px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 24 }}>✅</span>
              <span style={{ fontWeight: 600 }}>You&apos;re subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: '1 1 280px',
                  maxWidth: 360,
                  padding: '14px 20px',
                  borderRadius: 50,
                  border: 'none',
                  fontSize: 15,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  borderRadius: 50,
                  border: 'none',
                  background: '#111827',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Subscribe →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ padding: '64px 20px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                🔥
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>StudentCrazyDeals</span>
            </Link>
            <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              India&apos;s most trusted platform for student deals. Save money on everything you need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 16 }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: 10 }}>
                  <Link href={link.href} style={{ color: '#d1d5db', fontSize: 15, textDecoration: 'none' }}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 16 }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map((cat) => (
                <li key={cat.name} style={{ marginBottom: 10 }}>
                  <Link href={cat.href} style={{ color: '#d1d5db', fontSize: 15, textDecoration: 'none' }}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: 16 }}>
              Contact Us
            </h4>
            <div style={{ color: '#d1d5db', fontSize: 14, lineHeight: 2 }}>
              <div>📧 support@studentcrazydeals.com</div>
              <div>📍 Hyderabad, India</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <a href="#" style={{ fontSize: 20, textDecoration: 'none' }}>📷</a>
                <a href="#" style={{ fontSize: 20, textDecoration: 'none' }}>✈️</a>
                <a href="#" style={{ fontSize: 20, textDecoration: 'none' }}>💬</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid #374151',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <p style={{ color: '#6b7280', fontSize: 14 }}>
            © {new Date().getFullYear()} StudentCrazyDeals. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy" style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
