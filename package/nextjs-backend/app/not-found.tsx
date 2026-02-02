'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

export default function GlobalNotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const popularLinks = [
    { title: 'Browse Deals', href: '/deals', icon: '🏷️' },
    { title: 'Read Our Blog', href: '/blog', icon: '📖' },
    { title: 'About Us', href: '/about', icon: 'ℹ️' },
    { title: 'Contact Support', href: '/contact', icon: '📧' },
  ];

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            background: COLORS.lightBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              textAlign: 'center',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}
          >
            {/* Animated 404 */}
            <div
              style={{
                fontSize: 'clamp(100px, 20vw, 180px)',
                fontWeight: '900',
                background: COLORS.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                marginBottom: '20px',
              }}
            >
              404
            </div>

            {/* Emoji */}
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>

            <h1
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: '800',
                color: COLORS.dark,
                marginBottom: '16px',
              }}
            >
              Oops! Page Not Found
            </h1>

            <p
              style={{
                fontSize: '18px',
                color: COLORS.gray,
                marginBottom: '40px',
                lineHeight: 1.6,
              }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              But don&apos;t worry, there are plenty of amazing deals waiting for you!
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link
                href="/"
                style={{
                  padding: '16px 32px',
                  background: COLORS.gradient,
                  color: COLORS.white,
                  fontSize: '16px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.3s ease',
                }}
              >
                🏠 Go Home
              </Link>
              <Link
                href="/deals"
                style={{
                  padding: '16px 32px',
                  background: COLORS.white,
                  color: COLORS.primary,
                  fontSize: '16px',
                  fontWeight: '700',
                  borderRadius: '12px',
                  border: `2px solid ${COLORS.primary}`,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                🔥 Browse Deals
              </Link>
            </div>

            {/* Popular Links */}
            <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: '32px' }}>
              <p style={{ fontSize: '14px', color: COLORS.gray, marginBottom: '20px' }}>Or check out these popular pages:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {popularLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    style={{
                      padding: '16px',
                      background: COLORS.white,
                      borderRadius: '12px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{link.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: COLORS.dark }}>{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
