'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../../lib/db';

const COLORS = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  secondary: '#10B981',
  accent: '#F59E0B',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

const CATEGORIES = [
  { id: 'all', name: 'All', slug: 'all' },
  { id: '1', name: 'Laptops', slug: 'laptop-deals' },
  { id: '2', name: 'Mobiles', slug: 'mobile-deals' },
  { id: '3', name: 'Appliances', slug: 'home-appliances' },
  { id: '5', name: 'Headphones', slug: 'audio-headphones' },
  { id: '6', name: 'Furniture', slug: 'study-furniture' },
  { id: '7', name: 'Entertainment', slug: 'entertainment' },
];

const categoryNameToId: Record<string, string> = {
  laptops: '1', laptop: '1', 'laptop-deals': '1',
  mobiles: '2', mobile: '2', phones: '2', 'mobile-deals': '2',
  appliances: '3', 'home-appliances': '3',
  laundry: '4',
  headphones: '5', audio: '5', 'audio-headphones': '5',
  furniture: '6', 'study-furniture': '6',
  entertainment: '7', electronics: '7', tvs: '7', other: '7',
};

interface DealsClientProps {
  initialProducts: Product[];
  categorySlug?: string;
}

export default function DealsClient({ initialProducts, categorySlug }: DealsClientProps) {
  // Determine initial category from slug
  const initialCategory = categorySlug ? (categoryNameToId[categorySlug] || 'all') : 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('newest');

  // Convert products
  const allProducts = initialProducts.map((p) => {
    let categoryId = p.category || 'misc';
    if (categoryId && isNaN(Number(categoryId))) {
      categoryId = categoryNameToId[categoryId.toLowerCase()] || '7';
    }
    return {
      id: p.id,
      name: p.title,
      slug: p.slug,
      categoryId: categoryId,
      images: [p.image_url || '/placeholder.jpg'],
      affiliateUrl: p.affiliate_link,
      mrp: p.mrp || p.original_price || p.price,
      discountedPrice: p.discounted_price || p.sale_price || p.price,
      buttonText: 'Get Deal',
    };
  });

  // Filter products
  let filteredProducts =
    selectedCategory === 'all'
      ? allProducts
      : allProducts.filter((p) => p.categoryId === selectedCategory);

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.discountedPrice || 0) - (b.discountedPrice || 0));
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.discountedPrice || 0) - (a.discountedPrice || 0));
  }

  return (
    <div className="page-content" style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: COLORS.gradient,
          padding: '60px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: COLORS.white, fontSize: '14px' }}>
                Deals
              </li>
            </ol>
          </nav>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: COLORS.white,
              marginBottom: '12px',
            }}
          >
            🛒 All Deals
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', margin: 0 }}>
            {filteredProducts.length} amazing deals waiting for you
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              padding: '16px',
              background: COLORS.lightBg,
              borderRadius: '12px',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  background: selectedCategory === cat.id ? COLORS.gradient : COLORS.white,
                  color: selectedCategory === cat.id ? COLORS.white : COLORS.dark,
                  border: `1px solid ${selectedCategory === cat.id ? 'transparent' : COLORS.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p style={{ color: COLORS.gray, margin: 0 }}>
              Showing {filteredProducts.length} products
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: `1px solid ${COLORS.border}`,
                fontSize: '14px',
                color: COLORS.dark,
                background: COLORS.white,
                cursor: 'pointer',
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: COLORS.lightBg,
                borderRadius: '16px',
              }}
            >
              <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>🔍</span>
              <h3 style={{ color: COLORS.dark, marginBottom: '8px' }}>No products found</h3>
              <p style={{ color: COLORS.gray }}>Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
