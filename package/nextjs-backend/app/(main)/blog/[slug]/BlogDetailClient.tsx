'use client';

import Link from 'next/link';
import { Blog } from '../../../../lib/db';

const COLORS = {
  primary: '#2563EB',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  white: '#FFFFFF',
  border: '#E5E7EB',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

interface BlogDetailClientProps {
  blog: Blog;
  relatedBlogs: Blog[];
}

export default function BlogDetailClient({ blog, relatedBlogs }: BlogDetailClientProps) {
  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="page-content" style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section
        style={{
          background: COLORS.gradient,
          padding: '80px 0 120px',
          position: 'relative',
        }}
      >
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent', padding: 0 }}>
              <li className="breadcrumb-item">
                <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/blog" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
                  Blog
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: COLORS.white, fontSize: '14px' }}>
                Article
              </li>
            </ol>
          </nav>

          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '16px' }}>{formattedDate}</p>
              <h1
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: '800',
                  color: COLORS.white,
                  lineHeight: '1.3',
                }}
              >
                {blog.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featured_image && (
        <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
                }}
              >
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article
                style={{
                  fontSize: '17px',
                  lineHeight: '1.8',
                  color: COLORS.dark,
                }}
                dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content available.</p>' }}
              />

              {/* Share & Back */}
              <div
                style={{
                  marginTop: '48px',
                  paddingTop: '32px',
                  borderTop: `1px solid ${COLORS.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <Link
                  href="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    background: COLORS.lightBg,
                    color: COLORS.dark,
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '10px',
                    textDecoration: 'none',
                  }}
                >
                  ← Back to Blog
                </Link>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: COLORS.gray, fontSize: '14px' }}>Share:</span>
                  {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      style={{
                        color: COLORS.gray,
                        fontSize: '14px',
                        textDecoration: 'none',
                      }}
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section style={{ padding: '60px 0', background: COLORS.lightBg }}>
          <div className="container">
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: COLORS.dark,
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              Related Articles
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  style={{
                    display: 'block',
                    background: COLORS.white,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    textDecoration: 'none',
                  }}
                >
                  {related.featured_image && (
                    <div style={{ paddingTop: '56.25%', position: 'relative' }}>
                      <img
                        src={related.featured_image}
                        alt={related.title}
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
                  )}
                  <div style={{ padding: '20px' }}>
                    <h3
                      style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: COLORS.dark,
                        marginBottom: '8px',
                        lineHeight: '1.4',
                      }}
                    >
                      {related.title}
                    </h3>
                    <span style={{ color: COLORS.primary, fontSize: '14px', fontWeight: '500' }}>Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
