import { Link } from "react-router-dom";
import { IMAGES } from "../constant/theme";
import { useState } from "react";

/**
 * Clean Modern Footer Component
 * Professional footer design for SidduDeals
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Deals", path: "/deals" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Laptops", path: "/deals/laptop-deals" },
    { name: "Mobiles", path: "/deals/mobile-deals" },
    { name: "Headphones", path: "/deals/audio-headphones" },
    { name: "Appliances", path: "/deals/home-appliances" },
    { name: "Furniture", path: "/deals/study-furniture" },
    { name: "TVs", path: "/deals/entertainment" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#111827",
        color: "#E5E7EB",
      }}
    >
      {/* Main Footer Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "48px",
          }}
        >
          {/* Column 1: Logo & Description */}
          <div>
            <Link
              to="/"
              style={{
                display: "inline-block",
                marginBottom: "20px",
              }}
            >
              <img
                src={IMAGES.LogoWhite || IMAGES.logo}
                alt="SidduDeals"
                style={{
                  height: "40px",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Link>
            <p
              style={{
                color: "#9CA3AF",
                fontSize: "14px",
                lineHeight: "1.7",
                marginBottom: "24px",
                maxWidth: "280px",
              }}
            >
              Your trusted destination for the best deals. Save big on tech,
              furniture, and everyday essentials.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { name: "Facebook", icon: "f", url: "#" },
                { name: "Twitter", icon: "𝕏", url: "#" },
                { name: "Instagram", icon: "◎", url: "#" },
                { name: "YouTube", icon: "▶", url: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9CA3AF",
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563EB";
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#1F2937";
                    e.currentTarget.style.borderColor = "#374151";
                    e.currentTarget.style.color = "#9CA3AF";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              style={{
                color: "#E5E7EB",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      color: "#9CA3AF",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#9CA3AF";
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
            <h4
              style={{
                color: "#E5E7EB",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Categories
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link
                    to={cat.path}
                    style={{
                      color: "#9CA3AF",
                      textDecoration: "none",
                      fontSize: "14px",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#2563EB";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#9CA3AF";
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
            <h4
              style={{
                color: "#E5E7EB",
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Newsletter
            </h4>
            <p
              style={{
                color: "#9CA3AF",
                fontSize: "14px",
                lineHeight: "1.6",
                marginBottom: "16px",
              }}
            >
              Subscribe to get the latest deals and updates.
            </p>
            <form onSubmit={handleSubscribe}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #374151",
                    backgroundColor: "#1F2937",
                    color: "#E5E7EB",
                    fontSize: "14px",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#374151";
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#2563EB",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1D4ED8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563EB";
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
          borderTop: "1px solid #374151",
          backgroundColor: "#0D1117",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "14px",
              margin: 0,
            }}
          >
            © {year} SidduDeals. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link
              to="/privacy-policy"
              style={{
                color: "#9CA3AF",
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9CA3AF";
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              style={{
                color: "#9CA3AF",
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9CA3AF";
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
