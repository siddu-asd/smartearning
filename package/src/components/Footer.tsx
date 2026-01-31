import { Link } from "react-router-dom";
import { IMAGES } from "../constant/theme";

/**
 * Modern Footer Component
 * Sleek, animated footer for SidduDeals
 */
const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Hot Deals", path: "/deals" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Laptop Deals", path: "/deals/laptop-deals" },
    { name: "Mobile Deals", path: "/deals/mobile-deals" },
    { name: "Audio & Headphones", path: "/deals/audio-headphones" },
    { name: "Home Appliances", path: "/deals/home-appliances" },
    { name: "Study Furniture", path: "/deals/study-furniture" },
    { name: "Entertainment", path: "/deals/entertainment" },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-50px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(118,75,162,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />

      {/* Newsletter Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0.2) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '50px 0',
        position: 'relative'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h3 style={{ 
                color: '#fff', 
                fontWeight: '800', 
                marginBottom: '10px',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)'
              }}>
                Get <span style={{ 
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Deal Alerts</span> 🔔
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Never miss a hot deal! Subscribe to get instant notifications.
              </p>
            </div>
            <div className="col-lg-6">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thanks for subscribing!'); }} className="d-flex gap-3 flex-wrap">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    flex: '1 1 250px',
                    padding: '16px 24px',
                    borderRadius: '50px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                    color: '#000',
                    padding: '16px 35px',
                    borderRadius: '50px',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(255,215,0,0.3)',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,215,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,215,0,0.3)';
                  }}
                >
                  Subscribe 🚀
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ padding: '60px 0 40px', position: 'relative' }}>
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-xl-4 col-md-6 col-sm-12 mb-5">
              <div>
                <Link to="/" style={{ display: 'inline-block', marginBottom: '25px' }}>
                  <img 
                    src={IMAGES.LogoWhite || IMAGES.logo} 
                    alt="SidduDeals" 
                    style={{ 
                      height: '55px',
                      filter: 'brightness(0) invert(1)',
                      maxWidth: '200px'
                    }}
                  />
                </Link>
                <p style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  marginBottom: '25px',
                  lineHeight: '1.8',
                  fontSize: '15px'
                }}>
                  Your #1 destination for student deals! Save up to 70% on tech, furniture & more.
                  <span style={{ color: '#FFD700' }}> Never pay full price again</span> - we find the best discounts for you!
                </p>
                
                {/* Trust Badges */}
                <div className="d-flex gap-3 flex-wrap">
                  {[
                    { icon: '✓', text: 'Verified Deals' },
                    { icon: '🔒', text: 'Safe & Secure' }
                  ].map((badge, i) => (
                    <div 
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <span>{badge.icon}</span>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-2 col-md-3 col-sm-6 mb-4">
              <h5 style={{ 
                color: '#fff', 
                fontWeight: '700', 
                marginBottom: '25px',
                fontSize: '16px',
                position: 'relative',
                display: 'inline-block'
              }}>
                Quick Links
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                  borderRadius: '2px'
                }} />
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {quickLinks.map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <Link 
                      to={item.path}
                      style={{ 
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFD700';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="col-xl-3 col-md-3 col-sm-6 mb-4">
              <h5 style={{ 
                color: '#fff', 
                fontWeight: '700', 
                marginBottom: '25px',
                fontSize: '16px',
                position: 'relative',
                display: 'inline-block'
              }}>
                Deal Categories
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  borderRadius: '2px'
                }} />
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {categories.map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <Link 
                      to={item.path}
                      style={{ 
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#FFD700';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-xl-3 col-md-6 col-sm-12 mb-4">
              <h5 style={{ 
                color: '#fff', 
                fontWeight: '700', 
                marginBottom: '25px',
                fontSize: '16px',
                position: 'relative',
                display: 'inline-block'
              }}>
                Contact Us
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '40px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #11998e, #38ef7d)',
                  borderRadius: '2px'
                }} />
              </h5>
              
              <a 
                href="mailto:help@siddudeals.online"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '20px',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none',
                  marginBottom: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(102,126,234,0.5)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  📧
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: '0 0 4px' }}>Email Us</p>
                  <p style={{ color: '#FFD700', fontWeight: '600', margin: 0, fontSize: '14px' }}>help@siddudeals.online</p>
                </div>
              </a>

              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '15px' }}>
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '25px 0',
        position: 'relative'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p style={{ 
                color: 'rgba(255,255,255,0.6)', 
                margin: 0,
                fontSize: '14px'
              }}>
                © {year} <span style={{ color: '#FFD700' }}>SidduDeals</span>. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p style={{ 
                color: 'rgba(255,255,255,0.6)', 
                margin: 0,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }} className="justify-content-md-end">
                Made with <span style={{ color: '#ff6b6b' }}>❤️</span> for Students
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
