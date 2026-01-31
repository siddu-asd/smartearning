import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMAGES } from "../constant/theme";

/**
 * Simple Affiliate Header
 * Clean navigation for StudentCrazyDeals
 */
export default function AffiliateHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Deals", path: "/deals" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      style={{
        background: '#fff',
        boxShadow: headerFixed ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        position: headerFixed ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
          minHeight: '70px'
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={IMAGES.logo} 
              alt="StudentCrazyDeals" 
              style={{ 
                height: '60px', 
                width: 'auto',
                maxWidth: '220px',
                objectFit: 'contain'
              }} 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="d-md-flex">
            <ul style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path}
                    style={({ isActive }) => ({
                      color: isActive ? '#667eea' : '#333',
                      fontWeight: isActive ? '600' : '500',
                      textDecoration: 'none',
                      fontSize: '15px',
                      transition: 'color 0.2s'
                    })}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="d-md-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: '#333',
              transition: 'all 0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none'
            }}></span>
            <span style={{
              width: '24px',
              height: '2px',
              background: '#333',
              opacity: mobileMenuOpen ? 0 : 1,
              transition: 'all 0.3s'
            }}></span>
            <span style={{
              width: '24px',
              height: '2px',
              background: '#333',
              transition: 'all 0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'
            }}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="d-md-none"
            style={{
              borderTop: '1px solid #eee',
              paddingBottom: '20px'
            }}
          >
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: '15px 0'
            }}>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '12px 0',
                      color: isActive ? '#667eea' : '#333',
                      fontWeight: isActive ? '600' : '500',
                      textDecoration: 'none',
                      fontSize: '16px',
                      borderBottom: '1px solid #f5f5f5'
                    })}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
