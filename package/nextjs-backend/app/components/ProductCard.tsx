'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '../../lib/db';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const price = product.discounted_price || product.sale_price || product.price || 0;
  const originalPrice = product.mrp || product.original_price || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      style={{
        display: 'block',
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
      }}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', paddingTop: '100%', background: '#f9fafb' }}>
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.title}
            onError={() => setImageError(true)}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }}
          />
        ) : (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px', opacity: 0.3 }}>📦</div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#dc2626', color: 'white', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Category Badge */}
        {product.category && (
          <span style={{ display: 'inline-block', background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px' }}>
            {product.category}
          </span>
        )}

        {/* Title */}
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', marginBottom: '10px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '42px' }}>
          {product.title}
        </h3>

        {/* Price Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#2563eb' }}>₹{price.toLocaleString()}</span>
          {originalPrice > price && (
            <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* CTA Button */}
        <button style={{ width: '100%', padding: '12px 16px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          View Deal <span>→</span>
        </button>
      </div>
    </Link>
  );
}
