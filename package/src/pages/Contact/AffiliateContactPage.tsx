import { Link } from "react-router-dom";
import CommanBanner from "../../components/CommanBanner";
import { IMAGES } from "../../constant/theme";

/**
 * Affiliate Contact Page
 * Simple contact page for affiliate website - no physical address or store info
 */
const AffiliateContactPage = () => {
  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Home" 
        currentText="Contact Us" 
        mainText="Get In Touch" 
        image={IMAGES.BackBg1} 
      />

      <section className="content-inner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <h2 className="title">We'd Love to Hear From You</h2>
                <p className="text-muted">
                  Have questions about a product, need help finding a deal, or want to suggest 
                  a product for us to review? Drop us a message and we'll get back to you!
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8 mb-4">
              <div className="bg-white rounded shadow-sm p-4 p-lg-5">
                <h4 className="mb-4">Send Us a Message</h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Your Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Subject *</label>
                    <select className="form-select" required>
                      <option value="">Select a topic</option>
                      <option value="product-question">Product Question</option>
                      <option value="deal-suggestion">Deal Suggestion</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="feedback">Website Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Your Message *</label>
                    <textarea 
                      className="form-control" 
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-secondary btn-lg">
                    <i className="fas fa-paper-plane me-2"></i>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="col-lg-4">
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h5 className="mb-3">
                  <i className="fas fa-envelope text-secondary me-2"></i>
                  Email Us
                </h5>
                <p className="mb-0">
                  <a href="mailto:help@studentcrazydeals.com" className="text-dark">
                    help@studentcrazydeals.com
                  </a>
                </p>
              </div>

              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h5 className="mb-3">
                  <i className="fas fa-clock text-secondary me-2"></i>
                  Response Time
                </h5>
                <p className="mb-0">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>

              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h5 className="mb-3">
                  <i className="fas fa-share-alt text-secondary me-2"></i>
                  Follow Us
                </h5>
                <p className="mb-3">Stay connected for the latest deals!</p>
                <div className="d-flex gap-2">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>

              <div className="bg-secondary text-white rounded shadow-sm p-4">
                <h5 className="mb-3">
                  <i className="fas fa-info-circle me-2"></i>
                  Important Note
                </h5>
                <p className="mb-0 small">
                  Studentcrazydeals is an affiliate website. We don't sell products directly. 
                  All purchases are made through our partner retailers.
                  <Link to="/affiliate-disclosure" className="text-white text-decoration-underline ms-1">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffiliateContactPage;
