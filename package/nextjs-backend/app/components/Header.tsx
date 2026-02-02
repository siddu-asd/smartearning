'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Deals', href: '/deals' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
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
          background: isScrolled ? 'rgba(255,255,255,0.98)' : 'white',
          boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 #e5e7eb',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Top Banner */}
        {!isScrolled && (
          <div
            style={{
              background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #A855F7)',
              padding: '8px 16px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
              🎉 Welcome to StudentCrazyDeals — Save up to 80% Daily!
            </span>
          </div>
        )}

        {/* Main Nav */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
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
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>
                  Student<span style={{ color: '#6366F1' }}>Crazy</span>Deals
                </div>
                <div style={{ fontSize: 10, color: '#6b7280', letterSpacing: 0.5 }}>SAVE MORE • LIVE BETTER</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    color: '#374151',
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#6366F1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/deals"
                style={{
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: 50,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                }}
              >
                🔥 Hot Deals
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                padding: 8,
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              <div style={{ width: 24, height: 18, position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    width: 24,
                    height: 2,
                    background: '#111827',
                    borderRadius: 1,
                    transition: 'all 0.3s',
                    top: mobileOpen ? 8 : 0,
                    transform: mobileOpen ? 'rotate(45deg)' : 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    width: 24,
                    height: 2,
                    background: '#111827',
                    borderRadius: 1,
                    top: 8,
                    opacity: mobileOpen ? 0 : 1,
                    transition: 'all 0.3s',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    width: 24,
                    height: 2,
                    background: '#111827',
                    borderRadius: 1,
                    transition: 'all 0.3s',
                    top: mobileOpen ? 8 : 16,
                    transform: mobileOpen ? 'rotate(-45deg)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            style={{
              position: 'fixed',
              top: isScrolled ? 64 : 104,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'white',
              padding: 20,
              overflowY: 'auto',
              zIndex: 999,
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: '#111827',
                    fontSize: 18,
                    fontWeight: 600,
                    textDecoration: 'none',
                    padding: '16px 20px',
                    background: '#f9fafb',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {link.name}
                  <span style={{ color: '#9ca3af' }}>→</span>
                </Link>
              ))}
            </nav>
            <Link
              href="/deals"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                marginTop: 24,
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                color: 'white',
                padding: '16px 24px',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 700,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              🔥 Explore All Deals
            </Link>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div style={{ height: isScrolled ? 64 : 104, transition: 'height 0.3s' }} />

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
