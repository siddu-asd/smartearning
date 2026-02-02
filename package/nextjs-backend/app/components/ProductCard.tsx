'use client';

import Link from 'next/link';
import Image from 'next/image';

// Types
interface Product {
  id: string;
  name: string;
  slug: string;
  images: string[];
  affiliateUrl: string;
  mrp?: number;
  discountedPrice?: number;
  buttonText?: string;
}

interface ProductCardProps {
  product: Product;
}

const COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

const formatPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};

const calculateDiscount = (mrp: number, discounted: number) => {
  return Math.round(((mrp - discounted) / mrp) * 100);
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.mrp && product.discountedPrice && product.mrp > product.discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(product.mrp!, product.discountedPrice!) : 0;

  return (
    <div
      style={{
        background: COLORS.white,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${COLORS.border}`,
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          background: COLORS.lightBg,
        }}
      >
        <img
          src={product.images?.[0] || '/placeholder.jpg'}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '16px',
          }}
        />

        {/* Discount Badge */}
        {hasDiscount && discountPercent > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: '#FEF3C7',
              color: '#D97706',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
            }}
          >
            {discountPercent}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Product Name */}
        <Link
          href={`/product/${product.slug}`}
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: COLORS.dark,
            textDecoration: 'none',
            lineHeight: '1.4',
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Link>

        {/* Price Section */}
        <div style={{ marginBottom: '16px', marginTop: 'auto' }}>
          {hasDiscount ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: COLORS.secondary,
                }}
              >
                ₹{formatPrice(product.discountedPrice!)}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: COLORS.gray,
                  textDecoration: 'line-through',
                }}
              >
                ₹{formatPrice(product.mrp!)}
              </span>
            </div>
          ) : (
            <span
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: COLORS.dark,
              }}
            >
              ₹{formatPrice(product.mrp || product.discountedPrice || 0)}
            </span>
          )}
        </div>

        {/* CTA Button */}
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
            background: COLORS.gradient,
            color: COLORS.white,
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '10px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {product.buttonText || 'Get Deal'} →
        </a>
      </div>
    </div>
  );
}
