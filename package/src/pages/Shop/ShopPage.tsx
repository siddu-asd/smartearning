import { useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateProductCard from '../../components/AffiliateProductCard';
import { CATEGORIES } from '../../constant/categories';
import { AffiliateProduct } from '../../constant/affiliateData';
import { useProducts } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

const MEESHO = {
  pink: '#F43397',
  pinkLight: '#FFF0F7',
  pinkDark: '#D91A7A',
  green: '#00AA4F',
  greenLight: '#E8F8EF',
  gray: '#666666',
  grayLight: '#F5F5F5',
  black: '#333333',
  white: '#FFFFFF',
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
    <div className="page-content" style={{ background: MEESHO.grayLight, minHeight: '100vh' }}>
      <section style={{ 
        background: `linear-gradient(135deg, ${MEESHO.pink} 0%, ${MEESHO.pinkDark} 100%)`,
        padding: '40px 0'
      }}>
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginBottom: '16px' }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: MEESHO.white, fontSize: '14px', fontWeight: '500' }}>
                All Deals
              </li>
            </ol>
          </nav>
          <h1 style={{ color: MEESHO.white, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '12px' }}>
            🛒 Student Crazy Deals
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '0', maxWidth: '550px' }}>
            Lowest prices on laptops, mobiles & more. Save up to <span style={{ fontWeight: '700' }}>80%</span>!
          </p>
        </div>
      </section>

      <section style={{ padding: '24px 0 60px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div style={{ background: MEESHO.white, borderRadius: '8px', padding: '20px', position: 'sticky', top: '100px' }}>
                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: `1px solid ${MEESHO.grayLight}` }}>
                  <h6 style={{ margin: 0, fontWeight: '600', fontSize: '15px', color: MEESHO.black }}>Filters</h6>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearAllFilters} style={{ background: MEESHO.pinkLight, border: 'none', color: MEESHO.pink, fontSize: '12px', cursor: 'pointer', fontWeight: '600', padding: '6px 12px', borderRadius: '4px' }}>
                      Clear All
                    </button>
                  )}
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '10px', color: MEESHO.black, fontSize: '13px' }}>Categories</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', background: selectedCategory === 'all' ? MEESHO.pinkLight : 'transparent' }}>
                      <input type="radio" name="category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} style={{ accentColor: MEESHO.pink }} />
                      <span style={{ flex: 1, fontSize: '13px', fontWeight: selectedCategory === 'all' ? '600' : '400', color: selectedCategory === 'all' ? MEESHO.pink : MEESHO.gray }}>All Deals</span>
                      <span style={{ fontSize: '11px', color: MEESHO.green, background: MEESHO.greenLight, padding: '2px 6px', borderRadius: '4px', fontWeight: '600' }}>{allProducts.length}</span>
                    </label>
                    {CATEGORIES.map((cat) => {
                      const count = allProducts.filter(p => p.categoryId === cat.id).length;
                      return (
                        <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', background: selectedCategory === cat.id ? MEESHO.pinkLight : 'transparent' }}>
                          <input type="radio" name="category" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} style={{ accentColor: MEESHO.pink }} />
                          <span style={{ flex: 1, fontSize: '13px', fontWeight: selectedCategory === cat.id ? '600' : '400', color: selectedCategory === cat.id ? MEESHO.pink : MEESHO.gray }}>{cat.name}</span>
                          <span style={{ fontSize: '11px', color: count > 0 ? MEESHO.green : '#9ca3af', background: count > 0 ? MEESHO.greenLight : '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontWeight: '500' }}>{count}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h6 style={{ fontWeight: '600', marginBottom: '10px', color: MEESHO.black, fontSize: '13px' }}>Price Range</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {priceRanges.map((range) => (
                      <label key={range.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer', background: priceRange === range.id ? MEESHO.greenLight : 'transparent' }}>
                        <input type="radio" name="price" checked={priceRange === range.id} onChange={() => setPriceRange(range.id)} style={{ accentColor: MEESHO.green }} />
                        <span style={{ fontSize: '13px', fontWeight: priceRange === range.id ? '600' : '400', color: priceRange === range.id ? MEESHO.green : MEESHO.gray }}>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 style={{ fontWeight: '600', marginBottom: '10px', color: MEESHO.black, fontSize: '13px' }}>Sort By</h6>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: `1px solid ${MEESHO.grayLight}`, fontSize: '13px', cursor: 'pointer', outline: 'none', background: MEESHO.white, color: MEESHO.gray }}>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 d-lg-none" style={{ marginBottom: '16px' }}>
              <div style={{ background: MEESHO.white, borderRadius: '8px', padding: '12px 16px' }}>
                <div className="d-flex gap-2 align-items-center">
                  <button onClick={() => setShowFilters(!showFilters)} style={{ padding: '10px 16px', borderRadius: '6px', border: 'none', background: showFilters ? MEESHO.pink : MEESHO.grayLight, color: showFilters ? MEESHO.white : MEESHO.gray, fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                    Filters {activeFiltersCount > 0 && <span style={{ background: showFilters ? MEESHO.white : MEESHO.pink, color: showFilters ? MEESHO.pink : MEESHO.white, borderRadius: '50%', padding: '2px 6px', fontSize: '10px', marginLeft: '4px' }}>{activeFiltersCount}</span>}
                  </button>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px 12px', borderRadius: '6px', border: `1px solid ${MEESHO.grayLight}`, fontSize: '13px', cursor: 'pointer', flex: 1, background: MEESHO.white, color: MEESHO.gray }}>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price ↑</option>
                    <option value="price-high">Price ↓</option>
                  </select>
                </div>
                {showFilters && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${MEESHO.grayLight}` }}>
                    <div style={{ marginBottom: '16px' }}>
                      <h6 style={{ fontWeight: '600', marginBottom: '10px', fontSize: '12px', color: MEESHO.black }}>Category</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button onClick={() => setSelectedCategory('all')} style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', background: selectedCategory === 'all' ? MEESHO.pink : MEESHO.grayLight, color: selectedCategory === 'all' ? MEESHO.white : MEESHO.gray, fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>All ({allProducts.length})</button>
                        {CATEGORIES.map(cat => (
                          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', background: selectedCategory === cat.id ? MEESHO.pink : MEESHO.grayLight, color: selectedCategory === cat.id ? MEESHO.white : MEESHO.gray, fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>{cat.name}</button>
                        ))}
                      </div>
                    </div>
                    {activeFiltersCount > 0 && <button onClick={clearAllFilters} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: MEESHO.pinkLight, color: MEESHO.pink, fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Clear Filters</button>}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-9">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <p style={{ color: MEESHO.gray, fontSize: '13px', margin: 0 }}>Showing <span style={{ color: MEESHO.black, fontWeight: '600' }}>{filteredProducts.length}</span> deals</p>
              </div>

              {loading && (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: MEESHO.white, borderRadius: '8px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px', background: MEESHO.grayLight, borderRadius: '8px' }}>
                    <div style={{ width: '20px', height: '20px', border: `3px solid ${MEESHO.grayLight}`, borderTopColor: MEESHO.pink, borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ color: MEESHO.gray, fontWeight: '500' }}>Loading deals...</span>
                  </div>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}

              {error && (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: MEESHO.white, borderRadius: '8px' }}>
                  <p style={{ color: '#dc2626', fontSize: '16px', marginBottom: '12px' }}>⚠️ Failed to load deals</p>
                  <button onClick={() => window.location.reload()} style={{ background: MEESHO.pink, color: MEESHO.white, border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Try Again</button>
                </div>
              )}

              {!loading && !error && filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: MEESHO.white, borderRadius: '8px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <h5 style={{ color: MEESHO.black, marginBottom: '8px', fontWeight: '600' }}>No deals found</h5>
                  <p style={{ color: MEESHO.gray, marginBottom: '20px' }}>Try adjusting your filters</p>
                  <button onClick={clearAllFilters} style={{ background: MEESHO.pink, color: MEESHO.white, border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Clear Filters</button>
                </div>
              )}

              {!loading && !error && filteredProducts.length > 0 && (
                <div className="row g-3">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-6">
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