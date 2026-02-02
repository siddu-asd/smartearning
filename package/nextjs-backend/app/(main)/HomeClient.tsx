'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../../lib/db';

// Professional Color Palette
const COLORS = {
  primary: '#2563EB',
  primaryLight: '#DBEAFE',
  primaryDark: '#1D4ED8',
  secondary: '#10B981',
  secondaryLight: '#D1FAE5',
  accent: '#F59E0B',
  accentLight: '#FEF3C7',
  dark: '#111827',
  gray: '#6B7280',
  grayLight: '#F3F4F6',
  grayMedium: '#E5E7EB',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  gradientSubtle: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
};

// Category data for grid
const categoryData = [
  { name: 'Laptops', discount: 'Up to 40% OFF', link: '/deals/laptop-deals', color: COLORS.primary, icon: '💻' },
  { name: 'Mobiles', discount: 'Up to 50% OFF', link: '/deals/mobile-deals', color: COLORS.secondary, icon: '📱' },
  { name: 'Headphones', discount: 'Up to 60% OFF', link: '/deals/audio-headphones', color: COLORS.accent, icon: '🎧' },
  { name: 'Appliances', discount: 'Up to 45% OFF', link: '/deals/home-appliances', color: '#8B5CF6', icon: '🏠' },
  { name: 'Furniture', discount: 'Up to 35% OFF', link: '/deals/study-furniture', color: '#EC4899', icon: '🪑' },
  { name: 'TVs & More', discount: 'Up to 55% OFF', link: '/deals/entertainment', color: '#06B6D4', icon: '📺' },
];

// Trust features
const trustFeatures = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₹499' },
  { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
  { icon: '💯', title: 'Verified Deals', desc: 'Authentic products' },
  { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
];

interface HomeClientProps {
  initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Convert products to card format
  const products = initialProducts.slice(0, 8).map((product) => ({
    id: product.id,
    name: product.title,
    slug: product.slug,
    images: [product.image_url || '/placeholder.jpg'],
    affiliateUrl: product.affiliate_link,
    mrp: product.mrp || product.original_price || product.price,
    discountedPrice: product.discounted_price || product.sale_price || product.price,
    buttonText: 'Get Deal',
  }));

  return (
    <div className="page-content" style={{ background: COLORS.white }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          padding: '60px 0',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
        }}
      >
        {/* Floating shapes */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animation: 'float 6s ease-in-out infinite reverse',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  marginBottom: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease',
                }}
              >
                <span style={{ fontSize: '14px' }}>🔥</span>
                <span style={{ color: COLORS.white, fontSize: '14px', fontWeight: '500' }}>
                  New Deals Added Daily
                </span>
              </div>

              {/* Main Heading */}
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  marginBottom: '24px',
                  color: COLORS.white,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease 0.1s',
                }}
              >
                Best Deals for
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Smart Students
                </span>
              </h1>

              {/* Subtext */}
              <p
                style={{
                  fontSize: '18px',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '32px',
                  maxWidth: '500px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease 0.2s',
                }}
              >
                Save up to 70% on laptops, phones, headphones, and more.
                All deals verified and curated for students.
              </p>

              {/* CTA Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease 0.3s',
                }}
              >
                <Link
                  href="/deals"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                    color: COLORS.white,
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  🛒 Browse Deals
                </Link>
                <Link
                  href="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: COLORS.white,
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  📰 Read Blog
                </Link>
              </div>

              {/* Stats Row */}
              <div
                style={{
                  display: 'flex',
                  gap: '40px',
                  marginTop: '48px',
                  flexWrap: 'wrap',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease 0.4s',
                }}
              >
                {[
                  { value: '50K+', label: 'Happy Users' },
                  { value: '10K+', label: 'Active Deals' },
                  { value: '₹5Cr+', label: 'Saved' },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div
                      style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: COLORS.white,
                        lineHeight: '1',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '4px',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animation keyframes */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
        `}</style>
      </section>

      {/* Trust Bar */}
      <section
        style={{
          background: COLORS.grayLight,
          padding: '24px 0',
          borderBottom: `1px solid ${COLORS.grayMedium}`,
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
            }}
          >
            {trustFeatures.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                <div>
                  <div style={{ fontWeight: '600', color: COLORS.dark, fontSize: '14px' }}>
                    {feature.title}
                  </div>
                  <div style={{ color: COLORS.gray, fontSize: '12px' }}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 0', background: COLORS.white }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: COLORS.dark,
                marginBottom: '12px',
              }}
            >
              Shop by Category
            </h2>
            <p style={{ color: COLORS.gray, fontSize: '16px' }}>
              Find the best deals in your favorite categories
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '20px',
            }}
          >
            {categoryData.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '32px 20px',
                  background: COLORS.grayLight,
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${COLORS.grayMedium}`,
                }}
              >
                <span style={{ fontSize: '48px', marginBottom: '12px' }}>{cat.icon}</span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: COLORS.dark,
                    marginBottom: '4px',
                  }}
                >
                  {cat.name}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: cat.color,
                    fontWeight: '600',
                  }}
                >
                  {cat.discount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '80px 0', background: COLORS.grayLight }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: COLORS.dark,
                  marginBottom: '8px',
                }}
              >
                🔥 Hot Deals
              </h2>
              <p style={{ color: COLORS.gray, fontSize: '16px', margin: 0 }}>
                Don&apos;t miss these amazing offers
              </p>
            </div>
            <Link
              href="/deals"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: COLORS.gradient,
                color: COLORS.white,
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '10px',
                textDecoration: 'none',
              }}
            >
              View All Deals →
            </Link>
          </div>

          {products.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: COLORS.white,
                borderRadius: '16px',
              }}
            >
              <p style={{ color: COLORS.gray, fontSize: '16px' }}>
                No products available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: '80px 0',
          background: COLORS.gradient,
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: COLORS.white,
              marginBottom: '16px',
            }}
          >
            Ready to Save Big?
          </h2>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '18px',
              marginBottom: '32px',
              maxWidth: '500px',
              margin: '0 auto 32px',
            }}
          >
            Join thousands of smart students who save money every day with our curated deals.
          </p>
          <Link
            href="/deals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: COLORS.white,
              color: COLORS.primary,
              fontSize: '16px',
              fontWeight: '700',
              borderRadius: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            Browse All Deals →
          </Link>
        </div>
      </section>
    </div>
  );
}
