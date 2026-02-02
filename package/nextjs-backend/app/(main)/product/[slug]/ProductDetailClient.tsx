'use client';

import Link from 'next/link';
import { Product } from '../../../../lib/db';
import ProductCard from '../../../components/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const price = product.discounted_price || product.sale_price || product.price || 0;
  const originalPrice = product.mrp || product.original_price || 0;
  const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const savings = originalPrice > price ? originalPrice - price : 0;

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          padding: '40px 20px 80px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ marginBottom: 20 }}>
            <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Home</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li><Link href="/deals" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Deals</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Product</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Content */}
      <section style={{ padding: '0 20px', marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 80 }}>
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 0,
              }}
            >
              {/* Image */}
              <div style={{ padding: 32, background: '#f9fafb' }}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ height: 300, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 60, opacity: 0.3 }}>📦</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        background: '#ef4444',
                        color: 'white',
                        padding: '8px 14px',
                        borderRadius: 8,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: 32 }}>
                {product.category && (
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#eef2ff',
                      color: '#6366F1',
                      padding: '6px 14px',
                      borderRadius: 50,
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.category}
                  </span>
                )}

                <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: '#111827', marginBottom: 16, lineHeight: 1.3 }}>
                  {product.title}
                </h1>

                {/* Price */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 32, fontWeight: 800, color: '#111827' }}>₹{price.toLocaleString()}</span>
                    {originalPrice > price && (
                      <span style={{ fontSize: 18, color: '#9ca3af', textDecoration: 'line-through' }}>
                        ₹{originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div
                      style={{
                        display: 'inline-block',
                        marginTop: 8,
                        background: '#dcfce7',
                        color: '#16a34a',
                        padding: '6px 12px',
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      You save ₹{savings.toLocaleString()}!
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', marginBottom: 8, textTransform: 'uppercase' }}>
                      Description
                    </h3>
                    <p style={{ color: '#374151', lineHeight: 1.7, fontSize: 15 }}>{product.description}</p>
                  </div>
                )}

                {/* Features */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#6b7280', marginBottom: 12, textTransform: 'uppercase' }}>
                    Why This Deal?
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Verified Deal', 'Limited Time Offer', 'Top Rated Product', 'Free Delivery'].map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#374151', fontSize: 14 }}>
                        <span style={{ color: '#22c55e' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href={product.affiliate_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                    color: 'white',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.35)';
                  }}
                >
                  🔥 Get This Deal →
                </a>

                <p style={{ marginTop: 12, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
                  * Redirects to partner site. Prices may vary.
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: 60 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 24 }}>Similar Deals</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 24,
                }}
              >
                {relatedProducts.map((p) => (
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
