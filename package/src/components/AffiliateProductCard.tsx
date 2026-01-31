import { useState, useEffect } from 'react';
import { AffiliateProduct } from '../constant/affiliateData';

interface AffiliateProductCardProps {
  product: AffiliateProduct;
  variant?: 'grid' | 'list';
}

// Helper to truncate long product names
const truncateName = (name: string, maxLength: number = 45) => {
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
 * Quick View Modal Component - Clean Professional Design
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
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = 'auto';
      setIsVisible(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;

  return (
    <div 
      className="modal show d-block" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-lg"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s ease'
        }}
      >
        <div 
          className="modal-content" 
          style={{ 
            borderRadius: '16px',
            background: '#ffffff',
            border: 'none',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Close Button */}
          <button 
            type="button" 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#374151',
              fontSize: '18px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
          >
            ✕
          </button>

          <div className="modal-body p-0">
            <div className="row g-0">
              {/* Product Image */}
              <div className="col-md-5">
                <div 
                  style={{ 
                    background: '#f8fafc',
                    height: '100%',
                    minHeight: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    position: 'relative'
                  }}
                >
                  {hasDiscount && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      background: '#dc2626',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '700'
                    }}>
                      {discountPercent}% OFF
                    </div>
                  )}
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '280px', 
                      objectFit: 'contain' 
                    }}
                  />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="col-md-7">
                <div style={{ padding: '30px' }}>
                  <span 
                    style={{ 
                      display: 'inline-block',
                      background: '#eff6ff',
                      color: '#2563eb',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {product.category?.name || 'Student Deal'}
                  </span>
                  
                  <h4 style={{ 
                    fontWeight: '700', 
                    marginBottom: '16px', 
                    color: '#111827',
                    fontSize: '1.5rem',
                    lineHeight: '1.4'
                  }}>
                    {product.name}
                  </h4>
                  
                  {/* Pricing */}
                  <div style={{ 
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px'
                  }}>
                    {product.mrp && product.discountedPrice ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                          <span style={{ 
                            color: '#16a34a', 
                            fontSize: '2rem', 
                            fontWeight: '800'
                          }}>
                            ₹{formatPrice(product.discountedPrice)}
                          </span>
                          <span style={{ 
                            color: '#9ca3af', 
                            fontSize: '1.1rem', 
                            textDecoration: 'line-through' 
                          }}>
                            ₹{formatPrice(product.mrp)}
                          </span>
                        </div>
                        <p style={{ 
                          color: '#16a34a', 
                          fontSize: '14px', 
                          marginTop: '8px',
                          marginBottom: 0,
                          fontWeight: '600'
                        }}>
                          You save ₹{formatPrice(product.mrp - product.discountedPrice)} ({discountPercent}% off)
                        </p>
                      </div>
                    ) : (
                      <span style={{ color: '#16a34a', fontSize: '2rem', fontWeight: '800' }}>
                        ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
                      </span>
                    )}
                  </div>
                  
                  <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                    {product.shortDescription}
                  </p>
                  
                  {/* Action Button */}
                  <a 
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'block',
                      width: '100%',
                      background: '#2563eb',
                      color: '#ffffff',
                      borderRadius: '10px',
                      fontWeight: '700',
                      padding: '16px 24px',
                      fontSize: '16px',
                      border: 'none',
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#2563eb';
                    }}
                  >
                    🛒 Get This Deal
                  </a>
                </div>
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
 * Clean, Professional Design - No Overlapping Elements
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

  // List variant
  if (variant === 'list') {
    return (
      <>
        <div 
          style={{ 
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="row g-0 align-items-center">
            <div className="col-4">
              <div 
                style={{ 
                  background: '#f8fafc',
                  padding: '20px',
                  cursor: 'pointer',
                  position: 'relative',
                  height: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setShowQuickView(true)}
              >
                {hasDiscount && (
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#dc2626',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}>
                    -{discountPercent}%
                  </span>
                )}
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="col-8 p-3">
              <span style={{ 
                display: 'inline-block',
                background: '#eff6ff',
                color: '#2563eb',
                fontSize: '10px',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: '4px',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                {product.category?.name || 'Deal'}
              </span>
              <h6 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>
                {displayName}
              </h6>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ color: '#16a34a', fontSize: '16px', fontWeight: '700' }}>
                  ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
                </span>
                {hasDiscount && (
                  <span style={{ color: '#9ca3af', fontSize: '13px', textDecoration: 'line-through' }}>
                    ₹{formatPrice(product.mrp!)}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setShowQuickView(true)}
                  style={{
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  Quick View
                </button>
                <a 
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#2563eb',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#ffffff',
                    textDecoration: 'none'
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

  // Grid variant (default) - Clean Professional Card
  return (
    <>
      <div 
        style={{ 
          background: '#ffffff',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div 
          style={{ 
            background: '#f8fafc',
            position: 'relative',
            cursor: 'pointer',
            padding: '24px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowQuickView(true)}
        >
          {/* Discount Badge */}
          {hasDiscount && (
            <div 
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#dc2626',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                zIndex: 5
              }}
            >
              {discountPercent}% OFF
            </div>
          )}
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            style={{ 
              maxHeight: '160px',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>
        
        {/* Content Section */}
        <div style={{ 
          padding: '20px', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column'
        }}>
          {/* Category Badge */}
          <span 
            style={{ 
              display: 'inline-block',
              alignSelf: 'flex-start',
              background: '#eff6ff',
              color: '#2563eb',
              fontSize: '11px',
              fontWeight: '600',
              padding: '5px 10px',
              borderRadius: '6px',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.3px'
            }}
          >
            {product.category?.name || 'Student Deal'}
          </span>
          
          {/* Title */}
          <h6 
            style={{ 
              fontWeight: '600', 
              fontSize: '15px', 
              lineHeight: '1.5',
              minHeight: '45px',
              marginBottom: '12px',
              color: '#111827',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden'
            }}
          >
            {displayName}
          </h6>
          
          {/* Pricing Section */}
          <div 
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '16px'
            }}
          >
            {product.mrp && product.discountedPrice ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ color: '#16a34a', fontSize: '1.4rem', fontWeight: '700' }}>
                  ₹{formatPrice(product.discountedPrice)}
                </span>
                <span style={{ color: '#9ca3af', fontSize: '0.9rem', textDecoration: 'line-through' }}>
                  ₹{formatPrice(product.mrp)}
                </span>
              </div>
            ) : product.discountedPrice || product.mrp ? (
              <span style={{ color: '#16a34a', fontSize: '1.4rem', fontWeight: '700' }}>
                ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
              </span>
            ) : (
              <span style={{ color: '#16a34a', fontSize: '1rem', fontWeight: '600' }}>
                Check Price →
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button 
              onClick={() => setShowQuickView(true)}
              style={{ 
                flex: 1,
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              Quick View
            </button>
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                flex: 1,
                background: '#2563eb',
                textDecoration: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#ffffff',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }}
            >
              🛒 Get Deal
            </a>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}

/**
 * Featured Product Card - Larger display for homepage
 */
export function FeaturedProductCard({ product }: { product: AffiliateProduct }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const displayName = truncateName(product.name, 55);
  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;
  
  return (
    <>
      <div 
        style={{ 
          background: '#ffffff',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          boxShadow: isHovered ? '0 25px 50px rgba(0,0,0,0.15)' : '0 8px 20px rgba(0,0,0,0.06)',
          transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div 
          style={{ 
            background: '#f8fafc',
            cursor: 'pointer',
            position: 'relative',
            padding: '30px',
            minHeight: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowQuickView(true)}
        >
          {hasDiscount && (
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: '#dc2626',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              zIndex: 5
            }}>
              {discountPercent}% OFF
            </div>
          )}
          <img 
            src={product.images[0]} 
            alt={product.name} 
            style={{ 
              maxHeight: '180px',
              maxWidth: '100%', 
              objectFit: 'contain',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
        </div>
        
        {/* Content Section */}
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            display: 'inline-block',
            alignSelf: 'flex-start',
            background: '#eff6ff',
            color: '#2563eb',
            fontSize: '12px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '6px',
            marginBottom: '12px',
            textTransform: 'uppercase'
          }}>
            {product.category?.name || 'Featured Deal'}
          </span>
          
          <h5 style={{ 
            fontWeight: '700', 
            fontSize: '17px',
            lineHeight: '1.5',
            marginBottom: '14px',
            color: '#111827',
            minHeight: '50px'
          }}>
            {displayName}
          </h5>
          
          {/* Pricing */}
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '18px'
          }}>
            {product.mrp && product.discountedPrice ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#16a34a', fontSize: '1.6rem', fontWeight: '700' }}>
                    ₹{formatPrice(product.discountedPrice)}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '1rem', textDecoration: 'line-through' }}>
                    ₹{formatPrice(product.mrp)}
                  </span>
                </div>
              </div>
            ) : (
              <span style={{ color: '#16a34a', fontSize: '1.6rem', fontWeight: '700' }}>
                ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
              </span>
            )}
          </div>
          
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button 
              onClick={() => setShowQuickView(true)}
              style={{ 
                flex: 1,
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              Quick View
            </button>
            <a 
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                flex: 1,
                background: '#2563eb',
                textDecoration: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }}
            >
              🛒 Get Deal
            </a>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}
