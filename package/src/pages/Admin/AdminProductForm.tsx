import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import { IMAGES } from '../../constant/theme';
import { CATEGORIES } from '../../constant/categories';
import { AFFILIATE_PRODUCTS, AffiliateProduct } from '../../constant/affiliateData';

/**
 * Admin Product Form
 * Add or Edit affiliate product
 * Routes: /admin/products/new, /admin/products/edit/:id
 */
export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState<Partial<AffiliateProduct>>({
    name: '',
    slug: '',
    images: [],
    shortDescription: '',
    fullDescription: '',
    pros: [''],
    cons: [''],
    categoryId: '',
    affiliateUrl: '',
    buttonText: 'Buy Now',
    metaTitle: '',
    metaDescription: '',
    status: 'active',
  });

  const [imageUrls, setImageUrls] = useState<string>('');

  // Load existing product if editing
  useEffect(() => {
    if (isEditMode && id) {
      const existingProduct = AFFILIATE_PRODUCTS.find(p => p.id === id);
      if (existingProduct) {
        setFormData(existingProduct);
        setImageUrls(existingProduct.images.join('\n'));
      }
    }
  }, [id, isEditMode]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Handle pros/cons array changes
  const handleArrayChange = (field: 'pros' | 'cons', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev[field] || [])];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayItem = (field: 'pros' | 'cons') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (field: 'pros' | 'cons', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  // Handle image URLs
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setImageUrls(value);
    const images = value.split('\n').filter(url => url.trim());
    setFormData(prev => ({ ...prev, images }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    console.log('Saving product:', formData);
    
    // Show success message and redirect
    alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
    navigate('/admin/products');
  };

  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Admin" 
        currentText={isEditMode ? 'Edit Product' : 'Add Product'} 
        mainText={isEditMode ? 'Edit Product' : 'Add New Product'} 
        image={IMAGES.BackBg1} 
      />
      
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="bg-white rounded shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">
                    {isEditMode ? 'Edit Product' : 'Add New Affiliate Product'}
                  </h4>
                  <Link to="/admin/products" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-1" />
                    Back to List
                  </Link>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Basic Info */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Basic Information</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Product Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Slug *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                      />
                      <small className="text-muted">URL-friendly name (auto-generated)</small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Category *</label>
                      <select
                        className="form-select"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status *</label>
                      <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Product Images</h6>
                    <div className="mb-3">
                      <label className="form-label">Image URLs (one per line)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={imageUrls}
                        onChange={handleImageUrlChange}
                        placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                      />
                      <small className="text-muted">Enter each image URL on a new line</small>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Descriptions</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Short Description *</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Full Description *</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="mb-4">
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="text-muted mb-3">Pros</h6>
                        {formData.pros?.map((pro, index) => (
                          <div key={index} className="input-group mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={pro}
                              onChange={(e) => handleArrayChange('pros', index, e.target.value)}
                              placeholder="Enter a pro"
                            />
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeArrayItem('pros', index)}
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          onClick={() => addArrayItem('pros')}
                        >
                          <i className="fas fa-plus me-1" />
                          Add Pro
                        </button>
                      </div>

                      <div className="col-md-6">
                        <h6 className="text-muted mb-3">Cons</h6>
                        {formData.cons?.map((con, index) => (
                          <div key={index} className="input-group mb-2">
                            <input
                              type="text"
                              className="form-control"
                              value={con}
                              onChange={(e) => handleArrayChange('cons', index, e.target.value)}
                              placeholder="Enter a con"
                            />
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => removeArrayItem('cons', index)}
                            >
                              <i className="fas fa-times" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => addArrayItem('cons')}
                        >
                          <i className="fas fa-plus me-1" />
                          Add Con
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Affiliate Settings */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Affiliate Settings</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Affiliate URL *</label>
                      <input
                        type="url"
                        className="form-control"
                        name="affiliateUrl"
                        value={formData.affiliateUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/product?tag=yourtag-20"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Button Text</label>
                      <input
                        type="text"
                        className="form-control"
                        name="buttonText"
                        value={formData.buttonText}
                        onChange={handleChange}
                      />
                      <small className="text-muted">Default: "Buy Now"</small>
                    </div>
                  </div>

                  {/* SEO */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">SEO Settings</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Meta Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-secondary">
                      <i className="fas fa-save me-2" />
                      {isEditMode ? 'Update Product' : 'Create Product'}
                    </button>
                    <Link to="/admin/products" className="btn btn-outline-secondary">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
