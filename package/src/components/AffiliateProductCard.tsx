import { useState, useEffect } from 'react';
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
 * Quick View Modal Component - Ultra Modern Dark Theme
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;

  return (
    <div 
      className="modal show d-block" 
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        zIndex: 9999
      }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-lg modal-dialog-centered"
        onClick={e => e.stopPropagation()}
        style={{
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div 
          className="modal-content border-0" 
          style={{ 
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(102, 126, 234, 0.2)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="modal-header border-0 pb-0" style={{ padding: '20px 24px' }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              ✕
            </button>
          </div>
          <div className="modal-body p-4">
            <div className="row g-4">
              {/* Product Image */}
              <div className="col-md-5">
                <div 
                  className="rounded-4 p-4 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    minHeight: '300px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Glow effect */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'glow-pulse 3s ease-in-out infinite'
                  }}></div>
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="img-fluid"
                    style={{ maxHeight: '260px', objectFit: 'contain', position: 'relative', zIndex: 2 }}
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="col-md-7">
                <span 
                  className="badge mb-3"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '0.8rem',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: '500'
                  }}
                >
                  {product.category?.name || 'Student Deals'}
                </span>
                
                <h4 className="fw-bold mb-3" style={{ color: '#ffffff', lineHeight: '1.4', fontSize: '1.4rem' }}>
                  {product.name}
                </h4>
                
                {/* Pricing */}
                <div 
                  className="mb-4 p-4 rounded-4" 
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {product.mrp && product.discountedPrice ? (
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <span 
                        className="text-decoration-line-through" 
                        style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.2rem' }}
                      >
                        ₹{formatPrice(product.mrp)}
                      </span>
                      <span 
                        className="fw-bold" 
                        style={{ 
                          color: '#10b981', 
                          fontSize: '2.2rem',
                          textShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
                        }}
                      >
                        ₹{formatPrice(product.discountedPrice)}
                      </span>
                      {hasDiscount && (
                        <span 
                          className="badge"
                          style={{ 
                            background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                            color: '#000',
                            fontSize: '0.9rem',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontWeight: '700'
                          }}
                        >
                          🔥 {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  ) : product.discountedPrice ? (
                    <span className="fw-bold" style={{ color: '#10b981', fontSize: '2.2rem' }}>
                      ₹{formatPrice(product.discountedPrice)}
                    </span>
                  ) : product.mrp ? (
                    <span className="fw-bold" style={{ color: '#10b981', fontSize: '2.2rem' }}>
                      ₹{formatPrice(product.mrp)}
                    </span>
                  ) : (
                    <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.5rem' }}>
                      Click to see price
                    </span>
                  )}
                </div>
                
                <p className="mb-4" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6' }}>
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
                    borderRadius: '16px',
                    fontWeight: '700',
                    padding: '18px 24px',
                    fontSize: '1.1rem',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(244, 63, 94, 0.4)'
                  }}
                >
                  🚀 Grab This Deal Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

/**
 * Affiliate Product Card Component
 * Ultra Modern Dark Theme with WOW Effects
 */
export default function AffiliateProductCard({ 
  product, 
  variant = 'grid'
}: AffiliateProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const displayName = truncateName(product.name);
  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;

  if (variant === 'list') {
    return (
      <>
        <div 
          className="rounded-4 p-3 h-100" 
          style={{ 
            background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.4s ease'
          }}
        >
          <div className="row g-0 align-items-center">
            <div className="col-4">
              <div 
                className="rounded-3 p-2 cursor-pointer position-relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
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
              <span 
                className="badge mb-2" 
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '0.65rem',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}
              >
                {product.category?.name || 'Student Deals'}
              </span>
              <h6 className="mb-2" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ffffff' }}>
                {displayName}
              </h6>
              <div className="d-flex align-items-center gap-2 mb-2">
                {product.mrp && product.discountedPrice && (
                  <span className="text-decoration-line-through" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                    ₹{formatPrice(product.mrp)}
                  </span>
                )}
                {(product.discountedPrice || product.mrp) && (
                  <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.1rem' }}>
                    ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
                  </span>
                )}
              </div>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-sm"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontSize: '0.75rem'
                  }}
                  onClick={() => setShowQuickView(true)}
                >
                  Quick View
                </button>
                <a 
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm text-white"
                  style={{ 
                    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                    border: 'none',
                    fontSize: '0.75rem'
                  }}
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

  // Grid variant (default) - Ultra Modern Dark Card with WOW effects
  return (
    <>
      <div 
        className="rounded-4 h-100 overflow-hidden position-relative"
        style={{ 
          background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
          border: isHovered ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered 
            ? '0 20px 60px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.2)' 
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge - Animated */}
        {hasDiscount && (
          <div 
            className="position-absolute top-0 start-0 m-3 badge"
            style={{ 
              background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
              color: '#000', 
              fontSize: '0.8rem',
              fontWeight: '700',
              zIndex: 10,
              padding: '8px 14px',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
              animation: isHovered ? 'badge-bounce 0.6s ease' : 'none'
            }}
          >
            🔥 {discountPercent}% OFF
          </div>
        )}
        
        {/* Image Container */}
        <div 
          className="position-relative overflow-hidden" 
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer'
          }}
          onClick={() => setShowQuickView(true)}
        >
          {/* Glow effect behind image */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
            opacity: isHovered ? 1 : 0.3,
            transition: 'all 0.4s ease'
          }}></div>
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-100"
            style={{ 
              height: '200px', 
              objectFit: 'contain',
              padding: '24px',
              position: 'relative',
              zIndex: 2,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.4s ease'
            }}
          />
          
          {/* Quick View Overlay */}
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
              zIndex: 3
            }}
          >
            <span 
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '10px 24px',
                borderRadius: '25px',
                fontWeight: '600',
                transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease 0.1s'
              }}
            >
              👁️ Quick View
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3" style={{ position: 'relative', zIndex: 2 }}>
          <span 
            className="badge mb-2" 
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '0.72rem',
              fontWeight: '500',
              padding: '6px 12px',
              borderRadius: '15px'
            }}
          >
            {product.category?.name || 'Student Deals'}
          </span>
          <h6 
            className="mb-2" 
            style={{ 
              fontWeight: '600', 
              fontSize: '0.95rem', 
              lineHeight: '1.5',
              minHeight: '2.8em',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              color: '#ffffff'
            }}
          >
            {displayName}
          </h6>
          
          {/* Pricing - Always Show with Better Visibility */}
          <div 
            className="mb-3 p-2 rounded-3"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            {product.mrp && product.discountedPrice ? (
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span 
                  className="text-decoration-line-through" 
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}
                >
                  ₹{formatPrice(product.mrp)}
                </span>
                <span 
                  className="fw-bold" 
                  style={{ 
                    color: '#10b981', 
                    fontSize: '1.4rem',
                    textShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  ₹{formatPrice(product.discountedPrice)}
                </span>
              </div>
            ) : product.discountedPrice ? (
              <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.4rem' }}>
                ₹{formatPrice(product.discountedPrice)}
              </span>
            ) : product.mrp ? (
              <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.4rem' }}>
                ₹{formatPrice(product.mrp)}
              </span>
            ) : (
              <span className="fw-bold" style={{ color: '#10b981', fontSize: '1rem' }}>
                Check Price
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm flex-grow-1"
              style={{ 
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontSize: '0.8rem',
                borderRadius: '10px',
                padding: '10px'
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
                fontWeight: '600',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: isHovered ? '0 5px 20px rgba(244, 63, 94, 0.4)' : 'none',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              🚀 Get Deal
            </a>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
      
      {/* CSS for animations */}
      <style>{`
        @keyframes badge-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
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
  const [isHovered, setIsHovered] = useState(false);
  const displayName = truncateName(product.name, 50);
  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;
  
  return (
    <>
      <div 
        className="rounded-4 h-100 overflow-hidden position-relative" 
        style={{ 
          background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
          border: isHovered ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: isHovered 
            ? '0 25px 70px rgba(102, 126, 234, 0.4)' 
            : '0 10px 40px rgba(0, 0, 0, 0.3)',
          transform: isHovered ? 'translateY(-15px)' : 'translateY(0)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasDiscount && (
          <div 
            className="position-absolute top-0 start-0 m-3 badge"
            style={{ 
              background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
              color: '#000',
              fontSize: '0.85rem',
              fontWeight: '700',
              zIndex: 10,
              padding: '10px 16px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.5)'
            }}
          >
            🔥 {discountPercent}% OFF
          </div>
        )}
        <div 
          style={{ 
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={() => setShowQuickView(true)}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: isHovered ? 1 : 0.3,
            transition: 'all 0.4s ease'
          }}></div>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-100"
            style={{ 
              height: '220px', 
              objectFit: 'contain', 
              padding: '24px',
              position: 'relative',
              zIndex: 2,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.4s ease'
            }}
          />
        </div>
        <div className="p-4">
          <span 
            className="badge mb-2" 
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '0.75rem',
              padding: '6px 14px',
              borderRadius: '15px'
            }}
          >
            {product.category?.name || 'Student Deals'}
          </span>
          <h6 className="mb-2" style={{ fontWeight: '600', fontSize: '1rem', color: '#ffffff' }}>
            {displayName}
          </h6>
          
          {/* Pricing */}
          <div 
            className="mb-3 p-2 rounded-3"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            {product.mrp && product.discountedPrice ? (
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="text-decoration-line-through" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                  ₹{formatPrice(product.mrp)}
                </span>
                <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.5rem', textShadow: '0 0 10px rgba(16, 185, 129, 0.3)' }}>
                  ₹{formatPrice(product.discountedPrice)}
                </span>
              </div>
            ) : product.discountedPrice ? (
              <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.5rem' }}>
                ₹{formatPrice(product.discountedPrice)}
              </span>
            ) : product.mrp ? (
              <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.5rem' }}>
                ₹{formatPrice(product.mrp)}
              </span>
            ) : (
              <span className="fw-bold" style={{ color: '#10b981', fontSize: '1.1rem' }}>
                View Price
              </span>
            )}
          </div>
          
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm flex-grow-1"
              style={{ 
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontSize: '0.8rem',
                borderRadius: '10px',
                padding: '10px'
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
                fontWeight: '600',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                boxShadow: isHovered ? '0 5px 20px rgba(244, 63, 94, 0.4)' : 'none'
              }}
            >
              🚀 Get Deal
            </a>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}
