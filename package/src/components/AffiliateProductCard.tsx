import { useState, useEffect } from 'react';
import { AffiliateProduct } from '../constant/affiliateData';

interface AffiliateProductCardProps {
  product: AffiliateProduct;
  variant?: 'grid' | 'list';
}

// Meesho Brand Colors
const MEESHO = {
  pink: '#F43397',
  pinkLight: '#FFF0F7',
  pinkDark: '#D91A7A',
  purple: '#570A57',
  green: '#00AA4F',
  greenLight: '#E8F8EF',
  orange: '#FF6B35',
  gray: '#666666',
  grayLight: '#F5F5F5',
  black: '#333333',
  white: '#FFFFFF',
};

// Helper to truncate long product names
const truncateName = (name: string, maxLength: number = 50) => {
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
 * Quick View Modal - Meesho Style
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
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '750px',
          background: MEESHO.white,
          borderRadius: '12px',
          overflow: 'hidden',
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s ease',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: MEESHO.grayLight,
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: MEESHO.gray
          }}
        >
          ✕
        </button>

        <div className="row g-0">
          {/* Product Image */}
          <div className="col-md-5">
            <div 
              style={{ 
                background: MEESHO.grayLight,
                height: '100%',
                minHeight: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'relative'
              }}
            >
              {hasDiscount && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: MEESHO.pink,
                  color: MEESHO.white,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {discountPercent}% OFF
                </div>
              )}
              <img 
                src={product.images[0]} 
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '260px', objectFit: 'contain' }}
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="col-md-7">
            <div style={{ padding: '24px' }}>
              <span style={{ 
                display: 'inline-block',
                background: MEESHO.pinkLight,
                color: MEESHO.pink,
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '10px'
              }}>
                {product.category?.name || 'Student Deal'}
              </span>
              
              <h4 style={{ 
                fontWeight: '600', 
                marginBottom: '14px', 
                color: MEESHO.black,
                fontSize: '18px',
                lineHeight: '1.4'
              }}>
                {product.name}
              </h4>
              
              {/* Pricing */}
              <div style={{ marginBottom: '16px' }}>
                {product.mrp && product.discountedPrice ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ color: MEESHO.black, fontSize: '24px', fontWeight: '700' }}>
                      ₹{formatPrice(product.discountedPrice)}
                    </span>
                    <span style={{ color: MEESHO.gray, fontSize: '16px', textDecoration: 'line-through' }}>
                      ₹{formatPrice(product.mrp)}
                    </span>
                    <span style={{ color: MEESHO.green, fontSize: '14px', fontWeight: '600' }}>
                      {discountPercent}% off
                    </span>
                  </div>
                ) : (
                  <span style={{ color: MEESHO.black, fontSize: '24px', fontWeight: '700' }}>
                    ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
                  </span>
                )}
              </div>

              {/* Free Delivery Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: MEESHO.greenLight,
                padding: '8px 12px',
                borderRadius: '6px',
                marginBottom: '16px'
              }}>
                <span style={{ color: MEESHO.green, fontSize: '13px', fontWeight: '600' }}>
                  🚚 Free Delivery
                </span>
              </div>
              
              <p style={{ color: MEESHO.gray, fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                {product.shortDescription}
              </p>
              
              {/* Buy Button */}
              <a 
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'block',
                  width: '100%',
                  background: MEESHO.pink,
                  color: MEESHO.white,
                  borderRadius: '8px',
                  fontWeight: '600',
                  padding: '14px 24px',
                  fontSize: '15px',
                  border: 'none',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = MEESHO.pinkDark}
                onMouseLeave={(e) => e.currentTarget.style.background = MEESHO.pink}
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Affiliate Product Card - Meesho Style
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
            background: MEESHO.white,
            borderRadius: '8px',
            border: `1px solid ${MEESHO.grayLight}`,
            overflow: 'hidden',
            transition: 'box-shadow 0.2s ease',
            boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="row g-0 align-items-center">
            <div className="col-4">
              <div 
                style={{ 
                  background: MEESHO.grayLight,
                  padding: '16px',
                  cursor: 'pointer',
                  position: 'relative',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setShowQuickView(true)}
              >
                {hasDiscount && (
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: MEESHO.pink,
                    color: MEESHO.white,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    fontWeight: '700'
                  }}>
                    {discountPercent}% OFF
                  </span>
                )}
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className="col-8 p-3">
              <h6 style={{ 
                fontSize: '13px', 
                fontWeight: '500', 
                color: MEESHO.black,
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>
                {displayName}
              </h6>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ color: MEESHO.black, fontSize: '15px', fontWeight: '700' }}>
                  ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
                </span>
                {hasDiscount && (
                  <>
                    <span style={{ color: MEESHO.gray, fontSize: '12px', textDecoration: 'line-through' }}>
                      ₹{formatPrice(product.mrp!)}
                    </span>
                    <span style={{ color: MEESHO.green, fontSize: '11px', fontWeight: '600' }}>
                      {discountPercent}% off
                    </span>
                  </>
                )}
              </div>
              <span style={{ 
                display: 'inline-block',
                color: MEESHO.green, 
                fontSize: '11px', 
                fontWeight: '500' 
              }}>
                🚚 Free Delivery
              </span>
            </div>
          </div>
        </div>
        <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
      </>
    );
  }

  // Grid variant - Meesho Style Card
  return (
    <>
      <div 
        style={{ 
          background: MEESHO.white,
          borderRadius: '8px',
          overflow: 'hidden',
          border: `1px solid ${MEESHO.grayLight}`,
          boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowQuickView(true)}
      >
        {/* Image Section */}
        <div 
          style={{ 
            background: MEESHO.grayLight,
            position: 'relative',
            padding: '16px',
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Discount Badge */}
          {hasDiscount && (
            <div 
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                background: MEESHO.pink,
                color: MEESHO.white,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              {discountPercent}% OFF
            </div>
          )}
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            style={{ 
              maxHeight: '140px',
              maxWidth: '100%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>
        
        {/* Content Section */}
        <div style={{ 
          padding: '12px', 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column'
        }}>
          {/* Title */}
          <h6 
            style={{ 
              fontWeight: '500', 
              fontSize: '14px', 
              lineHeight: '1.4',
              marginBottom: '8px',
              color: MEESHO.black,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
              minHeight: '40px'
            }}
          >
            {displayName}
          </h6>
          
          {/* Pricing Section */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: MEESHO.black, fontSize: '16px', fontWeight: '700' }}>
                ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
              </span>
              {hasDiscount && (
                <>
                  <span style={{ color: MEESHO.gray, fontSize: '13px', textDecoration: 'line-through' }}>
                    ₹{formatPrice(product.mrp!)}
                  </span>
                  <span style={{ color: MEESHO.green, fontSize: '12px', fontWeight: '600' }}>
                    {discountPercent}% off
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Free Delivery */}
          <div style={{ marginTop: 'auto' }}>
            <span style={{ 
              color: MEESHO.green, 
              fontSize: '12px', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              🚚 Free Delivery
            </span>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}

/**
 * Featured Product Card - Meesho Style
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
          background: MEESHO.white,
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1px solid ${MEESHO.grayLight}`,
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowQuickView(true)}
      >
        {/* Image Section */}
        <div 
          style={{ 
            background: MEESHO.grayLight,
            position: 'relative',
            padding: '24px',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {hasDiscount && (
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: MEESHO.pink,
              color: MEESHO.white,
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '700'
            }}>
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
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
          />
        </div>
        
        {/* Content Section */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5 style={{ 
            fontWeight: '600', 
            fontSize: '15px',
            lineHeight: '1.4',
            marginBottom: '10px',
            color: MEESHO.black,
            minHeight: '42px'
          }}>
            {displayName}
          </h5>
          
          {/* Pricing */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: MEESHO.black, fontSize: '18px', fontWeight: '700' }}>
                ₹{formatPrice(product.discountedPrice || product.mrp || 0)}
              </span>
              {hasDiscount && (
                <>
                  <span style={{ color: MEESHO.gray, fontSize: '14px', textDecoration: 'line-through' }}>
                    ₹{formatPrice(product.mrp!)}
                  </span>
                  <span style={{ color: MEESHO.green, fontSize: '13px', fontWeight: '600' }}>
                    {discountPercent}% off
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Free Delivery */}
          <div style={{ marginTop: 'auto' }}>
            <span style={{ color: MEESHO.green, fontSize: '12px', fontWeight: '500' }}>
              🚚 Free Delivery
            </span>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}
