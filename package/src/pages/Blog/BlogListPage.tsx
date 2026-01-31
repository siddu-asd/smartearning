import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../constant/categories';
import { BlogPost } from '../../constant/affiliateData';
import { useBlogs } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Blog List Page - Modern Dark Theme Design
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
    createdAt: new Date(b.created_at).toLocaleDateString(),
    updatedAt: b.created_at,
  }));
  
  // Filter blogs by category
  const filteredBlogs = selectedCategory === 'all' 
    ? allBlogs 
    : allBlogs.filter(b => b.categoryId === selectedCategory);

  return (
    <div className="page-content" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(118,75,162,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: '#FFD700' }}>Blog</li>
            </ol>
          </nav>
          
          <div className="text-center" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease'
          }}>
            <div style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0.3) 100%)',
              padding: '12px 24px',
              borderRadius: '50px',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ animation: 'heartbeat 2s infinite' }}>📚</span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>SAVING TIPS & GUIDES</span>
            </div>
            
            <h1 style={{ 
              color: '#fff', 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: '900',
              marginBottom: '15px'
            }}>
              Deal Tips & <span style={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Saving Guides</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
              Expert tips to help you save more on every purchase
            </p>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <div className="row">
            {/* Main Content - Blog Grid */}
            <div className="col-lg-8">
              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4" style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '20px 25px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <h5 className="mb-0" style={{ color: '#fff', fontWeight: '700' }}>
                  {selectedCategory === 'all' 
                    ? '✨ All Saving Tips' 
                    : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h5>
                <span style={{ 
                  color: 'rgba(255,255,255,0.6)',
                  background: 'rgba(102,126,234,0.2)',
                  padding: '8px 16px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Blog Grid */}
              {filteredBlogs.length > 0 ? (
                <div className="row g-4">
                  {filteredBlogs.map((blog, index) => (
                    <div 
                      key={blog.id} 
                      className="col-md-6"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: `all 0.5s ease ${index * 0.1}s`
                      }}
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5" style={{ 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ fontSize: '60px', marginBottom: '20px' }}>📭</div>
                  <h5 style={{ color: '#fff', fontWeight: '700' }}>No tips found</h5>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>Try selecting a different category</p>
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      padding: '14px 30px',
                      borderRadius: '50px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View All Tips
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '100px' }}>
                {/* Category Filter */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  padding: '30px',
                  marginBottom: '25px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h6 style={{ 
                    color: '#fff', 
                    fontWeight: '800', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span>📁</span> Categories
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      style={{
                        background: selectedCategory === 'all' 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                          : 'rgba(255,255,255,0.05)',
                        color: '#fff',
                        padding: '14px 20px',
                        borderRadius: '12px',
                        border: selectedCategory === 'all' 
                          ? 'none' 
                          : '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      All Tips
                    </button>
                    {CATEGORIES.map((cat) => {
                      const count = allBlogs.filter(b => b.categoryId === cat.id).length;
                      if (count === 0) return null;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          style={{
                            background: selectedCategory === cat.id 
                              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                              : 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            border: selectedCategory === cat.id 
                              ? 'none' 
                              : '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          {cat.name}
                          <span style={{
                            background: 'rgba(255,255,255,0.2)',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            fontSize: '12px'
                          }}>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Posts */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  padding: '30px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h6 style={{ 
                    color: '#fff', 
                    fontWeight: '800', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span>🕐</span> Latest Tips
                  </h6>
                  <div className="d-flex flex-column gap-3">
                    {allBlogs.slice(0, 5).map((blog) => (
                      <Link 
                        key={blog.id}
                        to={`/blog/${blog.slug}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div style={{
                          display: 'flex',
                          gap: '15px',
                          padding: '15px',
                          borderRadius: '16px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.transform = 'translateX(5px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                        >
                          <img 
                            src={blog.featuredImage} 
                            alt={blog.title}
                            style={{ 
                              width: '65px', 
                              height: '65px', 
                              objectFit: 'cover', 
                              borderRadius: '12px',
                              background: 'rgba(255,255,255,0.1)'
                            }}
                          />
                          <div>
                            <h6 style={{ 
                              color: '#fff', 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              marginBottom: '5px',
                              lineHeight: '1.4'
                            }}>{blog.title}</h6>
                            <small style={{ color: 'rgba(255,255,255,0.5)' }}>{blog.createdAt}</small>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Blog Card Component - Modern Dark Theme
 */
function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.1)',
      height: '100%',
      transition: 'all 0.4s ease',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 30px 60px rgba(102,126,234,0.2)';
      e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
    }}
    >
      <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
        <div style={{ 
          overflow: 'hidden', 
          background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '180px',
          position: 'relative'
        }}>
          {/* Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }} />
          <img 
            src={blog.featuredImage} 
            alt={blog.title}
            style={{ 
              maxWidth: '90%',
              maxHeight: '160px', 
              objectFit: 'contain',
              transition: 'transform 0.4s ease',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
              position: 'relative',
              zIndex: 5
            }}
          />
        </div>
      </Link>
      <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="d-flex align-items-center gap-2 mb-3">
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '600'
          }}>{blog.category?.name || 'Article'}</span>
          <small style={{ color: 'rgba(255,255,255,0.5)' }}>{blog.createdAt}</small>
        </div>
        <h5 style={{ marginBottom: '15px', flex: 1 }}>
          <Link to={`/blog/${blog.slug}`} style={{ 
            color: '#fff', 
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            lineHeight: '1.4',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#FFD700'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
          >
            {blog.title}
          </Link>
        </h5>
        <p style={{ 
          color: 'rgba(255,255,255,0.6)', 
          fontSize: '14px', 
          lineHeight: '1.7',
          marginBottom: '20px' 
        }} dangerouslySetInnerHTML={{ 
          __html: blog.content.substring(0, 120).replace(/<[^>]*>/g, '') + '...' 
        }} />
        <Link 
          to={`/blog/${blog.slug}`}
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            alignSelf: 'flex-start'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
