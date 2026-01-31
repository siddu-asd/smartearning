import { useState } from 'react';
import { AffiliateProduct } from '../constant/affiliateData';

interface AffiliateProductCardProps {
  product: AffiliateProduct;
  variant?: 'grid' | 'list';
}

// Helper to truncate long product names
const truncateName = (name: string, maxLength: number = 40) => {
  const shortName = name.includes('|') ? name.split('|')[0].trim() : name;
  if (shortName.length > maxLength) {
    return shortName.substring(0, maxLength) + '...';
  }
  return shortName;
};

// Format price with commas
const formatPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};

// Calculate discount percentage
const calculateDiscount = (mrp: number, discounted: number) => {
  return Math.round(((mrp - discounted) / mrp) * 100);
};

/**
 * Quick View Modal Component
 */
function QuickViewModal({ 
  product, 
  isOpen, 
  onClose 
}: { 
  product: AffiliateProduct; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;

  return (
    <div 
      className="modal show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
          <div className="modal-header border-0 pb-0">
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <div className="row g-4">
              {/* Product Image */}
              <div className="col-md-5">
                <div 
                  className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    background: 'linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%)',
                    minHeight: '280px'
                  }}
                >
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="img-fluid"
                    style={{ maxHeight: '250px', objectFit: 'contain' }}
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="col-md-7">
                <span className="badge text-white mb-2" style={{ backgroundColor: '#6366f1', fontSize: '0.75rem' }}>
                  {product.category?.name || 'Student Deals'}
                </span>
                
                <h4 className="fw-bold mb-3" style={{ color: '#1e293b', lineHeight: '1.3' }}>
                  {product.name}
                </h4>
                
                {/* Pricing - Always Visible */}
                <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#f0fdf4' }}>
                  {product.mrp && product.discountedPrice ? (
                    <div className="d-flex align-items-baseline gap-3 flex-wrap">
                      <span 
                        className="text-decoration-line-through" 
                        style={{ color: '#94a3b8', fontSize: '1.2rem' }}
                      >
                        ₹{formatPrice(product.mrp)}
                      </span>
                      <span 
                        className="fw-bold" 
                        style={{ color: '#059669', fontSize: '2rem' }}
                      >
                        ₹{formatPrice(product.discountedPrice)}
                      </span>
                      {hasDiscount && (
                        <span 
                          className="badge"
                          style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '0.9rem', padding: '6px 12px' }}
                        >
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  ) : product.discountedPrice ? (
                    <span className="fw-bold" style={{ color: '#059669', fontSize: '2rem' }}>
                      ₹{formatPrice(product.discountedPrice)}
                    </span>
                  ) : product.mrp ? (
                    <span className="fw-bold" style={{ color: '#059669', fontSize: '2rem' }}>
                      ₹{formatPrice(product.mrp)}
                    </span>
                  ) : (
                    <span className="fw-bold" style={{ color: '#059669', fontSize: '1.5rem' }}>
                      Click to see price
                    </span>
                  )}
                </div>
                
                <p className="mb-4" style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  {product.shortDescription}
                </p>
                
                {/* Action Button */}
                <a 
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg w-100"
                  style={{ 
                    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                    color: 'white',
                    borderRadius: '10px',
                    fontWeight: '600',
                    padding: '14px 24px',
                    fontSize: '1rem',
                    border: 'none'
                  }}
                >
                  Get This Deal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Affiliate Product Card Component
 * Clean, modern design with Quick View
 */
export default function AffiliateProductCard({ 
  product, 
  variant = 'grid'
}: AffiliateProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const displayName = truncateName(product.name);
  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;

  // Debug log to see what prices are coming through
  console.log('Product card prices:', product.name, 'MRP:', product.mrp, 'Discounted:', product.discountedPrice);

  if (variant === 'list') {
    return (
      <>
        <div className="bg-white rounded-3 shadow-sm p-3 h-100" style={{ border: '1px solid #e2e8f0' }}>
          <div className="row g-0 align-items-center">
            <div className="col-4">
              <div 
                className="rounded p-2 cursor-pointer"
                style={{ background: 'linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%)' }}
                onClick={() => setShowQuickView(true)}
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="img-fluid"
                  style={{ objectFit: 'contain', maxHeight: '120px', width: '100%' }}
                />
              </div>
            </div>
            <div className="col-8 ps-3">
              <span className="badge text-white mb-2" style={{ backgroundColor: '#6366f1', fontSize: '0.65rem' }}>
                {product.category?.name || 'Student Deals'}
              </span>
              <h6 className="mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>
                {displayName}
              </h6>
              {hasDiscount && (
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="text-decoration-line-through" style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    ₹{formatPrice(product.mrp!)}
                  </span>
                  <span className="fw-bold" style={{ color: '#10b981', fontSize: '1rem' }}>
                    ₹{formatPrice(product.discountedPrice!)}
                  </span>
                </div>
              )}
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowQuickView(true)}
                >
                  Quick View
                </button>
                <a 
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm text-white"
                  style={{ backgroundColor: '#e11d48' }}
                >
                  Get Deal
                </a>
              </div>
            </div>
          </div>
        </div>
        <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
      </>
    );
  }

  // Grid variant (default) - Clean card design
  return (
    <>
      <div 
        className="bg-white rounded-4 h-100 overflow-hidden product-card"
        style={{ 
          transition: 'transform 0.2s, box-shadow 0.2s',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Discount Badge */}
        {hasDiscount && (
          <div 
            className="position-absolute top-0 start-0 m-2 badge"
            style={{ 
              backgroundColor: '#fef3c7', 
              color: '#d97706', 
              fontSize: '0.75rem',
              fontWeight: '600',
              zIndex: 1
            }}
          >
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Image Container */}
        <div 
          className="position-relative cursor-pointer" 
          style={{ background: 'linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%)' }}
          onClick={() => setShowQuickView(true)}
        >
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-100"
            style={{ 
              height: '180px', 
              objectFit: 'contain',
              padding: '20px'
            }}
          />
          {/* Quick View Overlay */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0 hover-overlay"
            style={{ 
              background: 'rgba(0,0,0,0.4)',
              transition: 'opacity 0.3s'
            }}
          >
            <span className="btn btn-light btn-sm">Quick View</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <span 
            className="badge text-white mb-2" 
            style={{ backgroundColor: '#6366f1', fontSize: '0.7rem', fontWeight: '500' }}
          >
            {product.category?.name || 'Student Deals'}
          </span>
          <h6 
            className="mb-2" 
            style={{ 
              fontWeight: '600', 
              fontSize: '0.9rem', 
              lineHeight: '1.4',
              minHeight: '2.5em',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              color: '#1e293b'
            }}
          >
            {displayName}
          </h6>
          
          {/* Pricing - Always Show */}
          <div className="mb-3">
            {product.mrp && product.discountedPrice ? (
              <div className="d-flex align-items-baseline gap-2 flex-wrap">
                <span 
                  className="text-decoration-line-through" 
                  style={{ color: '#94a3b8', fontSize: '0.9rem' }}
                >
                  ₹{formatPrice(product.mrp)}
                </span>
                <span 
                  className="fw-bold" 
                  style={{ color: '#059669', fontSize: '1.3rem' }}
                >
                  ₹{formatPrice(product.discountedPrice)}
                </span>
              </div>
            ) : product.discountedPrice ? (
              <span className="fw-bold" style={{ color: '#059669', fontSize: '1.3rem' }}>
                ₹{formatPrice(product.discountedPrice)}
              </span>
            ) : product.mrp ? (
              <span className="fw-bold" style={{ color: '#059669', fontSize: '1.3rem' }}>
                ₹{formatPrice(product.mrp)}
              </span>
            ) : (
              <span className="fw-bold" style={{ color: '#059669', fontSize: '1rem' }}>
                Check Price
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm flex-grow-1"
              style={{ 
                border: '1px solid #cbd5e1',
                color: '#475569',
                fontSize: '0.8rem'
              }}
              onClick={() => setShowQuickView(true)}
            >
              Quick View
            </button>
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm flex-grow-1 text-white"
              style={{ 
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                fontSize: '0.8rem',
                fontWeight: '500',
                border: 'none'
              }}
            >
              Get Deal
            </a>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
      
      {/* CSS for hover effect */}
      <style>{`
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15) !important;
        }
        .product-card:hover .hover-overlay {
          opacity: 1 !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

/**
 * Featured Product Card - Larger display for homepage
 */
export function FeaturedProductCard({ product }: { product: AffiliateProduct }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const displayName = truncateName(product.name, 50);
  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;
  
  return (
    <>
      <div 
        className="bg-white rounded-4 h-100 overflow-hidden position-relative" 
        style={{ 
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {hasDiscount && (
          <div 
            className="position-absolute top-0 start-0 m-2 badge"
            style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '0.75rem', fontWeight: '600', zIndex: 1 }}
          >
            {discountPercent}% OFF
          </div>
        )}
        <div 
          className="cursor-pointer" 
          style={{ background: 'linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%)' }}
          onClick={() => setShowQuickView(true)}
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-100"
            style={{ height: '200px', objectFit: 'contain', padding: '20px' }}
          />
        </div>
        <div className="p-3">
          <span className="badge text-white mb-2" style={{ backgroundColor: '#6366f1', fontSize: '0.7rem' }}>
            {product.category?.name || 'Student Deals'}
          </span>
          <h6 className="mb-2" style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1e293b' }}>
            {displayName}
          </h6>
          {/* Pricing - Always Show */}
          <div className="mb-3">
            {product.mrp && product.discountedPrice ? (
              <div className="d-flex align-items-baseline gap-2 flex-wrap">
                <span className="text-decoration-line-through" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  ₹{formatPrice(product.mrp)}
                </span>
                <span className="fw-bold" style={{ color: '#059669', fontSize: '1.3rem' }}>
                  ₹{formatPrice(product.discountedPrice)}
                </span>
              </div>
            ) : product.discountedPrice ? (
              <span className="fw-bold" style={{ color: '#059669', fontSize: '1.3rem' }}>
                ₹{formatPrice(product.discountedPrice)}
              </span>
            ) : product.mrp ? (
              <span className="fw-bold" style={{ color: '#059669', fontSize: '1.3rem' }}>
                ₹{formatPrice(product.mrp)}
              </span>
            ) : (
              <span className="fw-bold" style={{ color: '#059669', fontSize: '1rem' }}>
                View Price
              </span>
            )}
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm flex-grow-1"
              style={{ border: '1px solid #cbd5e1', color: '#475569', fontSize: '0.8rem' }}
              onClick={() => setShowQuickView(true)}
            >
              Quick View
            </button>
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm flex-grow-1 text-white"
              style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', fontSize: '0.8rem', border: 'none' }}
            >
              Get Deal
            </a>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}
