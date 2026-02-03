'use client';

import Link from 'next/link';
import { Blog } from '../../../../lib/db';

interface Props {
  blog: Blog;
  relatedBlogs: Blog[];
}

export default function BlogDetailClient({ blog, relatedBlogs }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', padding: '48px 24px 120px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: '24px' }}>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li><Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Blog</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li style={{ color: 'white', fontSize: '14px', fontWeight: 600, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</li>
            </ol>
          </nav>

          {/* Meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {blog.category && (
              <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>{blog.category}</span>
            )}
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>📅 {formatDate(blog.created_at)}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: 'white', lineHeight: 1.3 }}>{blog.title}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '0 24px', marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Featured Image */}
          {(blog.image_url || blog.featured_image) && (
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: 'white' }}>
              <img src={blog.image_url || blog.featured_image} alt={blog.title} style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          {/* Article Content */}
          <article style={{ background: 'white', borderRadius: '12px', padding: 'clamp(24px, 5vw, 48px)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: '48px' }}>
            <div style={{ fontSize: '17px', lineHeight: 1.8, color: '#374151' }}>
              {blog.content?.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} style={{ marginBottom: '20px' }}>{paragraph}</p>
                )
              ))}
            </div>

            {/* Back Link */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Share:</span>
                {['𝕏', 'f', 'in'].map((icon, i) => (
                  <span key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f3f4f6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#374151' }}>{icon}</span>
                ))}
              </div>
              <Link href="/blog" style={{ color: '#2563eb', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>← Back to Blog</Link>
            </div>
          </article>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Related Articles</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blog/${relatedBlog.slug}`} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div style={{ paddingTop: '55%', position: 'relative', background: '#f3f4f6' }}>
                      {(relatedBlog.image_url || relatedBlog.featured_image) ? (
                        <img src={relatedBlog.image_url || relatedBlog.featured_image} alt={relatedBlog.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', opacity: 0.3 }}>📄</div>
                      )}
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{relatedBlog.title}</h3>
                      <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px', display: 'block' }}>{formatDate(relatedBlog.created_at)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
