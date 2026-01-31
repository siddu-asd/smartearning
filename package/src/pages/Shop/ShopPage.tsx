import { useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../../components/AffiliateProductCard';
import { CATEGORIES } from '../../constant/categories';
import { AffiliateProduct } from '../../constant/affiliateData';
import { useProducts } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Shop Page - Main product catalog
 * Displays all affiliate products with category filters
 * Fetches products from Supabase database
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
        // Handle both old text categories and new ID-based categories
        let categoryId = p.category || 'misc';
        
        // If category is a text name (not a number), convert to ID
        if (categoryId && isNaN(Number(categoryId))) {
          categoryId = categoryNameToId[categoryId.toLowerCase()] || '7';
        }
        
        const category = CATEGORIES.find(c => c.id === categoryId);
        
        // Handle different possible field names for prices
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

  // Filter products by category and price
  let filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.categoryId === selectedCategory);
  
  // Apply price filter
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

  // Count active filters
  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (priceRange !== 'all' ? 1 : 0);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('newest');
  };

  return (
    <div className="page-content" style={{ background: '#FAFAFA', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '50px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>Home</Link></li>
              <li className="breadcrumb-item active" style={{ color: '#fff' }}>Deals</li>
            </ol>
          </nav>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '10px' }}>
            Hot Deals for Students
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: 0 }}>
            Discover amazing discounts on laptops, mobiles & more
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '30px 0 60px' }}>
        <div className="container">
          <div className="row">
            
            {/* Sidebar Filters - Desktop */}
            <div className="col-lg-3 col-md-4 d-none d-md-block">
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                marginBottom: '20px'
              }}>
                <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: '1px solid #eee' }}>
                  <h6 style={{ margin: 0, fontWeight: '700', fontSize: '15px' }}>Filters</h6>
                  {activeFiltersCount > 0 && (
                    <button 
                      onClick={clearAllFilters}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#667eea',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div style={{ marginBottom: '20px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '12px', color: '#333', fontSize: '14px' }}>Categories</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedCategory === 'all' ? '#667eea10' : 'transparent',
                      transition: 'background 0.2s'
                    }}>
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === 'all'}
                        onChange={() => setSelectedCategory('all')}
                        style={{ accentColor: '#667eea' }}
                      />
                      <span style={{ flex: 1, fontSize: '14px', fontWeight: selectedCategory === 'all' ? '600' : '400' }}>
                        All Deals
                      </span>
                      <span style={{ fontSize: '12px', color: '#888' }}>{allProducts.length}</span>
                    </label>
                    
                    {CATEGORIES.map((cat) => {
                      const count = allProducts.filter(p => p.categoryId === cat.id).length;
                      return (
                        <label key={cat.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px', 
                          padding: '8px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: selectedCategory === cat.id ? '#667eea10' : 'transparent',
                          transition: 'background 0.2s'
                        }}>
                          <input 
                            type="radio" 
                            name="category" 
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(cat.id)}
                            style={{ accentColor: '#667eea' }}
                          />
                          <span style={{ flex: 1, fontSize: '14px', fontWeight: selectedCategory === cat.id ? '600' : '400' }}>
                            {cat.name}
                          </span>
                          <span style={{ fontSize: '12px', color: '#888' }}>{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div style={{ marginBottom: '20px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '12px', color: '#333', fontSize: '14px' }}>Price Range</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {priceRanges.map((range) => (
                      <label key={range.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px', 
                        padding: '8px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: priceRange === range.id ? '#667eea10' : 'transparent',
                        transition: 'background 0.2s'
                      }}>
                        <input 
                          type="radio" 
                          name="price" 
                          checked={priceRange === range.id}
                          onChange={() => setPriceRange(range.id)}
                          style={{ accentColor: '#667eea' }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: priceRange === range.id ? '600' : '400' }}>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h6 style={{ fontWeight: '600', marginBottom: '12px', color: '#333', fontSize: '14px' }}>Sort By</h6>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: 'none',
                      background: '#fff'
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
            <div className="col-12 d-md-none mb-3">
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '12px 15px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <div className="d-flex gap-2 align-items-center">
                  {/* Filter Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      background: showFilters ? '#667eea' : '#fff',
                      color: showFilters ? '#fff' : '#333',
                      fontWeight: '500',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="4" y1="6" x2="20" y2="6"></line>
                      <line x1="4" y1="12" x2="16" y2="12"></line>
                      <line x1="4" y1="18" x2="12" y2="18"></line>
                    </svg>
                    Filters
                    {activeFiltersCount > 0 && (
                      <span style={{
                        background: showFilters ? '#fff' : '#667eea',
                        color: showFilters ? '#667eea' : '#fff',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600'
                      }}>{activeFiltersCount}</span>
                    )}
                  </button>

                  {/* Sort Dropdown */}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: 'none',
                      flex: 1,
                      background: '#fff'
                    }}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low-High</option>
                    <option value="price-high">Price: High-Low</option>
                    <option value="discount">Best Discount</option>
                  </select>
                </div>

                {/* Mobile Filter Panel */}
                {showFilters && (
                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                    {/* Category */}
                    <div style={{ marginBottom: '15px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '13px', color: '#555' }}>Category</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button
                          onClick={() => setSelectedCategory('all')}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '20px',
                            border: selectedCategory === 'all' ? 'none' : '1px solid #ddd',
                            background: selectedCategory === 'all' ? '#667eea' : '#fff',
                            color: selectedCategory === 'all' ? '#fff' : '#333',
                            fontSize: '13px',
                            fontWeight: '500',
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
                                padding: '8px 14px',
                                borderRadius: '20px',
                                border: selectedCategory === cat.id ? 'none' : '1px solid #ddd',
                                background: selectedCategory === cat.id ? '#667eea' : '#fff',
                                color: selectedCategory === cat.id ? '#fff' : '#333',
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
                    <div style={{ marginBottom: '15px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '13px', color: '#555' }}>Price</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {priceRanges.map((range) => (
                          <button
                            key={range.id}
                            onClick={() => setPriceRange(range.id)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: '20px',
                              border: priceRange === range.id ? 'none' : '1px solid #ddd',
                              background: priceRange === range.id ? '#667eea' : '#fff',
                              color: priceRange === range.id ? '#fff' : '#333',
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
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          background: '#fff',
                          color: '#666',
                          fontSize: '13px',
                          fontWeight: '500',
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
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3" style={{
                background: '#fff',
                padding: '12px 16px',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}>
                <div>
                  <span style={{ fontWeight: '600', fontSize: '15px', color: '#333' }}>
                    {loading ? 'Loading...' : `${filteredProducts.length} deals`}
                  </span>
                  {(selectedCategory !== 'all' || priceRange !== 'all') && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {selectedCategory !== 'all' && (
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: '#667eea15',
                          color: '#667eea',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                        </span>
                      )}
                      {priceRange !== 'all' && (
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: '#667eea15',
                          color: '#667eea',
                          fontSize: '12px',
                          fontWeight: '500'
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
                  padding: '60px 20px',
                  background: '#fff',
                  borderRadius: '12px'
                }}>
                  <div className="spinner-border" style={{ color: '#667eea', width: '40px', height: '40px' }} role="status"></div>
                  <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>Loading deals...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '50px 20px',
                  background: '#FFF3CD',
                  borderRadius: '12px',
                  border: '1px solid #FFE69C'
                }}>
                  <h6 style={{ marginTop: '10px' }}>Something went wrong</h6>
                  <p style={{ color: '#666', fontSize: '14px' }}>Could not load deals. Please try again.</p>
                </div>
              )}

              {/* Product Grid */}
              {!loading && filteredProducts.length > 0 && (
                <div className="row g-3">
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
                  padding: '60px 20px',
                  background: '#fff',
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
                  <h5>No deals found</h5>
                  <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>Try adjusting your filters</p>
                  <button 
                    onClick={clearAllFilters}
                    style={{
                      padding: '10px 25px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#667eea',
                      color: '#fff',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#1a1a2e', padding: '40px 0' }}>
        <div className="container text-center">
          <h5 style={{ color: '#fff', marginBottom: '10px', fontWeight: '600' }}>Can't find what you're looking for?</h5>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px', fontSize: '14px' }}>
            Contact us and we'll help you find the best deal!
          </p>
          <Link to="/contact" style={{
            padding: '12px 30px',
            borderRadius: '8px',
            background: '#667eea',
            color: '#fff',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '14px'
          }}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
