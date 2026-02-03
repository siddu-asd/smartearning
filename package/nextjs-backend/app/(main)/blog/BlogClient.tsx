'use client';

import Link from 'next/link';
import { Blog } from '../../../lib/db';

interface Props {
  blogs: Blog[];
}

export default function BlogClient({ blogs }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: '#059669', padding: '48px 24px 100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <nav style={{ marginBottom: '20px' }}>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>Blog</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '36px' }}>📖</span>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'white' }}>Our Blog</h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>Tips and insights to help you save money</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '0 24px', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
          {blogs.length > 0 ? (
            <>
              {/* Featured Blog */}
              {featuredBlog && (
                <Link href={'/blog/' + featuredBlog.slug} style={{ display: 'block', background: 'white', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '40px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    <div style={{ position: 'relative', minHeight: '280px', background: '#f3f4f6' }}>
                      {(featuredBlog.image_url || featuredBlog.featured_image) ? (
                        <img src={featuredBlog.image_url || featuredBlog.featured_image} alt={featuredBlog.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', opacity: 0.3 }}>📄</div>
                      )}
                      <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#059669', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>Featured</div>
                    </div>
                    <div style={{ padding: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        {featuredBlog.category && <span style={{ background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>{featuredBlog.category}</span>}
                        <span style={{ color: '#6b7280', fontSize: '13px' }}>{formatDate(featuredBlog.created_at)}</span>
                      </div>
                      <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: '0 0 12px', lineHeight: 1.3 }}>{featuredBlog.title}</h2>
                      <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.6, margin: '0 0 20px' }}>{featuredBlog.excerpt || featuredBlog.content?.slice(0, 180)}...</p>
                      <span style={{ color: '#059669', fontWeight: 600, fontSize: '14px' }}>Read Article →</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Other Blogs */}
              {otherBlogs.length > 0 && (
                <>
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>📝 More Articles</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {otherBlogs.map((blog) => (
                      <Link key={blog.id} href={'/blog/' + blog.slug} style={{ display: 'block', background: 'white', borderRadius: '12px', overflow: 'hidden', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb' }}>
                        <div style={{ position: 'relative', paddingTop: '56%', background: '#f3f4f6' }}>
                          {(blog.image_url || blog.featured_image) ? (
                            <img src={blog.image_url || blog.featured_image} alt={blog.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', opacity: 0.3 }}>📄</div>
                          )}
                        </div>
                        <div style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            {blog.category && <span style={{ background: '#f3f4f6', color: '#374151', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{blog.category}</span>}
                            <span style={{ color: '#9ca3af', fontSize: '12px' }}>{formatDate(blog.created_at)}</span>
                          </div>
                          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '0 0 8px', lineHeight: 1.4 }}>{blog.title}</h3>
                          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.5, margin: '0 0 12px' }}>{blog.excerpt || blog.content?.slice(0, 100)}...</p>
                          <span style={{ color: '#059669', fontWeight: 600, fontSize: '13px' }}>Read More →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '12px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>No articles yet</h3>
              <p style={{ color: '#6b7280' }}>Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
