'use client';

import Link from 'next/link';
import { Blog } from '../../../../lib/db';

interface Props {
  blog: Blog;
}

export default function BlogDetailClient({ blog }: Props) {
  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          padding: '60px 20px 100px',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <nav style={{ marginBottom: 20 }}>
            <ol style={{ display: 'flex', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Home</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li><Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>Blog</Link></li>
              <li style={{ color: 'rgba(255,255,255,0.5)' }}>/</li>
              <li style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Post</li>
            </ol>
          </nav>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: 'white', marginTop: 8, lineHeight: 1.3 }}>
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '0 20px', marginTop: -50, position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 80 }}>
          <article
            style={{
              background: 'white',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            {blog.featured_image && (
              <img
                src={blog.featured_image}
                alt={blog.title}
                style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'cover' }}
              />
            )}
            <div
              style={{
                padding: 32,
                fontSize: 16,
                color: '#374151',
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content available.</p>' }}
            />
          </article>

          {/* Back Link */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: 'white',
                borderRadius: 50,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
