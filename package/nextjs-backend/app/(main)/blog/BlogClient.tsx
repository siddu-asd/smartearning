'use client';

import Link from 'next/link';
import { Blog } from '../../../lib/db';

interface Props {
  blogs: Blog[];
}

export default function BlogClient({ blogs }: Props) {
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
            <li style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Blog</li>
          </ol>
        </nav>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: 'white', marginBottom: 12 }}>
          📰 Our Blog
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          Tips, guides, and insights to help you save more and shop smarter.
        </p>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '0 20px', marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingBottom: 80 }}>
          {blogs.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 24,
              }}
            >
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    borderRadius: 16,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={{ height: 200, background: '#f3f4f6', overflow: 'hidden' }}>
                    {blog.featured_image && (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    )}
                  </div>
                  <div style={{ padding: 20 }}>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>
                      {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 8, lineHeight: 1.4 }}>
                      {blog.title}
                    </h2>
                    <span style={{ display: 'inline-block', marginTop: 12, color: '#6366F1', fontSize: 14, fontWeight: 600 }}>
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: 16 }}>
              <span style={{ fontSize: 60, display: 'block', marginBottom: 16 }}>📝</span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 8 }}>No posts yet</h3>
              <p style={{ color: '#6b7280' }}>Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
