import { Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import { IMAGES } from '../../constant/theme';
import { BLOG_POSTS, getBlogWithCategory } from '../../constant/affiliateData';

/**
 * Admin Blog List
 * View and manage all blog posts
 * Route: /admin/blogs
 */
export default function AdminBlogList() {
  const blogs = BLOG_POSTS.map(getBlogWithCategory);

  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Admin" 
        currentText="Blog Posts" 
        mainText="Manage Blog Posts" 
        image={IMAGES.BackBg1} 
      />
      
      <section className="content-inner">
        <div className="container">
          <div className="bg-white rounded shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">All Blog Posts ({blogs.length})</h4>
              <div className="d-flex gap-2">
                <Link to="/admin" className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-arrow-left me-1" />
                  Dashboard
                </Link>
                <Link to="/admin/blogs/new" className="btn btn-secondary btn-sm">
                  <i className="fas fa-plus me-1" />
                  Add Post
                </Link>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td>
                        <img 
                          src={blog.featuredImage} 
                          alt={blog.title}
                          style={{ width: '80px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <strong>{blog.title}</strong>
                        <br />
                        <small className="text-muted">{blog.slug}</small>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {blog.category?.name}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${blog.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                          {blog.status}
                        </span>
                      </td>
                      <td>
                        <small>{blog.createdAt}</small>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link 
                            to={`/blog/${blog.slug}`}
                            className="btn btn-outline-secondary"
                            title="View"
                            target="_blank"
                          >
                            <i className="fas fa-eye" />
                          </Link>
                          <Link 
                            to={`/admin/blogs/edit/${blog.id}`}
                            className="btn btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit" />
                          </Link>
                          <button 
                            className="btn btn-outline-danger"
                            title="Delete"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this blog post?')) {
                                console.log('Delete blog:', blog.id);
                              }
                            }}
                          >
                            <i className="fas fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-5">
                <i className="fas fa-newspaper fa-3x text-muted mb-3" />
                <h5>No blog posts found</h5>
                <p className="text-muted">Start by adding your first blog post.</p>
                <Link to="/admin/blogs/new" className="btn btn-secondary">
                  <i className="fas fa-plus me-2" />
                  Add First Post
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
