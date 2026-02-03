'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '../../../../lib/db';
import ProductCard from '../../../components/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [imageError, setImageError] = useState(false);
  
  const price = product.discounted_price || product.sale_price || product.price || 0;
  const originalPrice = product.mrp || product.original_price || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const savings = originalPrice > price ? originalPrice - price : 0;

  const features = [
    { icon: '✅', text: 'Verified Deal' },
    { icon: '🚚', text: 'Fast Shipping' },
    { icon: '🔒', text: 'Secure Checkout' },
    { icon: '↩️', text: 'Easy Returns' },
  ];

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '48px 24px 120px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <nav>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li><Link href="/deals" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Deals</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li style={{ color: 'white', fontSize: '14px', fontWeight: 600, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Content */}
      <section style={{ padding: '0 24px', marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0' }}>
              {/* Product Image */}
              <div style={{ background: '#f9fafb', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative' }}>
                {discount > 0 && (
                  <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#dc2626', color: 'white', padding: '8px 14px', borderRadius: '6px', fontSize: '14px', fontWeight: 700 }}>
                    {discount}% OFF
                  </div>
                )}
                {product.image_url && !imageError ? (
                  <img src={product.image_url} alt={product.title} onError={() => setImageError(true)} style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ fontSize: '80px', opacity: 0.3 }}>📦</div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '40px' }}>
                {product.category && (
                  <span style={{ display: 'inline-block', background: '#f3f4f6', color: '#374151', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '16px' }}>{product.category}</span>
                )}
                
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '20px', lineHeight: 1.4 }}>{product.title}</h1>

                {/* Price */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: '#2563eb' }}>₹{price.toLocaleString()}</span>
                    {originalPrice > price && (
                      <span style={{ fontSize: '18px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div style={{ color: '#2563eb', fontSize: '15px', fontWeight: 600 }}>You save ₹{savings.toLocaleString()}</div>
                  )}
                </div>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
                  {features.map((f, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f9fafb', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', color: '#374151' }}>
                      {f.icon} {f.text}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px 24px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', borderRadius: '8px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
                  Get This Deal →
                </a>

                <p style={{ fontSize: '13px', color: '#9ca3af', textAlign: 'center', marginTop: '12px' }}>
                  You&apos;ll be redirected to the seller&apos;s website
                </p>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div style={{ padding: '32px 40px', borderTop: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Product Description</h2>
                <div style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7 }}>{product.description}</div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ paddingBottom: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>Similar Deals</h2>
                <Link href="/deals" style={{ color: '#2563eb', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {relatedProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
