import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { BlogPost } from '../../constant/affiliateData';
import { useBlogBySlug, useBlogs } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Blog Detail Page - Modern Dark Theme
 * Displays full blog content from Supabase
 * Route: /blog/:slug
 */
export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Fetch blog from Supabase
  const { blog: supabaseBlog, loading } = useBlogBySlug(slug);
  const { blogs: allSupabaseBlogs } = useBlogs();
  
  // Transform Supabase blog to match component format
  const blogWithCategory: BlogPost | undefined = useMemo(() => {
    if (!supabaseBlog) return undefined;
    return {
      id: supabaseBlog.id,
      title: supabaseBlog.title,
      slug: supabaseBlog.slug,
      featuredImage: supabaseBlog.featured_image || IMAGES.BackBg1,
      content: supabaseBlog.content || '',
      categoryId: '1',
      metaTitle: supabaseBlog.title,
      metaDescription: '',
      status: 'published' as const,
      createdAt: new Date(supabaseBlog.created_at).toLocaleDateString(),
      updatedAt: supabaseBlog.created_at,
    };
  }, [supabaseBlog]);
  
  // Set page title
  useEffect(() => {
    if (blogWithCategory) {
      document.title = blogWithCategory.metaTitle;
    }
  }, [blogWithCategory]);
  
  // Get related blogs
  const relatedBlogs: BlogPost[] = allSupabaseBlogs
    .filter(b => b.id !== supabaseBlog?.id)
    .slice(0, 3)
    .map(b => ({
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

  if (loading) {
    return (
      <div className="page-content" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)', minHeight: '100vh' }}>
        <section style={{ padding: '150px 0', textAlign: 'center' }}>
          <div className="container">
            <div style={{
              width: '60px',
              height: '60px',
              border: '3px solid rgba(102,126,234,0.3)',
              borderTopColor: '#667eea',
              borderRadius: '50%',
              margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Loading article...</p>
          </div>
        </section>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!blogWithCategory) {
    return (
      <div className="page-content" style={{ background: 'linear-gradient(180deg, #0f0c29 0%, #1a1a2e 100%)', minHeight: '100vh' }}>
        <section style={{ padding: '150px 0', textAlign: 'center' }}>
          <div className="container">
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>📭</div>
            <h3 style={{ color: '#fff', fontWeight: '800', marginBottom: '15px' }}>Article not found</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px' }}>
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '15px 35px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              Browse All Articles
            </Link>
          </div>
        </section>
      </div>
    );
  }

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
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4" style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease'
          }}>
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/blog" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Blog</Link>
              </li>
              <li className="breadcrumb-item active" style={{ color: '#FFD700' }}>Article</li>
            </ol>
          </nav>
          
          {/* Title */}
          <div style={{ maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.1s'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                📁 {blogWithCategory.category?.name || 'Article'}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                📅 {blogWithCategory.createdAt}
              </span>
            </div>
            
            <h1 style={{
              color: '#fff',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '900',
              lineHeight: '1.2',
              marginBottom: '20px',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease 0.2s'
            }}>
              {blogWithCategory.title}
            </h1>
          </div>
        </div>
      </section>
      
      {/* Featured Image */}
      <section style={{ marginTop: '-30px', position: 'relative', zIndex: 20, paddingBottom: '40px' }}>
        <div className="container">
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '20px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.5s ease 0.3s'
          }}>
            <img 
              src={blogWithCategory.featuredImage} 
              alt={blogWithCategory.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '350px',
                objectFit: 'contain',
                display: 'block',
                borderRadius: '16px'
              }}
            />
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              <article style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {/* Article Content */}
                <div style={{ padding: '40px' }}>
                  <div 
                    className="article-body"
                    style={{ 
                      fontSize: '17px', 
                      lineHeight: '1.9',
                      color: 'rgba(255,255,255,0.85)'
                    }}
                    dangerouslySetInnerHTML={{ __html: blogWithCategory.content }}
                  />
                </div>
              </article>

              {/* Share Buttons */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                borderRadius: '20px',
                padding: '30px',
                marginTop: '25px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <h6 style={{ color: '#fff', fontWeight: '700', marginBottom: '20px' }}>📤 Share this article:</h6>
                <div className="d-flex flex-wrap gap-3">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogWithCategory.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(29,161,242,0.2)',
                      color: '#1DA1F2',
                      padding: '12px 25px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid rgba(29,161,242,0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Twitter
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(24,119,242,0.2)',
                      color: '#1877F2',
                      padding: '12px 25px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid rgba(24,119,242,0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Facebook
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blogWithCategory.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(10,102,194,0.2)',
                      color: '#0A66C2',
                      padding: '12px 25px',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid rgba(10,102,194,0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  <h5 style={{ color: '#fff', fontWeight: '800', marginBottom: '25px' }}>📚 Related Articles</h5>
                  <div className="row g-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <div key={relatedBlog.id} className="col-md-4">
                        <Link to={`/blog/${relatedBlog.slug}`} style={{ textDecoration: 'none' }}>
                          <div style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.3s ease',
                            height: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = 'rgba(102,126,234,0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          }}
                          >
                            <div style={{ 
                              height: '140px', 
                              background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img 
                                src={relatedBlog.featuredImage} 
                                alt={relatedBlog.title}
                                style={{ 
                                  maxWidth: '90%', 
                                  maxHeight: '120px', 
                                  objectFit: 'contain'
                                }}
                              />
                            </div>
                            <div style={{ padding: '20px' }}>
                              <h6 style={{ 
                                color: '#fff', 
                                fontWeight: '700', 
                                fontSize: '14px',
                                marginBottom: '10px',
                                lineHeight: '1.4'
                              }}>
                                {relatedBlog.title}
                              </h6>
                              <small style={{ color: 'rgba(255,255,255,0.5)' }}>{relatedBlog.createdAt}</small>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: '100px' }}>
                {/* Browse More */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  padding: '30px',
                  marginBottom: '25px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h6 style={{ color: '#fff', fontWeight: '800', marginBottom: '20px' }}>🔗 Browse More</h6>
                  <Link to="/blog" style={{
                    display: 'block',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    marginBottom: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    📰 All Articles
                  </Link>
                  <Link to="/deals" style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(102,126,234,0.3)'
                  }}>
                    🛍️ Shop Deals
                  </Link>
                </div>

                {/* Recent Posts */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '24px',
                  padding: '30px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h6 style={{ color: '#fff', fontWeight: '800', marginBottom: '20px' }}>🕐 Recent Posts</h6>
                  <div className="d-flex flex-column gap-3">
                    {relatedBlogs.slice(0, 5).map((recentBlog) => (
                      <Link 
                        key={recentBlog.id}
                        to={`/blog/${recentBlog.slug}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div style={{
                          display: 'flex',
                          gap: '15px',
                          padding: '12px',
                          borderRadius: '12px',
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
                            src={recentBlog.featuredImage} 
                            alt={recentBlog.title}
                            style={{ 
                              width: '60px', 
                              height: '60px', 
                              objectFit: 'cover',
                              borderRadius: '10px',
                              background: 'rgba(255,255,255,0.1)'
                            }}
                          />
                          <div>
                            <h6 style={{ 
                              color: '#fff', 
                              fontSize: '13px', 
                              fontWeight: '600',
                              marginBottom: '5px',
                              lineHeight: '1.4'
                            }}>{recentBlog.title}</h6>
                            <small style={{ color: 'rgba(255,255,255,0.5)' }}>{recentBlog.createdAt}</small>
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
