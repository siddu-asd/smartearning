'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Header Component - Next.js Version
 * Uses next/link instead of react-router-dom
 */

const colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  border: '#E5E7EB',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Deals', path: '/deals' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: isScrolled ? colors.white : 'transparent',
          boxShadow: isScrolled ? '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)' : 'none',
          borderBottom: isScrolled ? `1px solid ${colors.border}` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '64px' : '72px',
              transition: 'height 0.3s ease',
            }}
          >
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  background: colors.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                StudentCrazyDeals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="d-none d-lg-flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  style={{
                    padding: '8px 16px',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: colors.dark,
                    textDecoration: 'none',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: '12px' }}>
              <Link
                href="/deals"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: colors.gradient,
                  color: colors.white,
                  fontSize: '14px',
                  fontWeight: '600',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                🔥 Hot Deals
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="d-lg-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                background: 'transparent',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.dark}
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '280px',
          height: '100vh',
          background: colors.white,
          zIndex: 1001,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: '700', fontSize: '18px', color: colors.dark }}>Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.dark} strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav style={{ padding: '16px', flex: 1 }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: '16px',
                fontWeight: '500',
                color: colors.dark,
                textDecoration: 'none',
                borderRadius: '10px',
                marginBottom: '4px',
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}` }}>
          <Link
            href="/deals"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 20px',
              background: colors.gradient,
              color: colors.white,
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '12px',
              textDecoration: 'none',
            }}
          >
            🔥 View All Deals
          </Link>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div style={{ height: '72px' }} />
    </>
  );
}
