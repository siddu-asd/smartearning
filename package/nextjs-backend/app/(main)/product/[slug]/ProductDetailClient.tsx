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
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Simple Header */}
      <section style={{ background: 'white', padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <nav>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
              <li style={{ color: '#cbd5e1' }}>/</li>
              <li><Link href="/deals" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Deals</Link></li>
              <li style={{ color: '#cbd5e1' }}>/</li>
              <li style={{ color: '#1e293b', fontSize: '14px', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Content */}
      <section style={{ padding: '32px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', marginBottom: '48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0' }}>
              {/* Product Image */}
              <div style={{ background: 'white', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px', position: 'relative', borderBottom: '1px solid #e2e8f0' }}>
                {discount > 0 && (
                  <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#dc2626', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 700 }}>
                    {discount}% OFF
                  </div>
                )}
                {product.image_url && !imageError ? (
                  <img src={product.image_url} alt={product.title} onError={() => setImageError(true)} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ fontSize: '64px', opacity: 0.3 }}>📦</div>
                )}
              </div>

              {/* Product Info */}
              <div style={{ padding: '32px' }}>
                {product.category && (
                  <span style={{ display: 'inline-block', background: '#dbeafe', color: '#1d4ed8', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '16px' }}>{product.category}</span>
                )}
                
                <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '20px', lineHeight: 1.4 }}>{product.title}</h1>

                {/* Price */}
                <div style={{ marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb' }}>₹{price.toLocaleString()}</span>
                    {originalPrice > price && (
                      <span style={{ fontSize: '16px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div style={{ color: '#16a34a', fontSize: '14px', fontWeight: 600 }}>You save ₹{savings.toLocaleString()}</div>
                  )}
                </div>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                  {features.map((f, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', color: '#475569' }}>
                      {f.icon} {f.text}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '16px 24px', background: '#1e40af', color: 'white', borderRadius: '10px', fontSize: '16px', fontWeight: 700, textDecoration: 'none' }}>
                  Get This Deal →
                </a>

                <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '12px' }}>
                  You&apos;ll be redirected to the seller&apos;s website
                </p>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div style={{ padding: '24px 32px', borderTop: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Product Description</h2>
                <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{product.description}</div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ paddingBottom: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Similar Deals</h2>
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
