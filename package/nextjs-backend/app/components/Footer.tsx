'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Footer Component - Next.js Version
 * Uses next/link instead of react-router-dom
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Deals', path: '/deals' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const categories = [
    { name: 'Laptops', path: '/deals/laptop-deals' },
    { name: 'Mobiles', path: '/deals/mobile-deals' },
    { name: 'Headphones', path: '/deals/audio-headphones' },
    { name: 'Appliances', path: '/deals/home-appliances' },
    { name: 'Furniture', path: '/deals/study-furniture' },
    { name: 'TVs', path: '/deals/entertainment' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#111827',
        color: '#E5E7EB',
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px 48px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
          }}
        >
          {/* Column 1: Logo & Description */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                StudentCrazyDeals
              </span>
            </Link>
            <p
              style={{
                color: '#9CA3AF',
                fontSize: '14px',
                lineHeight: '1.7',
                marginBottom: '24px',
                maxWidth: '280px',
              }}
            >
              Your trusted destination for the best deals. Save big on tech,
              furniture, and everyday essentials.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { name: 'Facebook', icon: 'f', url: '#' },
                { name: 'Twitter', icon: '𝕏', url: '#' },
                { name: 'Instagram', icon: '◎', url: '#' },
                { name: 'YouTube', icon: '▶', url: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#E5E7EB',
                    fontSize: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '12px' }}>
                  <Link
                    href={link.path}
                    style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              Categories
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map((cat) => (
                <li key={cat.name} style={{ marginBottom: '12px' }}>
                  <Link
                    href={cat.path}
                    style={{
                      color: '#9CA3AF',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              Stay Updated
            </h3>
            <p
              style={{
                color: '#9CA3AF',
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '16px',
              }}
            >
              Subscribe to get the latest deals directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <p
            style={{
              color: '#6B7280',
              fontSize: '13px',
              margin: 0,
            }}
          >
            © {year} StudentCrazyDeals. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link
              href="/privacy"
              style={{
                color: '#6B7280',
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                color: '#6B7280',
                fontSize: '13px',
                textDecoration: 'none',
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
