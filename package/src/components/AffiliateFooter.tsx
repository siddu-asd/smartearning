import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { IMAGES } from "../constant/theme";
import SubscribeNewsletter from "./SubscribeNewsletter";
import { CATEGORIES } from "../constant/categories";

interface FooterProps {
  footerStyle?: string;
}

/**
 * Affiliate Footer Component
 * Clean footer for affiliate website - no e-commerce, payments, or physical store info
 */
const AffiliateFooter = (props: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`site-footer ${props.footerStyle || "style-1"}`}>
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <motion.div 
              className="col-xl-4 col-md-6 col-sm-12"
              animate={{ y: '50%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="widget widget_about me-2">
                <div className="footer-logo logo-white">
                  <Link to="/">
                    {props.footerStyle === "footer-dark" ? (
                      <img src={IMAGES.LogoWhite} alt="Studentcrazydeals" />
                    ) : (
                      <img src={IMAGES.logo} alt="Studentcrazydeals" />
                    )}
                  </Link>
                </div>
                <p className="mb-3">
                  Your go-to destination for student deals! We find the best prices on 
                  laptops, dorm essentials, study supplies, and everything students need.
                </p>
                <ul className="widget-address">
                  <li>
                    <p><span>E-mail</span>: help@studentcrazydeals.com</p>
                  </li>
                </ul>
                <div className="subscribe_widget">
                  <h6 className="title fw-medium text-capitalize">Subscribe to our newsletter</h6>
                  <SubscribeNewsletter />
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div 
              className="col-xl-3 col-md-6 col-sm-6"
              animate={{ y: '50%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.0 }}
            >
              <div className="widget widget_services">
                <h5 className="footer-title">Categories</h5>
                <ul>
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <li key={cat.id}>
                      <Link to={`/deals/${cat.slug}`}>{cat.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="col-xl-2 col-md-6 col-sm-6"
              animate={{ y: '50%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <div className="widget widget_services">
                <h5 className="footer-title">Quick Links</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/deals">All Deals</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/affiliate-disclosure">Affiliate Disclosure</Link></li>
                </ul>
              </div>
            </motion.div>

            {/* Follow Us */}
            <motion.div 
              className="col-xl-3 col-md-6 col-sm-12"
              animate={{ y: '50%' }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1.4 }}
            >
              <div className="widget widget_services">
                <h5 className="footer-title">Follow Us</h5>
                <p className="mb-3">Join our student community for exclusive deals and tips!</p>
                <div className="dz-social-icon">
                  <ul className="social-icon">
                    <li>
                      <a 
                        href="https://facebook.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="fab fa-facebook-f"
                      ></a>
                    </li>
                    <li>
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="fab fa-twitter"
                      ></a>
                    </li>
                    <li>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="fab fa-instagram"
                      ></a>
                    </li>
                    <li>
                      <a 
                        href="https://youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="fab fa-youtube"
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Footer Top End */}

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row fb-inner">
            <div className="col-lg-6 col-md-12 text-start">
              <p className="copyright-text">
                © <span className="current-year">{year}</span> Studentcrazydeals. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6 col-md-12 text-end">
              <p className="mb-0">
                <small>
                  <Link to="/affiliate-disclosure" className="text-decoration-underline">
                    Affiliate Disclosure
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom End */}
    </footer>
  );
};

export default AffiliateFooter;
