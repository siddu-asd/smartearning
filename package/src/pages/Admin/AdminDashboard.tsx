import { Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import { IMAGES } from '../../constant/theme';
import { useProducts, useBlogs } from '../../hooks/useSupabase';

/**
 * Admin Dashboard
 * Simple overview with links to manage products and blogs
 */
export default function AdminDashboard() {
  const { products } = useProducts();
  const { blogs } = useBlogs();
  
  const productCount = products.length;
  const blogCount = blogs.length;

  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Home" 
        currentText="Admin Dashboard" 
        mainText="Admin Dashboard" 
        image={IMAGES.BackBg1} 
      />
      
      <section className="content-inner">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="bg-white rounded shadow-sm p-4">
                <h4 className="mb-3">Welcome to Admin</h4>
                <p className="text-muted mb-0">
                  Manage your affiliate products and blog posts from here.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Products Card */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <i className="fas fa-box-open fa-4x text-primary" />
                  </div>
                  <h3 className="card-title">Products</h3>
                  <p className="display-4 fw-bold text-primary">{productCount}</p>
                  <p className="text-muted mb-4">Active affiliate products</p>
                  <div className="d-flex gap-2 justify-content-center">
                    <Link to="/admin/products" className="btn btn-outline-secondary">
                      <i className="fas fa-list me-2" />
                      View All
                    </Link>
                    <Link to="/admin/products/new" className="btn btn-secondary">
                      <i className="fas fa-plus me-2" />
                      Add New
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Blogs Card */}
            <div className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-5">
                  <div className="mb-4">
                    <i className="fas fa-newspaper fa-4x text-primary" />
                  </div>
                  <h3 className="card-title">Blog Posts</h3>
                  <p className="display-4 fw-bold text-primary">{blogCount}</p>
                  <p className="text-muted mb-4">Published articles</p>
                  <div className="d-flex gap-2 justify-content-center">
                    <Link to="/admin/blogs" className="btn btn-outline-secondary">
                      <i className="fas fa-list me-2" />
                      View All
                    </Link>
                    <Link to="/admin/blogs/new" className="btn btn-secondary">
                      <i className="fas fa-plus me-2" />
                      Add New
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="bg-white rounded shadow-sm p-4">
                <h5 className="mb-3">Quick Links</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-home me-1" />
                    View Site
                  </Link>
                  <Link to="/deals" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-shopping-bag me-1" />
                    View Shop
                  </Link>
                  <Link to="/blog" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-newspaper me-1" />
                    View Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
