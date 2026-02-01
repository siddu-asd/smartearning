import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constant/categories';
import { BlogPost } from '../../constant/affiliateData';
import { useBlogs } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

// Color Constants
const COLORS = {
  primary: '#2563EB',
  secondary: '#10B981',
  accent: '#F59E0B',
  dark: '#111827',
  gray: '#6B7280',
  lightBg: '#F9FAFB',
  border: '#E5E7EB',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
};

/**
 * Blog List Page - Clean Modern Light Theme
 * Displays all published blog posts from Supabase
 * Route: /blog
 */
export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Fetch blogs from Supabase
  const { blogs: supabaseBlogs } = useBlogs();
  
  // Transform Supabase blogs to match component format
  const allBlogs: BlogPost[] = supabaseBlogs.map(b => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    featuredImage: b.featured_image || IMAGES.BackBg1,
    content: b.content || '',
    categoryId: '1',
    metaTitle: b.title,
    metaDescription: '',
    status: 'published' as const,
    createdAt: new Date(b.created_at).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    updatedAt: b.created_at,
  }));
  
  // Filter blogs by category
  const filteredBlogs = selectedCategory === 'all' 
    ? allBlogs 
    : allBlogs.filter(b => b.categoryId === selectedCategory);

  // Get all categories with blog counts
  const categoriesWithCount = [
    { id: 'all', name: 'All Posts', count: allBlogs.length },
    ...CATEGORIES.map(cat => ({
      ...cat,
      count: allBlogs.filter(b => b.categoryId === cat.id).length
    })).filter(cat => cat.count > 0)
  ];

  return (
    <div className="page-content" style={{ background: COLORS.white, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        background: COLORS.gradient,
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: COLORS.white, fontSize: '14px' }}>
                Blog
              </li>
            </ol>
          </nav>
          
          <div className="text-center" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease'
          }}>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: COLORS.white,
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.5px',
              marginBottom: '16px'
            }}>
              OUR BLOG
            </span>
            
            <h1 style={{ 
              color: COLORS.white, 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '700',
              marginBottom: '12px',
              lineHeight: '1.2'
            }}>
              Latest Articles & Insights
            </h1>
            
            <p style={{ 
              color: 'rgba(255,255,255,0.9)', 
              maxWidth: '500px', 
              margin: '0 auto',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              Discover tips, guides, and stories to help you make the most of your shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section style={{ 
        background: COLORS.white,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: '24px 0',
        position: 'sticky',
        top: '0',
        zIndex: 100
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {categoriesWithCount.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? COLORS.primary : COLORS.white,
                  color: selectedCategory === cat.id ? COLORS.white : COLORS.dark,
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: `1px solid ${selectedCategory === cat.id ? COLORS.primary : COLORS.border}`,
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {cat.name}
                <span style={{
                  background: selectedCategory === cat.id ? 'rgba(255,255,255,0.25)' : COLORS.lightBg,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section style={{ padding: '60px 0 80px', background: COLORS.lightBg }}>
        <div className="container">
          {/* Results Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{ 
              color: COLORS.dark, 
              fontSize: '24px', 
              fontWeight: '700',
              margin: 0
            }}>
              {selectedCategory === 'all' 
                ? 'All Articles' 
                : categoriesWithCount.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span style={{ 
              color: COLORS.gray,
              fontSize: '14px'
            }}>
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="row g-4">
              {filteredBlogs.map((blog, index) => (
                <div 
                  key={blog.id} 
                  className="col-lg-4 col-md-6"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.4s ease ${index * 0.08}s`
                  }}
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div style={{ 
              textAlign: 'center',
              padding: '80px 20px',
              background: COLORS.white,
              borderRadius: '16px',
              border: `1px solid ${COLORS.border}`
            }}>
              <div style={{ 
                width: '80px',
                height: '80px',
                background: COLORS.lightBg,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '32px'
              }}>
                📝
              </div>
              <h3 style={{ 
                color: COLORS.dark, 
                fontSize: '20px', 
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                No articles found
              </h3>
              <p style={{ 
                color: COLORS.gray, 
                marginBottom: '24px',
                fontSize: '15px'
              }}>
                There are no articles in this category yet.
              </p>
              <button 
                onClick={() => setSelectedCategory('all')}
                style={{
                  background: COLORS.primary,
                  color: COLORS.white,
                  padding: '12px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/**
 * Blog Card Component - Clean Light Theme
 */
function BlogCard({ blog }: { blog: BlogPost }) {
  // Extract excerpt from content
  const excerpt = blog.content
    ? blog.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
    : 'Click to read more about this article...';

  return (
    <div style={{
      background: COLORS.white,
      borderRadius: '12px',
      overflow: 'hidden',
      border: `1px solid ${COLORS.border}`,
      height: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column'
    }}
    >
      {/* Image */}
      <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
        <div style={{ 
          overflow: 'hidden', 
          background: COLORS.lightBg,
          height: '200px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={blog.featuredImage} 
            alt={blog.title}
            style={{ 
              width: '100%',
              height: '100%', 
              objectFit: 'contain',
              padding: '16px'
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div style={{ 
        padding: '24px', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {/* Date */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={COLORS.gray}
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span style={{ 
            color: COLORS.gray, 
            fontSize: '13px',
            fontWeight: '500'
          }}>
            {blog.createdAt}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ marginBottom: '12px', flex: 0 }}>
          <Link 
            to={`/blog/${blog.slug}`} 
            style={{ 
              color: COLORS.dark, 
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p style={{ 
          color: COLORS.gray, 
          fontSize: '14px', 
          lineHeight: '1.6',
          marginBottom: '20px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {excerpt}
        </p>

        {/* Read More Link */}
        <Link 
          to={`/blog/${blog.slug}`}
          style={{
            color: COLORS.primary,
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Read More 
          <span style={{ fontSize: '16px' }}>→</span>
        </Link>
      </div>
    </div>
  );
}
