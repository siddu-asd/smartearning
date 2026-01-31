import { useState, useEffect } from 'react';
import { AffiliateProduct } from '../constant/affiliateData';

// ============================================
// INTERFACE
// ============================================
interface AffiliateProductCardProps {
  product: AffiliateProduct;
  variant?: 'grid' | 'list';
  index?: number;
}

// ============================================
// COLOR THEME - Clean Professional
// ============================================
const COLORS = {
  primary: '#2563EB',       // Blue
  primaryDark: '#1D4ED8',   // Darker blue
  primaryLight: '#DBEAFE',  // Light blue bg
  secondary: '#10B981',     // Green
  secondaryLight: '#D1FAE5', // Light green
  accent: '#F59E0B',        // Amber
  accentLight: '#FEF3C7',   // Light amber
  dark: '#111827',          // Dark text
  gray: '#6B7280',          // Gray text
  grayLight: '#9CA3AF',     // Lighter gray
  lightBg: '#F9FAFB',       // Light background
  white: '#FFFFFF',
  border: '#E5E7EB',        // Border color
  borderLight: '#F3F4F6',   // Lighter border
  error: '#EF4444',         // Red for discounts
  errorLight: '#FEE2E2',    // Light red bg
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Truncate long product names
const truncateName = (name: string, maxLength: number = 50): string => {
  const cleanName = name.includes('|') ? name.split('|')[0].trim() : name;
  if (cleanName.length > maxLength) {
    return cleanName.substring(0, maxLength).trim() + '...';
  }
  return cleanName;
};

// Format price in Indian format with commas
const formatPrice = (price: number): string => {
  return price.toLocaleString('en-IN');
};

// Calculate discount percentage
const calculateDiscount = (mrp: number, discountedPrice: number): number => {
  if (mrp <= 0 || discountedPrice <= 0) return 0;
  return Math.round(((mrp - discountedPrice) / mrp) * 100);
};

// ============================================
// QUICK VIEW MODAL COMPONENT
// ============================================
interface QuickViewModalProps {
  product: AffiliateProduct;
  isOpen: boolean;
  onClose: () => void;
}

function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'auto';
      setIsVisible(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;
  const displayPrice = product.discountedPrice || product.mrp || 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          background: COLORS.white,
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.lightBg,
          }}
        >
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: COLORS.dark }}>
            Product Details
          </h3>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: COLORS.white,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.error;
              e.currentTarget.style.color = COLORS.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.white;
              e.currentTarget.style.color = COLORS.dark;
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
            gap: '0',
            overflow: 'auto',
            flex: 1,
          }}
        >
          {/* Image Section */}
          <div
            style={{
              padding: '24px',
              background: COLORS.lightBg,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Main Image */}
            <div
              style={{
                aspectRatio: '1',
                background: COLORS.white,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      border: selectedImage === idx 
                        ? `2px solid ${COLORS.primary}` 
                        : `1px solid ${COLORS.border}`,
                      background: COLORS.white,
                      padding: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        borderRadius: '4px',
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              overflow: 'auto',
            }}
          >
            {/* Title */}
            <h2
              style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: 600,
                color: COLORS.dark,
                lineHeight: 1.4,
              }}
            >
              {product.name}
            </h2>

            {/* Price Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: COLORS.dark,
                }}
              >
                ₹{formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span
                    style={{
                      fontSize: '18px',
                      color: COLORS.grayLight,
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{formatPrice(product.mrp!)}
                  </span>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: COLORS.secondary,
                      background: COLORS.secondaryLight,
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            {product.shortDescription && (
              <div>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: COLORS.gray,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Description
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    color: COLORS.gray,
                    lineHeight: 1.6,
                  }}
                >
                  {product.shortDescription}
                </p>
              </div>
            )}

            {/* Pros */}
            {product.pros && product.pros.length > 0 && (
              <div>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: COLORS.gray,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Highlights
                </h4>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  {product.pros.slice(0, 4).map((pro, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '14px',
                        color: COLORS.dark,
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={COLORS.secondary}
                        strokeWidth="2"
                        style={{ flexShrink: 0, marginTop: '2px' }}
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Buy Now Button */}
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                color: COLORS.white,
                fontSize: '16px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.4)';
              }}
            >
              <span>{product.buttonText || 'Buy Now'}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PRODUCT CARD COMPONENT
// ============================================
export default function AffiliateProductCard({ product, variant = 'grid', index }: AffiliateProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;
  const displayPrice = product.discountedPrice || product.mrp || 0;
  const productImage = product.images[0] || '';

  // Animation delay based on index
  const animationDelay = index !== undefined ? `${index * 0.05}s` : '0s';

  // ============================================
  // LIST VARIANT
  // ============================================
  if (variant === 'list') {
    return (
      <>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: 'flex',
            gap: '20px',
            background: COLORS.white,
            borderRadius: '12px',
            border: `1px solid ${isHovered ? COLORS.primary : COLORS.border}`,
            padding: '16px',
            transition: 'all 0.3s ease',
            boxShadow: isHovered 
              ? '0 10px 30px rgba(37, 99, 235, 0.15)' 
              : '0 1px 3px rgba(0, 0, 0, 0.05)',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            animation: 'fadeInUp 0.5s ease forwards',
            animationDelay,
            opacity: 0,
          }}
        >
          {/* Image */}
          <div
            style={{
              width: '160px',
              height: '160px',
              flexShrink: 0,
              background: COLORS.lightBg,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => setShowQuickView(true)}
          >
            {/* Discount Badge */}
            {hasDiscount && discountPercent > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  background: `linear-gradient(135deg, ${COLORS.error} 0%, #DC2626 100%)`,
                  color: COLORS.white,
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  zIndex: 1,
                }}
              >
                {discountPercent}% OFF
              </div>
            )}
            <img
              src={productImage}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Title */}
            <h3
              onClick={() => setShowQuickView(true)}
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: COLORS.dark,
                lineHeight: 1.4,
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.dark)}
            >
              {product.name}
            </h3>

            {/* Description */}
            {product.shortDescription && (
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: COLORS.gray,
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {product.shortDescription}
              </p>
            )}

            {/* Price & Button Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto',
                gap: '16px',
              }}
            >
              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: COLORS.dark }}>
                  ₹{formatPrice(displayPrice)}
                </span>
                {hasDiscount && (
                  <span
                    style={{
                      fontSize: '14px',
                      color: COLORS.grayLight,
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{formatPrice(product.mrp!)}
                  </span>
                )}
              </div>

              {/* Get Deal Button */}
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
                  color: COLORS.white,
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get Deal
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />

        {/* Keyframes */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </>
    );
  }

  // ============================================
  // GRID VARIANT (DEFAULT)
  // ============================================
  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: COLORS.white,
          borderRadius: '12px',
          border: `1px solid ${isHovered ? COLORS.primary : COLORS.border}`,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          boxShadow: isHovered 
            ? '0 12px 40px rgba(37, 99, 235, 0.15)' 
            : '0 1px 3px rgba(0, 0, 0, 0.05)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          height: '100%',
          animation: 'fadeInUp 0.5s ease forwards',
          animationDelay,
          opacity: 0,
        }}
      >
        {/* Image Container */}
        <div
          onClick={() => setShowQuickView(true)}
          style={{
            position: 'relative',
            aspectRatio: '1',
            background: COLORS.lightBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Discount Badge */}
          {hasDiscount && discountPercent > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: `linear-gradient(135deg, ${COLORS.error} 0%, #DC2626 100%)`,
                color: COLORS.white,
                fontSize: '12px',
                fontWeight: 700,
                padding: '6px 10px',
                borderRadius: '8px',
                zIndex: 2,
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
              }}
            >
              {discountPercent}% OFF
            </div>
          )}

          {/* Quick View Button on Hover */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: `translateX(-50%) translateY(${isHovered ? '0' : '20px'})`,
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.3s ease',
              zIndex: 2,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                color: COLORS.dark,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.primary;
                e.currentTarget.style.color = COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = COLORS.dark;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Quick View
            </button>
          </div>

          {/* Product Image */}
          <img
            src={productImage}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            style={{
              maxWidth: '80%',
              maxHeight: '80%',
              objectFit: 'contain',
              opacity: imageLoaded ? 1 : 0,
              transition: 'all 0.4s ease',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: 1,
          }}
        >
          {/* Product Title */}
          <h3
            onClick={() => setShowQuickView(true)}
            style={{
              margin: 0,
              fontSize: '15px',
              fontWeight: 600,
              color: COLORS.dark,
              lineHeight: 1.4,
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '42px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.dark)}
          >
            {truncateName(product.name)}
          </h3>

          {/* Price Section */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: COLORS.dark,
              }}
            >
              ₹{formatPrice(displayPrice)}
            </span>
            {hasDiscount && (
              <>
                <span
                  style={{
                    fontSize: '14px',
                    color: COLORS.grayLight,
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{formatPrice(product.mrp!)}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: COLORS.secondary,
                  }}
                >
                  Save ₹{formatPrice(product.mrp! - product.discountedPrice!)}
                </span>
              </>
            )}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Get Deal Button */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              color: COLORS.white,
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.45)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Get Deal</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

// ============================================
// FEATURED PRODUCT CARD (EXPORTED)
// ============================================
export function FeaturedProductCard({ product }: { product: AffiliateProduct }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;
  const displayPrice = product.discountedPrice || product.mrp || 0;

  return (
    <>
      <div
        style={{
          background: COLORS.white,
          borderRadius: '16px',
          overflow: 'hidden',
          border: `1px solid ${isHovered ? COLORS.primary : COLORS.border}`,
          boxShadow: isHovered 
            ? '0 16px 48px rgba(37, 99, 235, 0.18)' 
            : '0 2px 8px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowQuickView(true)}
      >
        {/* Image Section */}
        <div
          style={{
            background: COLORS.lightBg,
            position: 'relative',
            padding: '28px',
            minHeight: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hasDiscount && discountPercent > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: `linear-gradient(135deg, ${COLORS.error} 0%, #DC2626 100%)`,
                color: COLORS.white,
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 3px 10px rgba(239, 68, 68, 0.4)',
              }}
            >
              {discountPercent}% OFF
            </div>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            style={{
              maxHeight: '180px',
              maxWidth: '100%',
              objectFit: 'contain',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.4s ease',
              opacity: imageLoaded ? 1 : 0,
            }}
          />
        </div>

        {/* Content Section */}
        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5
            style={{
              fontWeight: 600,
              fontSize: '17px',
              lineHeight: 1.4,
              marginBottom: '12px',
              color: COLORS.dark,
              minHeight: '48px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {truncateName(product.name, 55)}
          </h5>

          {/* Pricing */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ color: COLORS.dark, fontSize: '22px', fontWeight: 700 }}>
                ₹{formatPrice(displayPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span
                    style={{
                      color: COLORS.grayLight,
                      fontSize: '15px',
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹{formatPrice(product.mrp!)}
                  </span>
                  <span style={{ color: COLORS.secondary, fontSize: '14px', fontWeight: 600 }}>
                    {discountPercent}% off
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* View Deal Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 20px',
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
              color: COLORS.white,
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              boxShadow: isHovered
                ? '0 6px 20px rgba(37, 99, 235, 0.45)'
                : '0 3px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            <span>View Deal</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      <QuickViewModal product={product} isOpen={showQuickView} onClose={() => setShowQuickView(false)} />
    </>
  );
}
