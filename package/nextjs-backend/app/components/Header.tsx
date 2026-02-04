'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '10px 20px', textAlign: 'center' }}>
        <p style={{ color: 'white', fontSize: '14px', fontWeight: 600, margin: 0 }}>
          Welcome to StudentsCrazyDeals — Your Trusted Destination for the Best Deals!
        </p>
      </div>

      {/* Main Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: isScrolled ? 'rgba(255,255,255,0.98)' : 'white',
          boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>Students<span style={{ color: '#2563eb' }}>CrazyDeals</span></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {links.map((link) => (
              <Link key={link.name} href={link.href} style={{ color: '#374151', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>{link.name}</Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/deals" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              Today&apos;s Hot Deals
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-menu-btn" style={{ display: 'none', width: '44px', height: '44px', borderRadius: '8px', background: mobileOpen ? '#f3f4f6' : 'transparent', border: 'none', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }} aria-label="Toggle menu">
            <div style={{ width: '22px', height: '16px', position: 'relative' }}>
              <span style={{ position: 'absolute', width: '22px', height: '2px', background: '#111827', borderRadius: '2px', transition: 'all 0.3s', top: mobileOpen ? '7px' : '0', transform: mobileOpen ? 'rotate(45deg)' : 'none' }} />
              <span style={{ position: 'absolute', width: '22px', height: '2px', background: '#111827', borderRadius: '2px', top: '7px', opacity: mobileOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <span style={{ position: 'absolute', width: '22px', height: '2px', background: '#111827', borderRadius: '2px', transition: 'all 0.3s', top: mobileOpen ? '7px' : '14px', transform: mobileOpen ? 'rotate(-45deg)' : 'none' }} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }} onClick={() => setMobileOpen(false)} />}

      {/* Mobile Menu Panel */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: '300px', maxWidth: '85%', height: '100%', maxHeight: '100dvh', background: 'white', zIndex: 1001, transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: '18px', color: '#111827' }}>Menu</span>
          <button onClick={() => setMobileOpen(false)} style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>✕</button>
        </div>
        <nav style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)} style={{ padding: '16px 20px', borderRadius: '8px', fontSize: '16px', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>{link.name}</Link>
          ))}
        </nav>
        <div style={{ padding: '20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))', borderTop: '1px solid #e5e7eb', flexShrink: 0, background: 'white' }}>
          <Link href="/deals" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', borderRadius: '8px', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Explore Hot Deals</Link>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
