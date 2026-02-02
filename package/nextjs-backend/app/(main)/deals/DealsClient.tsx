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
    { id: 'mobiles', name: 'Mobiles', icon: '📱' },
    { id: 'laptops', name: 'Laptops', icon: '💻' },
    { id: 'audio', name: 'Audio', icon: '🎧' },
    { id: 'electronics', name: 'Electronics', icon: '📺' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'home', name: 'Home', icon: '🏠' },
  ];

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter((p) => p.category?.toLowerCase().includes(category.toLowerCase()));
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

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          padding: '60px 20px 100px',
          textAlign: 'center',
        }}
      >
        <nav style={{ marginBottom: 20 }}>
          <ol style={{ display: 'flex', gap: 8, justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Home</Link></li>
            <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
            <li style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Deals</li>
          </ol>
        </nav>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', marginBottom: 12 }}>
          🔥 All Deals
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>
          Browse {filtered.length} amazing deals curated just for you
        </p>
      </section>

      {/* Filters */}
      <section style={{ padding: '0 20px', marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            background: 'white',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          {/* Search */}
          <div style={{ marginBottom: 20 }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deals..."
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                fontSize: 15,
                outline: 'none',
              }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 50,
                  border: category === cat.id ? 'none' : '1px solid #e5e7eb',
                  background: category === cat.id ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'white',
                  color: category === cat.id ? 'white' : '#374151',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, color: '#6b7280' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 14,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: '40px 20px 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {filtered.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 24,
              }}
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <span style={{ fontSize: 60, display: 'block', marginBottom: 16 }}>😔</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>No deals found</h3>
              <p style={{ color: '#6b7280', marginBottom: 24 }}>Try adjusting your filters</p>
              <button
                onClick={() => { setCategory('all'); setSearch(''); }}
                style={{
                  padding: '12px 28px',
                  borderRadius: 50,
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  color: 'white',
                  border: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
