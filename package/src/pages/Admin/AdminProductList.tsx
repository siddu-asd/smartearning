import { Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import { IMAGES } from '../../constant/theme';
import { AFFILIATE_PRODUCTS, getProductWithCategory } from '../../constant/affiliateData';

/**
 * Admin Product List
 * View and manage all affiliate products
 * Route: /admin/products
 */
export default function AdminProductList() {
  const products = AFFILIATE_PRODUCTS.map(getProductWithCategory);

  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Admin" 
        currentText="Products" 
        mainText="Manage Products" 
        image={IMAGES.BackBg1} 
      />
      
      <section className="content-inner">
        <div className="container">
          <div className="bg-white rounded shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">All Products ({products.length})</h4>
              <div className="d-flex gap-2">
                <Link to="/admin" className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-arrow-left me-1" />
                  Dashboard
                </Link>
                <Link to="/admin/products/new" className="btn btn-secondary btn-sm">
                  <i className="fas fa-plus me-1" />
                  Add Product
                </Link>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          className="rounded"
                        />
                      </td>
                      <td>
                        <strong>{product.name}</strong>
                        <br />
                        <small className="text-muted">{product.slug}</small>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {product.category?.name}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${product.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link 
                            to={`/product/${product.slug}`}
                            className="btn btn-outline-secondary"
                            title="View"
                            target="_blank"
                          >
                            <i className="fas fa-eye" />
                          </Link>
                          <Link 
                            to={`/admin/products/edit/${product.id}`}
                            className="btn btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit" />
                          </Link>
                          <button 
                            className="btn btn-outline-danger"
                            title="Delete"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this product?')) {
                                console.log('Delete product:', product.id);
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

            {products.length === 0 && (
              <div className="text-center py-5">
                <i className="fas fa-box-open fa-3x text-muted mb-3" />
                <h5>No products found</h5>
                <p className="text-muted">Start by adding your first affiliate product.</p>
                <Link to="/admin/products/new" className="btn btn-secondary">
                  <i className="fas fa-plus me-2" />
                  Add First Product
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
