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
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Simple Header */}
      <section style={{ background: 'white', padding: '40px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <nav style={{ marginBottom: '16px' }}>
            <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
              <li><Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Home</Link></li>
              <li style={{ color: '#cbd5e1' }}>/</li>
              <li style={{ color: '#1e293b', fontSize: '14px', fontWeight: 500 }}>Blog</li>
            </ol>
          </nav>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Blog</h1>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>Tips, guides and insights to help you save money</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {blogs.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
              {blogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={'/blog/' + blog.slug} 
                  style={{ 
                    display: 'block', 
                    background: 'white', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    textDecoration: 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', width: '100%', height: '200px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    {(blog.image_url || blog.featured_image) ? (
                      <img 
                        src={blog.image_url || blog.featured_image} 
                        alt={blog.title} 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          objectFit: 'contain',
                          display: 'block'
                        }} 
                      />
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                        color: '#2563eb',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '8px'
                      }}>
                        StudentsCrazyDeals Blog
                      </div>
                    )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      {blog.category && (
                        <span style={{ 
                          background: '#dbeafe', 
                          color: '#1d4ed8', 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          fontSize: '12px', 
                          fontWeight: 600 
                        }}>
                          {blog.category}
                        </span>
                      )}
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>{formatDate(blog.created_at)}</span>
                    </div>

                    {/* Title */}
                    <h2 style={{ 
                      fontSize: '18px', 
                      fontWeight: 600, 
                      color: '#0f172a', 
                      margin: '0 0 12px', 
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{ 
                      color: '#64748b', 
                      fontSize: '14px', 
                      lineHeight: 1.6, 
                      margin: '0 0 16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {blog.excerpt || blog.content?.slice(0, 150)}...
                    </p>

                    {/* Read More */}
                    <span style={{ 
                      color: '#2563eb', 
                      fontWeight: 600, 
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      Read Article <span style={{ fontSize: '16px' }}>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📝</div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>No articles yet</h3>
              <p style={{ color: '#64748b' }}>Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
