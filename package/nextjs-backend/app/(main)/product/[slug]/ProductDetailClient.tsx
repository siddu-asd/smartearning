'use client';

import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import { Product } from '../../../../lib/db';

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

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const mrp = product.mrp || product.original_price || product.price || 0;
  const discountedPrice = product.discounted_price || product.sale_price || product.price || 0;
  const hasDiscount = mrp > discountedPrice;
  const discountPercent = hasDiscount ? calculateDiscount(mrp, discountedPrice) : 0;

  const relatedProductCards = relatedProducts.map((p) => ({
    id: p.id,
    name: p.title,
    slug: p.slug,
    images: [p.image_url || '/placeholder.jpg'],
    affiliateUrl: p.affiliate_link,
    mrp: p.mrp || p.original_price || p.price,
    discountedPrice: p.discounted_price || p.sale_price || p.price,
    buttonText: 'Get Deal',
  }));

  return (
    <div className="page-content" style={{ background: COLORS.gradient, minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Back Link */}
            <Link href="/deals" style={{ color: COLORS.white, textDecoration: 'none', marginBottom: '24px', display: 'inline-block' }}>
              ← Back to Deals
            </Link>

            {/* Main Card */}
            <div
              style={{
                background: COLORS.white,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-5 position-relative">
                  <div
                    style={{
                      background: 'linear-gradient(145deg, #f0f4f8 0%, #e2e8f0 100%)',
                      minHeight: '400px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '32px',
                    }}
                  >
                    {hasDiscount && discountPercent > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          background: '#FEF3C7',
                          color: '#D97706',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: '600',
                        }}
                      >
                        {discountPercent}% OFF
                      </div>
                    )}
                    <img
                      src={product.image_url || '/placeholder.jpg'}
                      alt={product.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '350px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="col-md-7">
                  <div style={{ padding: '40px' }}>
                    <h1
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: COLORS.dark,
                        marginBottom: '16px',
                        lineHeight: '1.3',
                      }}
                    >
                      {product.title}
                    </h1>

                    {/* Price Section */}
                    <div style={{ marginBottom: '24px' }}>
                      {hasDiscount ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                            <span
                              style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: COLORS.secondary,
                              }}
                            >
                              ₹{formatPrice(discountedPrice)}
                            </span>
                            <span
                              style={{
                                fontSize: '1.25rem',
                                color: COLORS.gray,
                                textDecoration: 'line-through',
                              }}
                            >
                              ₹{formatPrice(mrp)}
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'inline-block',
                              background: '#DCFCE7',
                              color: '#166534',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: '600',
                            }}
                          >
                            You save ₹{formatPrice(mrp - discountedPrice)}!
                          </div>
                        </>
                      ) : (
                        <span
                          style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: COLORS.dark,
                          }}
                        >
                          ₹{formatPrice(mrp || discountedPrice)}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {product.description && (
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: COLORS.dark, marginBottom: '8px' }}>
                          About this product
                        </h3>
                        <p style={{ color: COLORS.gray, lineHeight: '1.7' }}>{product.description}</p>
                      </div>
                    )}

                    {/* Features */}
                    <div style={{ marginBottom: '32px' }}>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px',
                        }}
                      >
                        {[
                          { icon: '✅', text: 'Verified Deal' },
                          { icon: '🔒', text: 'Secure Checkout' },
                          { icon: '📦', text: 'Direct from Seller' },
                          { icon: '⭐', text: 'Top Rated' },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              color: COLORS.gray,
                              fontSize: '14px',
                            }}
                          >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={product.affiliate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '18px 32px',
                        background: COLORS.gradient,
                        color: COLORS.white,
                        fontSize: '18px',
                        fontWeight: '700',
                        borderRadius: '14px',
                        textDecoration: 'none',
                        boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      🛒 Get This Deal Now →
                    </a>

                    <p
                      style={{
                        textAlign: 'center',
                        marginTop: '12px',
                        color: COLORS.gray,
                        fontSize: '13px',
                      }}
                    >
                      You&apos;ll be redirected to the seller&apos;s website
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProductCards.length > 0 && (
          <div className="row justify-content-center mt-5">
            <div className="col-lg-10">
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: COLORS.white,
                  marginBottom: '24px',
                }}
              >
                You might also like
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '20px',
                }}
              >
                {relatedProductCards.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
