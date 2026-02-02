import Link from 'next/link';
import { Product } from '../../lib/db';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.discounted_price || product.sale_price || product.price || 0;
  const originalPrice = product.mrp || product.original_price || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      style={{
        display: 'block',
        background: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        border: '1px solid #f3f4f6',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '75%', background: '#f9fafb' }}>
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        {discount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: '#ef4444',
              color: 'white',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {product.category && (
          <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 600, textTransform: 'uppercase' }}>
            {product.category}
          </span>
        )}
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#111827',
            marginTop: 4,
            marginBottom: 8,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>₹{price.toLocaleString()}</span>
          {originalPrice > price && (
            <span style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'line-through' }}>
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          style={{
            width: '100%',
            marginTop: 12,
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          View Deal →
        </button>
      </div>
    </Link>
  );
}
