import { useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../../components/AffiliateProductCard';
import { CATEGORIES } from '../../constant/categories';
import { AffiliateProduct } from '../../constant/affiliateData';
import { useProducts } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Shop Page - Main product catalog with Ultra Modern Dark Theme
 * Stunning WOW design with animations and effects
 */
export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Fetch products from Supabase
  const { products: supabaseProducts, loading, error } = useProducts();
  
  // Map old category names to new IDs (for backward compatibility)
  const categoryNameToId: Record<string, string> = {
    'laptops': '1',
    'laptop': '1',
    'mobiles': '2',
    'mobile': '2',
    'phones': '2',
    'appliances': '3',
    'home-appliances': '3',
    'laundry': '4',
    'headphones': '5',
    'audio': '5',
    'furniture': '6',
    'entertainment': '7',
    'electronics': '7',
    'other': '7',
  };
  
  // Transform Supabase products to match component format
  const allProducts: AffiliateProduct[] = supabaseProducts.length > 0 
    ? supabaseProducts.map(p => {
        let categoryId = p.category || 'misc';
        if (categoryId && isNaN(Number(categoryId))) {
          categoryId = categoryNameToId[categoryId.toLowerCase()] || '7';
        }
        const category = CATEGORIES.find(c => c.id === categoryId);
        const mrpValue = p.mrp || p.original_price || p.price;
        const discountedValue = p.discounted_price || p.sale_price || p.price;
        
        return {
          id: p.id,
          name: p.title,
          slug: p.slug,
          categoryId: categoryId,
          images: [p.image_url || IMAGES.headphoneThumbnail],
          affiliateUrl: p.affiliate_link,
          shortDescription: `Great deal on ${p.title}!`,
          fullDescription: `Don't miss this incredible discount on ${p.title}. Limited time offer!`,
          pros: ['Big savings', 'Verified deal'],
          cons: [],
          buttonText: 'Get Deal',
          metaTitle: p.title,
          metaDescription: `Student deal on ${p.title}`,
          status: 'active' as const,
          createdAt: p.created_at || new Date().toISOString(),
          updatedAt: p.created_at || new Date().toISOString(),
          category: category,
          mrp: mrpValue,
          discountedPrice: discountedValue,
        };
      })
    : [];
  
  // Price ranges
  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: 'under5k', label: 'Under ₹5,000', min: 0, max: 5000 },
    { id: '5k-15k', label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { id: '15k-30k', label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
    { id: '30k-50k', label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
    { id: 'above50k', label: 'Above ₹50,000', min: 50000, max: Infinity },
  ];

  // Filter products
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

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.discountedPrice || 0) - (b.discountedPrice || 0));
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.discountedPrice || 0) - (a.discountedPrice || 0));
  } else if (sortBy === 'discount') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const discA = a.mrp && a.discountedPrice ? ((a.mrp - a.discountedPrice) / a.mrp) * 100 : 0;
      const discB = b.mrp && b.discountedPrice ? ((b.mrp - b.discountedPrice) / b.mrp) * 100 : 0;
      return discB - discA;
    });
  }

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (priceRange !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('newest');
  };

  return (
    <div className="page-content" style={{ 
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      minHeight: '100vh'
    }}>
      {/* Hero Banner - Stunning */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
        padding: '60px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: '#FFD700' }}>🔥 Hot Deals</li>
            </ol>
          </nav>
          
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 style={{ 
                color: '#fff', 
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                fontWeight: '800', 
                marginBottom: '15px',
                textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
              }}>
                🚀 <span style={{ 
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Student Crazy Deals</span>
              </h1>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '1.2rem', 
                marginBottom: '25px',
                maxWidth: '600px'
              }}>
                Discover amazing discounts on laptops, mobiles, appliances & more. 
                <span style={{ color: '#10b981', fontWeight: '600' }}> Save up to 80% </span> 
                on premium products!
              </p>
              
              {/* Stats */}
              <div className="d-flex flex-wrap gap-4">
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '15px 25px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    color: '#FFD700', 
                    fontSize: '1.8rem', 
                    fontWeight: '800',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                  }}>{allProducts.length}+</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Active Deals</div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '15px 25px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    color: '#10b981', 
                    fontSize: '1.8rem', 
                    fontWeight: '800',
                    textShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
                  }}>80%</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Max Savings</div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '15px 25px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    color: '#f43f5e', 
                    fontSize: '1.8rem', 
                    fontWeight: '800',
                    textShadow: '0 0 20px rgba(244, 63, 94, 0.5)'
                  }}>24/7</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Updated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="row">
            
            {/* Sidebar Filters - Desktop */}
            <div className="col-lg-3 col-md-4 d-none d-md-block">
              <div style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'sticky',
                top: '100px'
              }}>
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <h6 style={{ margin: 0, fontWeight: '700', fontSize: '16px', color: '#fff' }}>
                    🎯 Filters
                  </h6>
                  {activeFiltersCount > 0 && (
                    <button 
                      onClick={clearAllFilters}
                      style={{
                        background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        padding: '6px 14px',
                        borderRadius: '20px'
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div style={{ marginBottom: '24px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '14px', color: '#FFD700', fontSize: '14px' }}>
                    📦 Categories
                  </h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      padding: '10px 14px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: selectedCategory === 'all' 
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)' 
                        : 'rgba(255,255,255,0.05)',
                      border: selectedCategory === 'all' ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid transparent',
                      transition: 'all 0.3s ease'
                    }}>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'all'}
                        onChange={() => setSelectedCategory('all')}
                        style={{ accentColor: '#667eea' }}
                      />
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: selectedCategory === 'all' ? '600' : '400', color: '#fff' }}>
                        All Deals
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.2)',
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}>{allProducts.length}</span>
                    </label>
                    
                    {CATEGORIES.map((cat) => {
                      const count = allProducts.filter(p => p.categoryId === cat.id).length;
                      return (
                        <label key={cat.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px', 
                          padding: '10px 14px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          background: selectedCategory === cat.id 
                            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)' 
                            : 'rgba(255,255,255,0.05)',
                          border: selectedCategory === cat.id ? '1px solid rgba(102, 126, 234, 0.5)' : '1px solid transparent',
                          transition: 'all 0.3s ease'
                        }}>
                          <input 
                            type="radio" 
                            name="category" 
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(cat.id)}
                            style={{ accentColor: '#667eea' }}
                          />
                          <span style={{ flex: 1, fontSize: '14px', fontWeight: selectedCategory === cat.id ? '600' : '400', color: '#fff' }}>
                            {cat.name}
                          </span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: count > 0 ? '#10b981' : 'rgba(255,255,255,0.4)',
                            background: count > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
                            padding: '2px 8px',
                            borderRadius: '10px'
                          }}>{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div style={{ marginBottom: '24px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '14px', color: '#10b981', fontSize: '14px' }}>
                    💰 Price Range
                  </h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {priceRanges.map((range) => (
                      <label key={range.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        padding: '10px 14px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        background: priceRange === range.id 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.3) 100%)' 
                          : 'rgba(255,255,255,0.05)',
                        border: priceRange === range.id ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid transparent',
                        transition: 'all 0.3s ease'
                      }}>
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(range.id)}
                          style={{ accentColor: '#10b981' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: priceRange === range.id ? '600' : '400', color: '#fff' }}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h6 style={{ fontWeight: '600', marginBottom: '14px', color: '#f43f5e', fontSize: '14px' }}>
                    🔄 Sort By
                  </h6>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: 'none',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff'
                    }}
                  >
                    <option value="newest" style={{ background: '#1a1a2e' }}>Newest First</option>
                    <option value="price-low" style={{ background: '#1a1a2e' }}>Price: Low to High</option>
                    <option value="price-high" style={{ background: '#1a1a2e' }}>Price: High to Low</option>
                    <option value="discount" style={{ background: '#1a1a2e' }}>Biggest Discount</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Bar */}
            <div className="col-12 d-md-none mb-4">
              <div style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                borderRadius: '16px',
                padding: '14px 18px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      padding: '12px 18px',
                      borderRadius: '12px',
                      border: 'none',
                      background: showFilters 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    🎯 Filters
                    {activeFiltersCount > 0 && (
                      <span style={{
                        background: '#FFD700',
                        color: '#000',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700'
                      }}>{activeFiltersCount}</span>
                    )}
                  </button>

                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: 'none',
                      flex: 1,
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff'
                    }}
                  >
                    <option value="newest" style={{ background: '#1a1a2e' }}>Newest</option>
                    <option value="price-low" style={{ background: '#1a1a2e' }}>Price ↑</option>
                    <option value="price-high" style={{ background: '#1a1a2e' }}>Price ↓</option>
                    <option value="discount" style={{ background: '#1a1a2e' }}>Best Deal</option>
                  </select>
                </div>

                {/* Mobile Filter Panel */}
                {showFilters && (
                  <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    {/* Category */}
                    <div style={{ marginBottom: '18px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '13px', color: '#FFD700' }}>📦 Category</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedCategory('all')}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            background: selectedCategory === 'all' 
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                              : 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          All ({allProducts.length})
                        </button>
                        {CATEGORIES.map((cat) => {
                          const count = allProducts.filter(p => p.categoryId === cat.id).length;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              style={{
                                padding: '10px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                background: selectedCategory === cat.id 
                                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                  : 'rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '13px',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              {cat.name} ({count})
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ marginBottom: '18px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '12px', fontSize: '13px', color: '#10b981' }}>💰 Price</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {priceRanges.map((range) => (
                          <button
                            key={range.id}
                            onClick={() => setPriceRange(range.id)}
                            style={{
                              padding: '10px 16px',
                              borderRadius: '20px',
                              border: 'none',
                              background: priceRange === range.id 
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                : 'rgba(255,255,255,0.1)',
                              color: '#fff',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Clear */}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '12px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
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
            <div className="col-lg-9 col-md-8">
              {/* Results Header */}
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-4" style={{
                background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                padding: '16px 20px',
                borderRadius: '16px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div>
                  <span style={{ fontWeight: '700', fontSize: '16px', color: '#fff' }}>
                    {loading ? '⏳ Loading...' : `🔥 ${filteredProducts.length} deals found`}
                  </span>
                  {(selectedCategory !== 'all' || priceRange !== 'all') && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                      {selectedCategory !== 'all' && (
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: '1px solid rgba(102, 126, 234, 0.5)'
                        }}>
                          {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                        </span>
                      )}
                      {priceRange !== 'all' && (
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.3) 100%)',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '500',
                          border: '1px solid rgba(16, 185, 129, 0.5)'
                        }}>
                          {priceRanges.find(r => r.id === priceRange)?.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px',
                  background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid rgba(102, 126, 234, 0.3)',
                    borderTopColor: '#667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 20px'
                  }}></div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>Loading amazing deals...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  background: 'linear-gradient(145deg, rgba(244, 63, 94, 0.1) 0%, rgba(225, 29, 72, 0.1) 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(244, 63, 94, 0.3)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>😢</div>
                  <h6 style={{ color: '#fff', marginBottom: '10px' }}>Something went wrong</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Could not load deals. Please try again.</p>
                </div>
              )}

              {/* Product Grid */}
              {!loading && filteredProducts.length > 0 && (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-6">
                      <AffiliateProductCard product={product} variant="grid" />
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && !error && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 20px',
                  background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
                  <h5 style={{ color: '#fff', marginBottom: '10px' }}>No deals found</h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '25px', fontSize: '15px' }}>
                    Try adjusting your filters to see more deals
                  </p>
                  <button 
                    onClick={clearAllFilters}
                    style={{
                      padding: '14px 35px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '15px',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
        padding: '60px 0',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container text-center">
          <h4 style={{ 
            color: '#fff', 
            marginBottom: '15px', 
            fontWeight: '700',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)'
          }}>
            🤔 Can't find what you're looking for?
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '25px', fontSize: '16px' }}>
            Contact us and we'll help you find the best deal!
          </p>
          <Link to="/contact" style={{
            padding: '16px 40px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
            color: '#fff',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            boxShadow: '0 10px 30px rgba(244, 63, 94, 0.4)',
            transition: 'all 0.3s ease'
          }}>
            📧 Contact Us
          </Link>
        </div>
      </section>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
