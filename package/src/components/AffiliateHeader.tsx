import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMAGES } from "../constant/theme";

/**
 * AffiliateHeader - Redesigned Modern Header
 * Clean navigation with beautiful animations
 */
export default function AffiliateHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 80);
      
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Deals", path: "/deals", icon: "🔥" },
    { name: "Blog", path: "/blog", icon: "📰" },
    { name: "About", path: "/about", icon: "ℹ️" },
    { name: "Contact", path: "/contact", icon: "📧" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #FFD700 100%)',
          zIndex: 1001,
          transition: 'width 0.1s linear'
        }}
      />

      <header 
        style={{
          background: headerFixed 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'transparent',
          backdropFilter: headerFixed ? 'blur(20px)' : 'none',
          boxShadow: headerFixed ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: headerFixed ? '8px 0' : '15px 0',
            minHeight: headerFixed ? '60px' : '75px',
            transition: 'all 0.3s ease'
          }}>
            {/* Logo */}
            <Link 
              to="/" 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src={IMAGES.logo} 
                alt="SidduDeals" 
                style={{ 
                  height: headerFixed ? '50px' : '55px', 
                  width: 'auto',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  transition: 'height 0.3s ease'
                }} 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: 'none' }} className="d-md-flex">
              <ul style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                listStyle: 'none',
                margin: 0,
                padding: 0
              }}>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink 
                      to={link.path}
                      style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: isActive 
                          ? '#667eea' 
                          : (headerFixed ? '#333' : (location.pathname === '/' ? '#fff' : '#333')),
                        fontWeight: isActive ? '700' : '500',
                        textDecoration: 'none',
                        fontSize: '15px',
                        padding: '10px 18px',
                        borderRadius: '50px',
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)' 
                          : 'transparent',
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      })}
                      onMouseEnter={(e) => {
                        if (!e.currentTarget.classList.contains('active')) {
                          e.currentTarget.style.background = 'rgba(102,126,234,0.08)';
                          e.currentTarget.style.color = '#667eea';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!e.currentTarget.classList.contains('active')) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = headerFixed ? '#333' : (location.pathname === '/' ? '#fff' : '#333');
                        }
                      }}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button - Desktop */}
            <Link 
              to="/deals"
              className="d-none d-lg-inline-flex"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(102,126,234,0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(102,126,234,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102,126,234,0.3)';
              }}
            >
              <span>🔥</span> Hot Deals
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="d-md-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: mobileMenuOpen 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : 'transparent',
                border: 'none',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{
                width: '24px',
                height: '2px',
                background: mobileMenuOpen ? '#fff' : (headerFixed ? '#333' : (location.pathname === '/' ? '#fff' : '#333')),
                transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                borderRadius: '2px'
              }}></span>
              <span style={{
                width: '24px',
                height: '2px',
                background: mobileMenuOpen ? '#fff' : (headerFixed ? '#333' : (location.pathname === '/' ? '#fff' : '#333')),
                opacity: mobileMenuOpen ? 0 : 1,
                transition: 'all 0.3s',
                borderRadius: '2px'
              }}></span>
              <span style={{
                width: '24px',
                height: '2px',
                background: mobileMenuOpen ? '#fff' : (headerFixed ? '#333' : (location.pathname === '/' ? '#fff' : '#333')),
                transition: 'all 0.3s',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                borderRadius: '2px'
              }}></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className="d-md-none"
            style={{
              maxHeight: mobileMenuOpen ? '400px' : '0',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              background: '#fff',
              borderRadius: mobileMenuOpen ? '0 0 24px 24px' : '0',
              boxShadow: mobileMenuOpen ? '0 20px 40px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: mobileMenuOpen ? '20px' : '0 20px'
            }}>
              {navLinks.map((link, index) => (
                <li 
                  key={index}
                  style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.3s ease ${index * 0.1}s`
                  }}
                >
                  <NavLink 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      color: isActive ? '#667eea' : '#333',
                      fontWeight: isActive ? '700' : '500',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderRadius: '12px',
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)' 
                        : 'transparent',
                      marginBottom: '5px',
                      transition: 'all 0.3s ease'
                    })}
                  >
                    <span style={{ fontSize: '20px' }}>{link.icon}</span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
              
              {/* Mobile CTA */}
              <li style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.3s ease ${navLinks.length * 0.1}s`,
                marginTop: '10px'
              }}>
                <Link 
                  to="/deals"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '16px',
                    textDecoration: 'none',
                    boxShadow: '0 10px 30px rgba(102,126,234,0.3)'
                  }}
                >
                  <span>🔥</span> Explore Hot Deals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div style={{ height: '75px' }} />
    </>
  );
}
