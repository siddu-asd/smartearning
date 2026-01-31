import { useParams, Link } from 'react-router-dom';
import { useProductBySlug } from '../../hooks/useSupabase';
import { CATEGORIES } from '../../constant/categories';
import { IMAGES } from '../../constant/theme';
import { useEffect } from 'react';

// Format price with commas
const formatPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};

// Calculate discount percentage
const calculateDiscount = (mrp: number, discounted: number) => {
  return Math.round(((mrp - discounted) / mrp) * 100);
};

/**
 * Product Detail Page
 * Shows product info with direct link to affiliate
 * Route: /product/:slug
 */
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Fetch product from Supabase
  const { product, loading, error } = useProductBySlug(slug);

  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.title} - StudentCrazyDeals`;
    }
  }, [product]);

  // Loading state
  if (loading) {
    return (
      <div className="page-content bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading deal...</p>
        </div>
      </div>
    );
  }

  // Error or not found
  if (error || !product) {
    return (
      <div className="page-content bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <i className="fas fa-exclamation-circle fa-4x text-warning mb-4"></i>
          <h3 className="mb-3">Deal Not Found</h3>
          <p className="text-muted mb-4">This deal may have expired or been removed.</p>
          <Link to="/deals" className="btn btn-primary">
            Browse All Deals
          </Link>
        </div>
      </div>
    );
  }

  const category = CATEGORIES.find(c => c.id === product.category);
  const hasDiscount = product.mrp && product.discounted_price && product.mrp > product.discounted_price;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discounted_price!) : 0;

  return (
    <div className="page-content" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Back Link */}
            <Link to="/deals" className="text-white text-decoration-none mb-4 d-inline-block">
              <i className="fas fa-arrow-left me-2"></i>
              Back to Deals
            </Link>

            {/* Main Card */}
            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-5 position-relative">
                  <div 
                    className="h-100 d-flex align-items-center justify-content-center p-4"
                    style={{ background: 'linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%)', minHeight: '400px' }}
                  >
                    {hasDiscount && (
                      <div 
                        className="position-absolute top-0 start-0 m-3 badge"
                        style={{ 
                          backgroundColor: '#fef3c7', 
                          color: '#d97706', 
                          fontSize: '1rem',
                          fontWeight: '600',
                          padding: '8px 16px',
                          borderRadius: '8px'
                        }}
                      >
                        {discountPercent}% OFF
                      </div>
                    )}
                    <img 
                      src={product.image_url || IMAGES.headphoneThumbnail} 
                      alt={product.title}
                      className="img-fluid"
                      style={{ maxHeight: '350px', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="col-md-7">
                  <div className="p-4 p-lg-5">
                    {/* Category */}
                    <span 
                      className="badge text-white mb-3"
                      style={{ backgroundColor: '#6366f1', fontSize: '0.85rem' }}
                    >
                      {category?.name || 'Student Deals'}
                    </span>

                    {/* Title */}
                    <h1 className="fw-bold mb-3" style={{ color: '#1e293b', fontSize: '1.75rem', lineHeight: '1.3' }}>
                      {product.title}
                    </h1>

                    {/* Pricing */}
                    <div className="mb-4">
                      {hasDiscount ? (
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          <span 
                            className="text-decoration-line-through" 
                            style={{ color: '#94a3b8', fontSize: '1.25rem' }}
                          >
                            ₹{formatPrice(product.mrp!)}
                          </span>
                          <span 
                            className="fw-bold" 
                            style={{ color: '#10b981', fontSize: '2rem' }}
                          >
                            ₹{formatPrice(product.discounted_price!)}
                          </span>
                        </div>
                      ) : product.discounted_price ? (
                        <span className="fw-bold" style={{ color: '#10b981', fontSize: '2rem' }}>
                          ₹{formatPrice(product.discounted_price)}
                        </span>
                      ) : (
                        <span style={{ color: '#64748b', fontSize: '1.1rem' }}>
                          Click below to see current price
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mb-4" style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6' }}>
                      Don't miss this amazing deal! Click the button below to grab this offer before it expires.
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-light text-dark" style={{ padding: '8px 12px' }}>
                          <i className="fas fa-check-circle text-success me-1"></i>
                          Verified Deal
                        </span>
                        <span className="badge bg-light text-dark" style={{ padding: '8px 12px' }}>
                          <i className="fas fa-bolt text-warning me-1"></i>
                          Limited Time
                        </span>
                        <span className="badge bg-light text-dark" style={{ padding: '8px 12px' }}>
                          <i className="fas fa-tag text-primary me-1"></i>
                          Best Price
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a 
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lg w-100 mb-3"
                      style={{ 
                        background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        fontWeight: '600',
                        padding: '16px 24px',
                        fontSize: '1.1rem',
                        border: 'none',
                        boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)'
                      }}
                    >
                      Get This Deal Now
                      <i className="fas fa-external-link-alt ms-2"></i>
                    </a>

                    {/* Disclaimer */}
                    <p className="text-muted small text-center mb-0">
                      <i className="fas fa-info-circle me-1"></i>
                      Price and availability subject to change. We may earn a commission on purchases.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* More Deals Link */}
            <div className="text-center mt-4">
              <Link to="/deals" className="btn btn-outline-light">
                Browse More Deals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
