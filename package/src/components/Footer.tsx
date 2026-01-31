import { Link } from "react-router-dom";
import { IMAGES } from "../constant/theme";
import SubscribeNewsletter from "./SubscribeNewsletter";

interface FooterProps {
  footerStyle?: string;
}

/**
 * Simple Affiliate Footer
 * Clean footer for StudentCrazyDeals
 */
const Footer = ({ footerStyle }: FooterProps) => {
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
    { name: "Laundry & Cleaning", path: "/deals/laundry-cleaning" },
    { name: "Entertainment", path: "/deals/entertainment" },
  ];

  return (
    <footer className={`site-footer ${footerStyle || "style-1"}`}>
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-xl-4 col-md-6 col-sm-12 mb-4">
              <div className="widget widget_about">
                <div className="footer-logo logo-white mb-3">
                  <Link to="/">
                    {footerStyle === "footer-dark" ? (
                      <img src={IMAGES.LogoWhite} alt="StudentCrazyDeals" />
                    ) : (
                      <img src={IMAGES.logo} alt="StudentCrazyDeals" />
                    )}
                  </Link>
                </div>
                <p className="mb-3">
                  Your #1 destination for student deals! Save up to 70% on tech, furniture & more.
                  Never pay full price again - we find the best discounts for you!
                </p>
                <div className="subscribe_widget">
                  <h6 className="title fw-medium text-capitalize">Get Deal Alerts</h6>
                  <SubscribeNewsletter />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-2 col-md-3 col-sm-6 mb-4">
              <div className="widget widget_services">
                <h5 className="footer-title">Quick Links</h5>
                <ul>
                  {quickLinks.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="col-xl-3 col-md-3 col-sm-6 mb-4">
              <div className="widget widget_services">
                <h5 className="footer-title">Deal Categories</h5>
                <ul>
                  {categories.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-xl-3 col-md-6 col-sm-12 mb-4">
              <div className="widget widget_services">
                <h5 className="footer-title">Contact Us</h5>
                <ul className="widget-address">
                  <li>
                    <p><span>Email:</span> deals@studentcrazydeals.com</p>
                  </li>
                </ul>
                <div className="mt-3">
                  <h6 className="mb-2">Follow Us</h6>
                  <div className="dz-social-icon">
                    <ul className="d-flex gap-2 list-unstyled mb-0">
                      <li>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row fb-inner align-items-center">
            <div className="col-lg-6 col-md-12 text-start">
              <p className="copyright-text mb-0">
                © {year} StudentCrazyDeals. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6 col-md-12 text-end">
              <p className="mb-0">Save Big Every Day with StudentCrazyDeals!</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
