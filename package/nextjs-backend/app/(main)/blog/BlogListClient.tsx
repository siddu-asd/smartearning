'use client';

import Link from 'next/link';
import { Blog } from '../../../lib/db';

const COLORS = {
  primary: '#2563EB',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

interface BlogListClientProps {
  initialBlogs: Blog[];
}

export default function BlogListClient({ initialBlogs }: BlogListClientProps) {
  const blogs = initialBlogs.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    featuredImage: b.featured_image || '/placeholder.jpg',
    content: b.content || '',
    createdAt: new Date(b.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }));

  return (
    <div className="page-content" style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          background: COLORS.gradient,
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: COLORS.white, fontSize: '14px' }}>
                Blog
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
            📰 Our Blog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '600px' }}>
            Tips, guides, and insights to help you save more and shop smarter.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container">
          {blogs.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '32px',
              }}
            >
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  style={{
                    display: 'block',
                    background: COLORS.white,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${COLORS.border}`,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: 'relative',
                      paddingTop: '56.25%',
                      background: COLORS.lightBg,
                    }}
                  >
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    <p style={{ color: COLORS.gray, fontSize: '13px', marginBottom: '8px' }}>{blog.createdAt}</p>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: COLORS.dark,
                        marginBottom: '12px',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {blog.title}
                    </h3>
                    <span
                      style={{
                        color: COLORS.primary,
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Read More →
                    </span>
                  </div>
                </Link>
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
              <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>📭</span>
              <h3 style={{ color: COLORS.dark, marginBottom: '8px' }}>No blog posts yet</h3>
              <p style={{ color: COLORS.gray }}>Check back soon for new articles!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
