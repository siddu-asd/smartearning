import { useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../../components/AffiliateProductCard';
import { CATEGORIES } from '../../constant/categories';
import { AffiliateProduct } from '../../constant/affiliateData';
import { useProducts } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Shop Page - Main product catalog
 * Clean, Professional Design - No Overlapping Elements
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
    <div className="page-content" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Hero Banner */}
      <section style={{ 
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '40px 0'
      }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: '#2563eb', fontSize: '14px', fontWeight: '500' }}>
                All Deals
              </li>
            </ol>
          </nav>
          
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 style={{ 
                color: '#111827', 
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                fontWeight: '800', 
                marginBottom: '12px'
              }}>
                🔥 Student Crazy Deals
              </h1>
              <p style={{ 
                color: '#6b7280', 
                fontSize: '16px', 
                marginBottom: '0',
                maxWidth: '550px'
              }}>
                Discover amazing discounts on laptops, mobiles, appliances & more. 
                Save up to <span style={{ color: '#16a34a', fontWeight: '600' }}>80%</span> on premium products!
              </p>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              <div className="d-flex justify-content-end gap-3">
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '800' }}>{allProducts.length}+</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Active Deals</div>
                </div>
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#2563eb', fontSize: '24px', fontWeight: '800' }}>80%</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>Max Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '30px 0 60px' }}>
        <div className="container">
          <div className="row">
            
            {/* Sidebar Filters - Desktop */}
            <div className="col-lg-3 d-none d-lg-block">
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid #e5e7eb',
                position: 'sticky',
                top: '100px'
              }}>
                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
                  <h6 style={{ margin: 0, fontWeight: '700', fontSize: '16px', color: '#111827' }}>
                    Filters
                  </h6>
                  {activeFiltersCount > 0 && (
                    <button 
                      onClick={clearAllFilters}
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        fontSize: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        padding: '6px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div style={{ marginBottom: '24px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '12px', color: '#374151', fontSize: '14px' }}>
                    Categories
                  </h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedCategory === 'all' ? '#eff6ff' : 'transparent',
                      border: selectedCategory === 'all' ? '1px solid #bfdbfe' : '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'all'}
                        onChange={() => setSelectedCategory('all')}
                        style={{ accentColor: '#2563eb' }}
                      />
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: selectedCategory === 'all' ? '600' : '400', color: '#374151' }}>
                        All Deals
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#16a34a',
                        background: '#f0fdf4',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontWeight: '600'
                      }}>{allProducts.length}</span>
                    </label>
                    
                    {CATEGORIES.map((cat) => {
                      const count = allProducts.filter(p => p.categoryId === cat.id).length;
                      return (
                        <label key={cat.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px', 
                          padding: '10px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: selectedCategory === cat.id ? '#eff6ff' : 'transparent',
                          border: selectedCategory === cat.id ? '1px solid #bfdbfe' : '1px solid transparent',
                          transition: 'all 0.2s ease'
                        }}>
                          <input 
                            type="radio" 
                            name="category" 
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(cat.id)}
                            style={{ accentColor: '#2563eb' }}
                          />
                          <span style={{ flex: 1, fontSize: '14px', fontWeight: selectedCategory === cat.id ? '600' : '400', color: '#374151' }}>
                            {cat.name}
                          </span>
                          <span style={{ 
                            fontSize: '12px', 
                            color: count > 0 ? '#16a34a' : '#9ca3af',
                            background: count > 0 ? '#f0fdf4' : '#f3f4f6',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            fontWeight: '500'
                          }}>{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div style={{ marginBottom: '24px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '12px', color: '#374151', fontSize: '14px' }}>
                    Price Range
                  </h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {priceRanges.map((range) => (
                      <label key={range.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: priceRange === range.id ? '#f0fdf4' : 'transparent',
                        border: priceRange === range.id ? '1px solid #bbf7d0' : '1px solid transparent',
                        transition: 'all 0.2s ease'
                      }}>
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(range.id)}
                          style={{ accentColor: '#16a34a' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: priceRange === range.id ? '600' : '400', color: '#374151' }}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h6 style={{ fontWeight: '600', marginBottom: '12px', color: '#374151', fontSize: '14px' }}>
                    Sort By
                  </h6>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: 'none',
                      background: '#ffffff',
                      color: '#374151'
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Biggest Discount</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Bar */}
            <div className="col-12 d-lg-none" style={{ marginBottom: '20px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid #e5e7eb'
              }}>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      background: showFilters ? '#2563eb' : '#ffffff',
                      color: showFilters ? '#ffffff' : '#374151',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Filters
                    {activeFiltersCount > 0 && (
                      <span style={{
                        background: showFilters ? '#ffffff' : '#2563eb',
                        color: showFilters ? '#2563eb' : '#ffffff',
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
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: 'none',
                      flex: 1,
                      background: '#ffffff',
                      color: '#374151'
                    }}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price ↑</option>
                    <option value="price-high">Price ↓</option>
                    <option value="discount">Best Deal</option>
                  </select>
                </div>

                {/* Mobile Filter Panel */}
                {showFilters && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                    {/* Category */}
                    <div style={{ marginBottom: '16px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '13px', color: '#374151' }}>Category</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedCategory('all')}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '6px',
                            border: selectedCategory === 'all' ? '1px solid #2563eb' : '1px solid #e5e7eb',
                            background: selectedCategory === 'all' ? '#eff6ff' : '#ffffff',
                            color: selectedCategory === 'all' ? '#2563eb' : '#6b7280',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          All ({allProducts.length})
                        </button>
                        {CATEGORIES.map(cat => {
                          const count = allProducts.filter(p => p.categoryId === cat.id).length;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              style={{
                                padding: '8px 14px',
                                borderRadius: '6px',
                                border: selectedCategory === cat.id ? '1px solid #2563eb' : '1px solid #e5e7eb',
                                background: selectedCategory === cat.id ? '#eff6ff' : '#ffffff',
                                color: selectedCategory === cat.id ? '#2563eb' : '#6b7280',
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

                    {/* Price Range */}
                    <div>
                      <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '13px', color: '#374151' }}>Price</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {priceRanges.map(range => (
                          <button
                            key={range.id}
                            onClick={() => setPriceRange(range.id)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: '6px',
                              border: priceRange === range.id ? '1px solid #16a34a' : '1px solid #e5e7eb',
                              background: priceRange === range.id ? '#f0fdf4' : '#ffffff',
                              color: priceRange === range.id ? '#16a34a' : '#6b7280',
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

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #fecaca',
                          background: '#fef2f2',
                          color: '#dc2626',
                          fontSize: '13px',
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
            <div className="col-lg-9">
              {/* Results Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  Showing <span style={{ color: '#111827', fontWeight: '600' }}>{filteredProducts.length}</span> deals
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 32px',
                    background: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid #e5e7eb',
                      borderTopColor: '#2563eb',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ color: '#6b7280', fontWeight: '500' }}>Loading deals...</span>
                  </div>
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #fecaca'
                }}>
                  <p style={{ color: '#dc2626', fontSize: '16px', marginBottom: '12px' }}>⚠️ Failed to load deals</p>
                  <button 
                    onClick={() => window.location.reload()}
                    style={{
                      background: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
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
                  padding: '60px 20px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <h5 style={{ color: '#111827', marginBottom: '8px', fontWeight: '600' }}>No deals found</h5>
                  <p style={{ color: '#6b7280', marginBottom: '20px' }}>Try adjusting your filters</p>
                  <button 
                    onClick={clearAllFilters}
                    style={{
                      background: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {!loading && !error && filteredProducts.length > 0 && (
                <div className="row g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
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
