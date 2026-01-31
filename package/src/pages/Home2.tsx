import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMAGES } from "../constant/theme";
import { useProducts } from "../hooks/useSupabase";
import AffiliateProductCard from "../components/AffiliateProductCard";
import { AffiliateProduct } from "../constant/affiliateData";

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
  { name: 'Laptops', discount: 'Up to 40% OFF', image: IMAGES.laptopSaleCategory, link: '/deals/laptop-deals', color: COLORS.primary },
  { name: 'Mobiles', discount: 'Up to 50% OFF', image: IMAGES.mobileDealsCategory, link: '/deals/mobile-deals', color: COLORS.secondary },
  { name: 'Headphones', discount: 'Up to 60% OFF', image: IMAGES.headphoneThumbnail, link: '/deals/audio-headphones', color: COLORS.accent },
  { name: 'Appliances', discount: 'Up to 45% OFF', image: IMAGES.homeAppliancesCategory, link: '/deals/home-appliances', color: '#8B5CF6' },
  { name: 'Furniture', discount: 'Up to 35% OFF', image: IMAGES.officeChairThumbnail, link: '/deals/study-furniture', color: '#EC4899' },
  { name: 'TVs & More', discount: 'Up to 55% OFF', image: IMAGES.tvThumbnail, link: '/deals/entertainment', color: '#06B6D4' },
];

// Trust features
const trustFeatures = [
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₹499' },
  { icon: '🔒', title: 'Secure Payment', desc: '100% protected' },
  { icon: '💯', title: 'Verified Deals', desc: 'Authentic products' },
  { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
];

// Why choose us data
const whyChooseUs = [
  { 
    icon: '💰', 
    title: 'Best Prices Guaranteed', 
    desc: 'We compare prices across all major retailers to bring you the absolute best deals. Save up to 70% on your favorite products.' 
  },
  { 
    icon: '✅', 
    title: 'Verified & Trusted', 
    desc: 'Every deal is manually verified by our team. We only list authentic products from trusted sellers and brands.' 
  },
  { 
    icon: '🎯', 
    title: 'Student-Focused', 
    desc: 'Curated deals specifically for students. From laptops to dorm essentials, we focus on what you actually need.' 
  },
  { 
    icon: '⚡', 
    title: 'Real-Time Updates', 
    desc: 'Our deals are updated in real-time. Never miss a flash sale or limited-time offer again.' 
  },
];

const Home2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { products, loading } = useProducts();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Convert Supabase products to AffiliateProduct format
  const formatProductsForCard = (): AffiliateProduct[] => {
    return products.slice(0, 8).map(product => ({
      id: product.id,
      name: product.title,
      slug: product.slug,
      categoryId: product.category || '1',
      images: [product.image_url || IMAGES.headphoneThumbnail],
      affiliateUrl: product.affiliate_link,
      shortDescription: `Great deal on ${product.title}!`,
      fullDescription: '',
      pros: ['Best Price'],
      cons: [],
      buttonText: 'Get Deal',
      metaTitle: product.title,
      metaDescription: '',
      status: 'active' as const,
      createdAt: product.created_at || new Date().toISOString(),
      updatedAt: product.created_at || new Date().toISOString(),
      mrp: product.mrp || product.original_price || product.price,
      discountedPrice: product.discounted_price || product.sale_price || product.price,
    }));
  };

  return (
    <div style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: COLORS.gradient,
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease',
              }}>
                <span style={{
                  display: 'inline-block',
                  background: 'rgba(255,255,255,0.2)',
                  color: COLORS.white,
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '24px',
                  backdropFilter: 'blur(10px)',
                }}>
                  🔥 Exclusive Student Deals
                </span>
                
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  color: COLORS.white,
                  lineHeight: '1.1',
                  marginBottom: '24px',
                }}>
                  Smart Savings for
                  <br />
                  <span style={{
                    background: 'linear-gradient(90deg, #FEF3C7 0%, #FDE68A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Smart Students
                  </span>
                </h1>
                
                <p style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: '1.7',
                  marginBottom: '32px',
                  maxWidth: '500px',
                }}>
                  Discover handpicked deals on laptops, gadgets, and essentials. 
                  Save up to 70% on top brands with our verified affiliate offers.
                </p>
                
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link 
                    to="/shop"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: COLORS.white,
                      color: COLORS.primary,
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '16px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                    }}
                  >
                    Shop Now
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                  
                  <Link 
                    to="/deals"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'transparent',
                      color: COLORS.white,
                      padding: '16px 32px',
                      borderRadius: '12px',
                      fontWeight: '600',
                      fontSize: '16px',
                      textDecoration: 'none',
                      border: '2px solid rgba(255,255,255,0.4)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                    }}
                  >
                    View All Deals
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.8s ease 0.2s',
                textAlign: 'center',
              }}>
                <img 
                  src={IMAGES.HeroSectionImage}
                  alt="Hero"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.3))',
                    borderRadius: '24px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features Bar */}
      <section style={{
        background: COLORS.white,
        padding: '0',
        marginTop: '-50px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div className="container">
          <div style={{
            background: COLORS.white,
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            padding: '32px 24px',
          }}>
            <div className="row">
              {trustFeatures.map((feature, index) => (
                <div 
                  className="col-lg-3 col-md-6 col-6 mb-3 mb-lg-0" 
                  key={index}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${index * 0.1 + 0.3}s`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '8px',
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      background: COLORS.gradientSubtle,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}>
                      {feature.icon}
                    </div>
                    <div>
                      <h6 style={{
                        margin: 0,
                        fontWeight: '700',
                        fontSize: '15px',
                        color: COLORS.dark,
                        marginBottom: '4px',
                      }}>
                        {feature.title}
                      </h6>
                      <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: COLORS.gray,
                      }}>
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section style={{ padding: '80px 0', background: COLORS.white }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              display: 'inline-block',
              background: COLORS.primaryLight,
              color: COLORS.primary,
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Browse Categories
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '800',
              color: COLORS.dark,
              marginBottom: '16px',
            }}>
              Shop by Category
            </h2>
            <p style={{
              fontSize: '16px',
              color: COLORS.gray,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Explore our curated collection of deals across popular categories
            </p>
          </div>

          <div className="row g-4">
            {categoryData.map((category, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <Link 
                  to={category.link}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    background: COLORS.grayLight,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.4s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    padding: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '180px',
                  }}>
                    <div>
                      <span style={{
                        display: 'inline-block',
                        background: category.color,
                        color: COLORS.white,
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        marginBottom: '12px',
                      }}>
                        {category.discount}
                      </span>
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        color: COLORS.dark,
                        margin: 0,
                      }}>
                        {category.name}
                      </h3>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: category.color,
                        fontSize: '14px',
                        fontWeight: '600',
                        marginTop: '12px',
                      }}>
                        Shop Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <img 
                        src={category.image}
                        alt={category.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ 
        padding: '80px 0', 
        background: COLORS.gradientSubtle,
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div>
              <span style={{
                display: 'inline-block',
                background: COLORS.secondaryLight,
                color: COLORS.secondary,
                padding: '8px 20px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Hot Deals
              </span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: '800',
                color: COLORS.dark,
                margin: 0,
              }}>
                Trending Products
              </h2>
            </div>
            <Link 
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: COLORS.white,
                color: COLORS.primary,
                padding: '14px 28px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.primary;
                e.currentTarget.style.color = COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.white;
                e.currentTarget.style.color = COLORS.primary;
              }}
            >
              View All
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '300px',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: `4px solid ${COLORS.grayLight}`,
                borderTopColor: COLORS.primary,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : products.length > 0 ? (
            <div className="row g-4">
              {formatProductsForCard().map((product, index) => (
                <div 
                  className="col-xl-3 col-lg-4 col-md-6" 
                  key={product.id}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                >
                  <AffiliateProductCard product={product} variant="grid" />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: COLORS.white,
              borderRadius: '20px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                color: COLORS.dark,
                marginBottom: '8px',
              }}>
                Products Coming Soon
              </h3>
              <p style={{ color: COLORS.gray, fontSize: '15px' }}>
                We're adding new deals every day. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '80px 0', background: COLORS.white }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              display: 'inline-block',
              background: COLORS.accentLight,
              color: COLORS.accent,
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              Why Us
            </span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '800',
              color: COLORS.dark,
              marginBottom: '16px',
            }}>
              Why Choose CrazyDeals?
            </h2>
            <p style={{
              fontSize: '16px',
              color: COLORS.gray,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              We're committed to helping students save money on the products they need most
            </p>
          </div>

          <div className="row g-4">
            {whyChooseUs.map((item, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div 
                  style={{
                    background: COLORS.white,
                    borderRadius: '20px',
                    padding: '32px 24px',
                    height: '100%',
                    border: `1px solid ${COLORS.grayMedium}`,
                    transition: 'all 0.4s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = COLORS.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = COLORS.grayMedium;
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: COLORS.gradientSubtle,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    marginBottom: '20px',
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: COLORS.dark,
                    marginBottom: '12px',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: COLORS.gray,
                    lineHeight: '1.7',
                    margin: 0,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 0',
        background: COLORS.gradient,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: COLORS.white,
              marginBottom: '20px',
              lineHeight: '1.2',
            }}>
              Ready to Start Saving?
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '36px',
              lineHeight: '1.7',
            }}>
              Join thousands of smart shoppers who save big on laptops, gadgets, 
              and essentials every day. New deals added hourly!
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <Link 
                to="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: COLORS.white,
                  color: COLORS.primary,
                  padding: '18px 36px',
                  borderRadius: '14px',
                  fontWeight: '700',
                  fontSize: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                }}
              >
                Browse All Deals
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              
              <Link 
                to="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'transparent',
                  color: COLORS.white,
                  padding: '18px 36px',
                  borderRadius: '14px',
                  fontWeight: '600',
                  fontSize: '16px',
                  textDecoration: 'none',
                  border: '2px solid rgba(255,255,255,0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                }}
              >
                Learn More
              </Link>
            </div>
            
            {/* Trust badges */}
            <div style={{
              marginTop: '48px',
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}>
              {[
                { number: '10K+', label: 'Happy Customers' },
                { number: '5K+', label: 'Products Listed' },
                { number: '₹2Cr+', label: 'Savings Delivered' },
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: COLORS.white,
                    marginBottom: '4px',
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home2;
