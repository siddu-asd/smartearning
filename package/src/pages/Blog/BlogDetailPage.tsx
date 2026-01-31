import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import CommanBanner from '../../components/CommanBanner';
import { BlogPost } from '../../constant/affiliateData';
import { useBlogBySlug, useBlogs } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Blog Detail Page
 * Displays full blog content from Supabase
 * Route: /blog/:slug
 */
export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
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
      <div className="page-content bg-light">
        <CommanBanner 
          parentText="Blog" 
          currentText="Loading..." 
          mainText="Loading Article" 
          image={IMAGES.BackBg1} 
        />
        <section className="content-inner text-center">
          <div className="container py-5">
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading article...</p>
          </div>
        </section>
      </div>
    );
  }

  if (!blogWithCategory) {
    return (
      <div className="page-content bg-light">
        <CommanBanner 
          parentText="Blog" 
          currentText="Article Not Found" 
          mainText="Article Not Found" 
          image={IMAGES.BackBg1} 
        />
        <section className="content-inner text-center">
          <div className="container">
            <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3" />
            <h3>Article not found</h3>
            <p className="text-muted">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="btn btn-secondary">
              Browse All Articles
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="page-content bg-light">
        {/* Modern Gradient Hero Section */}
        <section 
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '60px 0 80px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            pointerEvents: 'none'
          }} />
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '20px' }}>
              <ol style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontSize: '14px'
              }}>
                <li>
                  <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                    Home
                  </Link>
                </li>
                <li style={{ color: 'rgba(255,255,255,0.5)' }}>›</li>
                <li>
                  <Link to="/blog" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                    Blog
                  </Link>
                </li>
                <li style={{ color: 'rgba(255,255,255,0.5)' }}>›</li>
                <li style={{ color: '#fff' }}>{blogWithCategory.title.substring(0, 30)}...</li>
              </ol>
            </nav>
            
            {/* Title & Meta */}
            <h1 style={{
              color: '#fff',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: '15px',
              maxWidth: '800px'
            }}>
              {blogWithCategory.title}
            </h1>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '20px',
              color: 'rgba(255,255,255,0.9)'
            }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '13px'
              }}>
                📁 {blogWithCategory.category?.name || 'Article'}
              </span>
              <span style={{ fontSize: '14px' }}>
                📅 {blogWithCategory.createdAt}
              </span>
            </div>
          </div>
        </section>
        
        {/* Featured Image - Smaller and Fully Visible */}
        <section style={{ marginTop: '-40px', position: 'relative', zIndex: 2 }}>
          <div className="container">
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              background: '#fff'
            }}>
              <img 
                src={blogWithCategory.featuredImage} 
                alt={blogWithCategory.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </section>
        
        <section className="content-inner" style={{ paddingTop: '40px' }}>
          <div className="container">
            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                <article className="blog-detail bg-white rounded shadow-sm overflow-hidden">
                  {/* Article Content */}
                  <div className="article-content p-4">
                    {/* Content */}
                    <div 
                      className="article-body"
                      style={{ fontSize: '16px', lineHeight: '1.8' }}
                      dangerouslySetInnerHTML={{ __html: blogWithCategory.content }}
                    />
                    
                  </div>
                </article>

                {/* Share Buttons */}
                <div className="share-section bg-white rounded shadow-sm p-4 mt-4">
                  <h6 className="mb-3">Share this article:</h6>
                  <div className="d-flex gap-2">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogWithCategory.title)}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fab fa-twitter me-1" />
                      Twitter
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fab fa-facebook-f me-1" />
                      Facebook
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blogWithCategory.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary btn-sm"
                    >
                      <i className="fab fa-linkedin-in me-1" />
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                  <div className="related-articles mt-4">
                    <h5 className="mb-4">Related Articles</h5>
                    <div className="row">
                      {relatedBlogs.map((relatedBlog) => (
                        <div key={relatedBlog.id} className="col-md-4 mb-3">
                          <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                            <Link to={`/blog/${relatedBlog.slug}`}>
                              <div style={{ overflow: 'hidden', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }}>
                                <img 
                                  src={relatedBlog.featuredImage} 
                                  alt={relatedBlog.title}
                                  style={{ 
                                    maxWidth: '100%', 
                                    maxHeight: '120px', 
                                    objectFit: 'contain',
                                    display: 'block'
                                  }}
                                />
                              </div>
                            </Link>
                            <div className="card-body">
                              <h6 className="card-title small">
                                <Link to={`/blog/${relatedBlog.slug}`} className="text-dark text-decoration-none">
                                  {relatedBlog.title}
                                </Link>
                              </h6>
                              <small className="text-muted">{relatedBlog.createdAt}</small>
                            </div>
                          </div>
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
                  <div className="bg-white rounded shadow-sm p-4 mb-4">
                    <h6 className="fw-bold mb-3">Browse More</h6>
                    <Link to="/blog" className="btn btn-outline-secondary w-100 mb-2">
                      <i className="fas fa-newspaper me-2" />
                      All Articles
                    </Link>
                    <Link to="/deals" className="btn btn-secondary w-100">
                      <i className="fas fa-shopping-bag me-2" />
                      Shop Products
                    </Link>
                  </div>

                  {/* Recent Posts */}
                  <div className="bg-white rounded shadow-sm p-4 mb-4">
                    <h6 className="fw-bold mb-3">Recent Posts</h6>
                    <ul className="list-unstyled mb-0">
                      {relatedBlogs.slice(0, 5).map((recentBlog) => (
                        <li key={recentBlog.id} className="mb-3 pb-3 border-bottom">
                          <Link 
                            to={`/blog/${recentBlog.slug}`}
                            className="text-dark text-decoration-none d-flex"
                          >
                            <img 
                              src={recentBlog.featuredImage} 
                              alt={recentBlog.title}
                              className="me-3 rounded"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="mb-1 small">{recentBlog.title}</h6>
                              <small className="text-muted">{recentBlog.createdAt}</small>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
