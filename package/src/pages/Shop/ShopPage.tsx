import { useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../../components/AffiliateProductCard';
import { CATEGORIES } from '../../constant/categories';
import { AffiliateProduct } from '../../constant/affiliateData';
import { useProducts } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

// Professional color scheme
const COLORS = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  primaryDark: '#1D4ED8',
  secondary: '#10B981',
  secondaryLight: '#ECFDF5',
  accent: '#F59E0B',
  accentLight: '#FFFBEB',
  dark: '#111827',
  gray: '#6B7280',
  grayLight: '#9CA3AF',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const { products: supabaseProducts, loading, error } = useProducts();
  
  const categoryNameToId: Record<string, string> = {
    'laptops': '1', 'laptop': '1', 'mobiles': '2', 'mobile': '2', 'phones': '2',
    'appliances': '3', 'home-appliances': '3', 'laundry': '4', 'headphones': '5',
    'audio': '5', 'furniture': '6', 'entertainment': '7', 'electronics': '7', 'other': '7',
  };
  
  const allProducts: AffiliateProduct[] = supabaseProducts.length > 0 
    ? supabaseProducts.map(p => {
        let categoryId = p.category || 'misc';
        if (categoryId && isNaN(Number(categoryId))) {
          categoryId = categoryNameToId[categoryId.toLowerCase()] || '7';
        }
        const category = CATEGORIES.find(c => c.id === categoryId);
        return {
          id: p.id,
          name: p.title,
          slug: p.slug,
          categoryId: categoryId,
          images: [p.image_url || IMAGES.headphoneThumbnail],
          affiliateUrl: p.affiliate_link,
          shortDescription: `Great deal on ${p.title}!`,
          fullDescription: `Don't miss this incredible discount!`,
          pros: ['Big savings'],
          cons: [],
          buttonText: 'Get Deal',
          metaTitle: p.title,
          metaDescription: `Student deal`,
          status: 'active' as const,
          createdAt: p.created_at || new Date().toISOString(),
          updatedAt: p.created_at || new Date().toISOString(),
          category: category,
          mrp: p.mrp || p.original_price || p.price,
          discountedPrice: p.discounted_price || p.sale_price || p.price,
        };
      })
    : [];
  
  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: 'under5k', label: 'Under ₹5,000', min: 0, max: 5000 },
    { id: '5k-15k', label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { id: '15k-30k', label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
    { id: 'above50k', label: 'Above ₹50,000', min: 50000, max: Infinity },
  ];

  let filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.categoryId === selectedCategory);
  
  if (priceRange !== 'all') {
    const range = priceRanges.find(r => r.id === priceRange);
    if (range) {
      filteredProducts = filteredProducts.filter(p => {
        const price = p.discountedPrice || p.mrp || 0;
        return price >= range.min && price < range.max;
      });
    }
  }

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.discountedPrice || 0) - (b.discountedPrice || 0));
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.discountedPrice || 0) - (a.discountedPrice || 0));
  }

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (priceRange !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('newest');
  };

  return (
    <div className="page-content" style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section style={{ 
        background: COLORS.gradient,
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ 
                  color: 'rgba(255,255,255,0.8)', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ 
                color: COLORS.white, 
                fontSize: '14px', 
                fontWeight: '600' 
              }}>
                All Deals
              </li>
            </ol>
          </nav>
          
          <h1 style={{ 
            color: COLORS.white, 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Discover Amazing Deals
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: '18px', 
            marginBottom: '0', 
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Premium products at unbeatable prices. Shop smart, save big with exclusive student discounts up to <span style={{ 
              fontWeight: '700',
              background: 'rgba(255,255,255,0.2)',
              padding: '2px 10px',
              borderRadius: '4px'
            }}>80% OFF</span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '40px 0 80px', background: COLORS.lightBg }}>
        <div className="container">
          <div className="row" style={{ gap: '0' }}>
            
            {/* Desktop Sidebar Filters */}
            <div className="col-lg-3 d-none d-lg-block">
              <div style={{ 
                background: COLORS.white, 
                borderRadius: '16px', 
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                border: `1px solid ${COLORS.border}`,
                position: 'sticky', 
                top: '100px' 
              }}>
                {/* Filter Header */}
                <div className="d-flex justify-content-between align-items-center" style={{ 
                  marginBottom: '24px', 
                  paddingBottom: '16px', 
                  borderBottom: `1px solid ${COLORS.border}` 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: COLORS.primaryLight,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                      </svg>
                    </div>
                    <h6 style={{ margin: 0, fontWeight: '700', fontSize: '16px', color: COLORS.dark }}>Filters</h6>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button 
                      onClick={clearAllFilters} 
                      style={{ 
                        background: COLORS.primary,
                        border: 'none',
                        color: COLORS.white, 
                        fontSize: '12px', 
                        cursor: 'pointer', 
                        fontWeight: '600', 
                        padding: '6px 14px', 
                        borderRadius: '8px',
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Categories Filter */}
                <div style={{ marginBottom: '28px' }}>
                  <h6 style={{ 
                    fontWeight: '600', 
                    marginBottom: '14px', 
                    color: COLORS.dark, 
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Categories</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        padding: '12px 14px', 
                        borderRadius: '10px', 
                        cursor: 'pointer', 
                        background: selectedCategory === 'all' ? COLORS.primaryLight : 'transparent',
                        border: selectedCategory === 'all' ? `1px solid ${COLORS.primary}20` : '1px solid transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'all'} 
                        onChange={() => setSelectedCategory('all')} 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          accentColor: COLORS.primary 
                        }} 
                      />
                      <span style={{ 
                        flex: 1, 
                        fontSize: '14px', 
                        fontWeight: selectedCategory === 'all' ? '600' : '500', 
                        color: selectedCategory === 'all' ? COLORS.primary : COLORS.gray 
                      }}>All Categories</span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: COLORS.white, 
                        background: COLORS.secondary, 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontWeight: '600' 
                      }}>{allProducts.length}</span>
                    </label>
                    {CATEGORIES.map((cat) => {
                      const count = allProducts.filter(p => p.categoryId === cat.id).length;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <label 
                          key={cat.id} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '12px 14px', 
                            borderRadius: '10px', 
                            cursor: 'pointer', 
                            background: isSelected ? COLORS.primaryLight : 'transparent',
                            border: isSelected ? `1px solid ${COLORS.primary}20` : '1px solid transparent',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="category" 
                            checked={isSelected} 
                            onChange={() => setSelectedCategory(cat.id)} 
                            style={{ 
                              width: '18px', 
                              height: '18px', 
                              accentColor: COLORS.primary 
                            }} 
                          />
                          <span style={{ 
                            flex: 1, 
                            fontSize: '14px', 
                            fontWeight: isSelected ? '600' : '500', 
                            color: isSelected ? COLORS.primary : COLORS.gray 
                          }}>{cat.name}</span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: count > 0 ? COLORS.secondary : COLORS.grayLight, 
                            background: count > 0 ? COLORS.secondaryLight : COLORS.lightBg, 
                            padding: '4px 10px', 
                            borderRadius: '6px', 
                            fontWeight: '600' 
                          }}>{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div style={{ marginBottom: '28px' }}>
                  <h6 style={{ 
                    fontWeight: '600', 
                    marginBottom: '14px', 
                    color: COLORS.dark, 
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Price Range</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {priceRanges.map((range) => {
                      const isSelected = priceRange === range.id;
                      return (
                        <label 
                          key={range.id} 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '12px 14px', 
                            borderRadius: '10px', 
                            cursor: 'pointer', 
                            background: isSelected ? COLORS.secondaryLight : 'transparent',
                            border: isSelected ? `1px solid ${COLORS.secondary}20` : '1px solid transparent',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="price" 
                            checked={isSelected} 
                            onChange={() => setPriceRange(range.id)} 
                            style={{ 
                              width: '18px', 
                              height: '18px', 
                              accentColor: COLORS.secondary 
                            }} 
                          />
                          <span style={{ 
                            fontSize: '14px', 
                            fontWeight: isSelected ? '600' : '500', 
                            color: isSelected ? COLORS.secondary : COLORS.gray 
                          }}>{range.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h6 style={{ 
                    fontWeight: '600', 
                    marginBottom: '14px', 
                    color: COLORS.dark, 
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>Sort By</h6>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    style={{ 
                      width: '100%', 
                      padding: '14px 16px', 
                      borderRadius: '10px', 
                      border: `1px solid ${COLORS.border}`, 
                      fontSize: '14px', 
                      fontWeight: '500',
                      cursor: 'pointer', 
                      outline: 'none', 
                      background: COLORS.white, 
                      color: COLORS.dark,
                      transition: 'all 0.2s ease',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236B7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = COLORS.primary}
                    onBlur={(e) => e.currentTarget.style.borderColor = COLORS.border}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="col-12 d-lg-none" style={{ marginBottom: '20px' }}>
              <div style={{ 
                background: COLORS.white, 
                borderRadius: '12px', 
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                border: `1px solid ${COLORS.border}`
              }}>
                <div className="d-flex gap-3 align-items-center">
                  <button 
                    onClick={() => setShowFilters(!showFilters)} 
                    style={{ 
                      padding: '12px 20px', 
                      borderRadius: '10px', 
                      border: showFilters ? 'none' : `1px solid ${COLORS.border}`,
                      background: showFilters ? COLORS.primary : COLORS.white, 
                      color: showFilters ? COLORS.white : COLORS.dark, 
                      fontWeight: '600', 
                      fontSize: '14px', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    Filters 
                    {activeFiltersCount > 0 && (
                      <span style={{ 
                        background: showFilters ? COLORS.white : COLORS.primary, 
                        color: showFilters ? COLORS.primary : COLORS.white, 
                        borderRadius: '50%', 
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>{activeFiltersCount}</span>
                    )}
                  </button>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    style={{ 
                      padding: '12px 16px', 
                      borderRadius: '10px', 
                      border: `1px solid ${COLORS.border}`, 
                      fontSize: '14px', 
                      fontWeight: '500',
                      cursor: 'pointer', 
                      flex: 1, 
                      background: COLORS.white, 
                      color: COLORS.dark 
                    }}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price ↑</option>
                    <option value="price-high">Price ↓</option>
                  </select>
                </div>
                
                {showFilters && (
                  <div style={{ 
                    marginTop: '20px', 
                    paddingTop: '20px', 
                    borderTop: `1px solid ${COLORS.border}` 
                  }}>
                    {/* Mobile Categories */}
                    <div style={{ marginBottom: '20px' }}>
                      <h6 style={{ 
                        fontWeight: '600', 
                        marginBottom: '12px', 
                        fontSize: '13px', 
                        color: COLORS.dark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Category</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button 
                          onClick={() => setSelectedCategory('all')} 
                          style={{ 
                            padding: '10px 16px', 
                            borderRadius: '8px', 
                            border: selectedCategory === 'all' ? 'none' : `1px solid ${COLORS.border}`,
                            background: selectedCategory === 'all' ? COLORS.primary : COLORS.white, 
                            color: selectedCategory === 'all' ? COLORS.white : COLORS.gray, 
                            fontSize: '13px', 
                            fontWeight: '600', 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          All ({allProducts.length})
                        </button>
                        {CATEGORIES.map(cat => {
                          const isSelected = selectedCategory === cat.id;
                          return (
                            <button 
                              key={cat.id} 
                              onClick={() => setSelectedCategory(cat.id)} 
                              style={{ 
                                padding: '10px 16px', 
                                borderRadius: '8px', 
                                border: isSelected ? 'none' : `1px solid ${COLORS.border}`,
                                background: isSelected ? COLORS.primary : COLORS.white, 
                                color: isSelected ? COLORS.white : COLORS.gray, 
                                fontSize: '13px', 
                                fontWeight: '600', 
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {cat.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobile Price Range */}
                    <div style={{ marginBottom: '20px' }}>
                      <h6 style={{ 
                        fontWeight: '600', 
                        marginBottom: '12px', 
                        fontSize: '13px', 
                        color: COLORS.dark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>Price Range</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {priceRanges.map(range => {
                          const isSelected = priceRange === range.id;
                          return (
                            <button 
                              key={range.id} 
                              onClick={() => setPriceRange(range.id)} 
                              style={{ 
                                padding: '10px 16px', 
                                borderRadius: '8px', 
                                border: isSelected ? 'none' : `1px solid ${COLORS.border}`,
                                background: isSelected ? COLORS.secondary : COLORS.white, 
                                color: isSelected ? COLORS.white : COLORS.gray, 
                                fontSize: '13px', 
                                fontWeight: '600', 
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {range.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {activeFiltersCount > 0 && (
                      <button 
                        onClick={clearAllFilters} 
                        style={{ 
                          width: '100%', 
                          padding: '14px', 
                          borderRadius: '10px', 
                          border: `1px solid ${COLORS.primary}`,
                          background: COLORS.white, 
                          color: COLORS.primary, 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9">
              {/* Results Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '24px',
                background: COLORS.white,
                padding: '16px 20px',
                borderRadius: '12px',
                border: `1px solid ${COLORS.border}`
              }}>
                <p style={{ color: COLORS.gray, fontSize: '14px', margin: 0 }}>
                  Showing <span style={{ color: COLORS.dark, fontWeight: '700' }}>{filteredProducts.length}</span> products
                </p>
                {activeFiltersCount > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ 
                      fontSize: '13px', 
                      color: COLORS.primary, 
                      background: COLORS.primaryLight,
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: '600'
                    }}>
                      {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                    </span>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px', 
                  background: COLORS.white, 
                  borderRadius: '16px',
                  border: `1px solid ${COLORS.border}`
                }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '16px', 
                    padding: '20px 40px', 
                    background: COLORS.lightBg, 
                    borderRadius: '12px' 
                  }}>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      border: `3px solid ${COLORS.border}`, 
                      borderTopColor: COLORS.primary, 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }}></div>
                    <span style={{ color: COLORS.dark, fontWeight: '600', fontSize: '15px' }}>Loading products...</span>
                  </div>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px', 
                  background: COLORS.white, 
                  borderRadius: '16px',
                  border: `1px solid ${COLORS.border}`
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: '#FEE2E2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <h5 style={{ color: COLORS.dark, marginBottom: '8px', fontWeight: '700', fontSize: '18px' }}>Failed to load products</h5>
                  <p style={{ color: COLORS.gray, marginBottom: '24px', fontSize: '15px' }}>Something went wrong. Please try again.</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    style={{ 
                      background: COLORS.primary, 
                      color: COLORS.white, 
                      border: 'none', 
                      padding: '14px 32px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && filteredProducts.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px', 
                  background: COLORS.white, 
                  borderRadius: '16px',
                  border: `1px solid ${COLORS.border}`
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: COLORS.primaryLight,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  <h5 style={{ color: COLORS.dark, marginBottom: '8px', fontWeight: '700', fontSize: '20px' }}>No products found</h5>
                  <p style={{ color: COLORS.gray, marginBottom: '28px', fontSize: '15px', maxWidth: '300px', margin: '0 auto 28px' }}>
                    Try adjusting your filters to find what you're looking for
                  </p>
                  <button 
                    onClick={clearAllFilters} 
                    style={{ 
                      background: COLORS.primary, 
                      color: COLORS.white, 
                      border: 'none', 
                      padding: '14px 32px', 
                      borderRadius: '10px', 
                      fontWeight: '600', 
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {!loading && !error && filteredProducts.length > 0 && (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-xl-4 col-lg-4 col-md-6 col-6">
                      <AffiliateProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}