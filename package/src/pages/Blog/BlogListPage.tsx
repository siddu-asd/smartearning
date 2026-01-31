import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import { CATEGORIES } from '../../constant/categories';
import { BlogPost } from '../../constant/affiliateData';
import { useBlogs } from '../../hooks/useSupabase';
import { IMAGES } from '../../constant/theme';

/**
 * Blog List Page - 2 Columns with Sidebar
 * Displays all published blog posts from Supabase
 * Route: /blog
 */
export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Fetch blogs from Supabase
  const { blogs: supabaseBlogs } = useBlogs();
  
  // Transform Supabase blogs to match component format
  const allBlogs: BlogPost[] = supabaseBlogs.map(b => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    featuredImage: b.featured_image || IMAGES.BackBg1, // Use actual image from Supabase
    content: b.content || '',
    categoryId: '1', // Default category
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
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Home" 
        currentText="Blog" 
        mainText="Deal Tips & Saving Guides" 
        image={IMAGES.HeroBanner4} 
      />
      
      <section className="content-inner-3">
        <div className="container">
          <div className="row">
            {/* Main Content - Blog Grid (2 columns) */}
            <div className="col-lg-8">
              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">
                  {selectedCategory === 'all' 
                    ? 'All Saving Tips' 
                    : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h5>
                <span className="text-muted small">
                  {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Blog Grid */}
              {filteredBlogs.length > 0 ? (
                <div className="row">
                  {filteredBlogs.map((blog) => (
                    <div key={blog.id} className="col-md-6 mb-4">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 bg-white rounded">
                  <i className="fas fa-newspaper fa-3x text-muted mb-3" />
                  <h5>No tips found</h5>
                  <p className="text-muted">Try selecting a different category</p>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setSelectedCategory('all')}
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
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <h6 className="fw-bold mb-3">
                    <i className="fas fa-folder me-2" />
                    Categories
                  </h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <button
                        className={`btn btn-sm w-100 text-start ${selectedCategory === 'all' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                        onClick={() => setSelectedCategory('all')}
                      >
                        All Tips
                      </button>
                    </li>
                    {CATEGORIES.map((cat) => {
                      const count = allBlogs.filter(b => b.categoryId === cat.id).length;
                      if (count === 0) return null;
                      return (
                        <li key={cat.id} className="mb-2">
                          <button
                            className={`btn btn-sm w-100 text-start ${selectedCategory === cat.id ? 'btn-secondary' : 'btn-outline-secondary'}`}
                            onClick={() => setSelectedCategory(cat.id)}
                          >
                            {cat.name}
                            <span className="badge bg-light text-dark float-end">{count}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <h6 className="fw-bold mb-3">
                    <i className="fas fa-clock me-2" />
                    Latest Tips
                  </h6>
                  <ul className="list-unstyled mb-0">
                    {allBlogs.slice(0, 5).map((blog) => (
                      <li key={blog.id} className="mb-3 pb-3 border-bottom">
                        <Link 
                          to={`/blog/${blog.slug}`}
                          className="text-dark text-decoration-none d-flex"
                        >
                          <img 
                            src={blog.featuredImage} 
                            alt={blog.title}
                            className="me-3 rounded"
                            style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f8f9fa' }}
                          />
                          <div>
                            <h6 className="mb-1 small">{blog.title}</h6>
                            <small className="text-muted">{blog.createdAt}</small>
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
  );
}

/**
 * Blog Card Component
 */
function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Link to={`/blog/${blog.slug}`}>
        <div style={{ overflow: 'hidden', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
          <img 
            src={blog.featuredImage} 
            alt={blog.title}
            style={{ 
              maxWidth: '100%',
              maxHeight: '150px', 
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </Link>
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <span className="badge bg-secondary me-2">{blog.category?.name || 'Article'}</span>
          <small className="text-muted">{blog.createdAt}</small>
        </div>
        <h5 className="card-title">
          <Link to={`/blog/${blog.slug}`} className="text-dark text-decoration-none">
            {blog.title}
          </Link>
        </h5>
        <p className="card-text text-muted small" dangerouslySetInnerHTML={{ 
          __html: blog.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...' 
        }} />
      </div>
      <div className="card-footer bg-transparent border-0 pt-0">
        <Link 
          to={`/blog/${blog.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          Read More
          <i className="fas fa-arrow-right ms-2" />
        </Link>
      </div>
    </div>
  );
}
