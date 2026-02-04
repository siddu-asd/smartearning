'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Product } from '../../../lib/db';
import ProductCard from '../../components/ProductCard';

interface Props {
  products: Product[];
  initialCategory?: string;
}

export default function DealsClient({ products, initialCategory = 'all' }: Props) {
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', name: 'All Deals', icon: '🔥' },
    { id: 'mobiles', name: 'Mobiles', icon: '📱', aliases: ['mobile', '2', 'mobile deals'] },
    { id: 'laptops', name: 'Laptops', icon: '💻', aliases: ['laptop', '1', 'laptop deals'] },
    { id: 'audio', name: 'Audio', icon: '🎧', aliases: ['5', 'audio & headphones', 'headphones'] },
    { id: 'electronics', name: 'Electronics', icon: '📺', aliases: ['7', 'entertainment'] },
    { id: 'fashion', name: 'Fashion', icon: '👕', aliases: ['clothes', 'clothing'] },
    { id: 'home', name: 'Home', icon: '🏠', aliases: ['3', '4', '6', 'home appliances', 'laundry', 'furniture', 'study furniture'] },
  ];

  // Helper function to match category with aliases
  const matchCategory = (productCategory: string | undefined, filterCategory: string) => {
    if (!productCategory) return false;
    const cat = categories.find(c => c.id === filterCategory);
    if (!cat) return false;
    
    const productCatLower = productCategory.toLowerCase().trim();
    const filterCatLower = filterCategory.toLowerCase();
    
    // Direct match
    if (productCatLower === filterCatLower || productCatLower.includes(filterCatLower)) {
      return true;
    }
    
    // Check aliases
    if (cat.aliases) {
      return cat.aliases.some(alias => 
        productCatLower === alias.toLowerCase() || productCatLower.includes(alias.toLowerCase())
      );
    }
    
    return false;
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => matchCategory(p.category, category));
    }

    if (search) {
      result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.discounted_price || a.mrp || 0) - (b.discounted_price || b.mrp || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.discounted_price || b.mrp || 0) - (a.discounted_price || a.mrp || 0));
        break;
      case 'discount':
        result.sort((a, b) => {
          const da = a.mrp && a.discounted_price ? (a.mrp - a.discounted_price) / a.mrp : 0;
          const db = b.mrp && b.discounted_price ? (b.mrp - b.discounted_price) / b.mrp : 0;
          return db - da;
        });
        break;
    }

    return result;
  }, [products, category, sortBy, search]);

  const currentCategory = categories.find((c) => c.id === category) || categories[0];

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '48px 24px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <nav style={{ marginBottom: '20px' }}>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Deals</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '36px' }}>{currentCategory.icon}</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'white' }}>{currentCategory.name}</h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
            Discover <strong>{filtered.length}</strong> amazing deals
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section style={{ padding: '0 24px', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          {/* Search */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for deals..."
              style={{ width: '100%', padding: '14px 20px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '15px', background: '#f9fafb', outline: 'none' }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {categories.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: isActive ? 'none' : '1px solid #e5e7eb',
                    background: isActive ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' : 'white',
                    color: isActive ? 'white' : '#374151',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px', background: 'white', cursor: 'pointer', outline: 'none' }}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>No deals found</h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>Try adjusting your filters or search terms</p>
              <button onClick={() => { setCategory('all'); setSearch(''); }} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
