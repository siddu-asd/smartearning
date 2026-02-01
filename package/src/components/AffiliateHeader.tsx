import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMAGES } from "../constant/theme";

/**
 * AffiliateHeader - Professional Modern Header
 * Clean, light theme with smooth animations
 */

// Color scheme
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

export default function AffiliateHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
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
    { name: "Home", path: "/" },
    { name: "Deals", path: "/deals" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
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
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <img
                src={IMAGES.logo}
                alt="Logo"
                style={{
                  height: isScrolled ? '36px' : '42px',
                  width: 'auto',
                  maxWidth: '160px',
                  objectFit: 'contain',
                  transition: 'height 0.3s ease',
                }}
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
              className="d-none d-lg-flex"
            >
              <ul
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      style={({ isActive }) => ({
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        fontSize: '15px',
                        fontWeight: isActive ? '600' : '500',
                        color: isActive ? colors.primary : colors.dark,
                        textDecoration: 'none',
                        borderRadius: '8px',
                        position: 'relative',
                        background: isActive ? `${colors.primary}10` : 'transparent',
                      })}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right side - CTA Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexShrink: 0,
              }}
            >
              <Link
                to="/deals"
                className="d-none d-lg-inline-flex"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: colors.gradient,
                  color: colors.white,
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                }}
              >
                Get Started
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="d-lg-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '44px',
                  height: '44px',
                  padding: '10px',
                  background: 'transparent',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  gap: '5px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    background: colors.dark,
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    background: colors.dark,
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '2px',
                    background: colors.dark,
                    borderRadius: '1px',
                    transition: 'all 0.3s ease',
                    transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className="d-lg-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(17, 24, 39, 0.5)',
          zIndex: 998,
          opacity: mobileMenuOpen ? 1 : 0,
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className="d-lg-none"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '320px',
          background: colors.white,
          zIndex: 999,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          boxShadow: mobileMenuOpen ? '-4px 0 24px rgba(0, 0, 0, 0.1)' : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile Menu Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ textDecoration: 'none' }}
          >
            <img
              src={IMAGES.logo}
              alt="Logo"
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: colors.lightBg,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link, index) => (
              <li
                key={link.path}
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.3s ease ${index * 0.05}s`,
                }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '14px 16px',
                    fontSize: '16px',
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? colors.primary : colors.dark,
                    textDecoration: 'none',
                    borderRadius: '10px',
                    background: isActive ? `${colors.primary}10` : 'transparent',
                    marginBottom: '4px',
                    transition: 'all 0.2s ease',
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Footer */}
        <div
          style={{
            padding: '16px',
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <Link
            to="/deals"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '14px 20px',
              background: colors.gradient,
              color: colors.white,
              fontSize: '15px',
              fontWeight: '600',
              textDecoration: 'none',
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Header Spacer */}
      <div style={{ height: '72px' }} />
    </>
  );
}
