import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommanBanner from '../../components/CommanBanner';
import { IMAGES } from '../../constant/theme';
import { CATEGORIES } from '../../constant/categories';
import { BLOG_POSTS, BlogPost } from '../../constant/affiliateData';

/**
 * Admin Blog Form
 * Add or Edit blog post
 * Routes: /admin/blogs/new, /admin/blogs/edit/:id
 */
export default function AdminBlogForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    featuredImage: '',
    content: '',
    categoryId: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft',
    author: '',
  });

  // Load existing blog if editing
  useEffect(() => {
    if (isEditMode && id) {
      const existingBlog = BLOG_POSTS.find(b => b.id === id);
      if (existingBlog) {
        setFormData(existingBlog);
      }
    }
  }, [id, isEditMode]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    console.log('Saving blog:', formData);
    
    // Show success message and redirect
    alert(isEditMode ? 'Blog post updated successfully!' : 'Blog post created successfully!');
    navigate('/admin/blogs');
  };

  return (
    <div className="page-content bg-light">
      <CommanBanner 
        parentText="Admin" 
        currentText={isEditMode ? 'Edit Blog Post' : 'Add Blog Post'} 
        mainText={isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'} 
        image={IMAGES.BackBg1} 
      />
      
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="bg-white rounded shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">
                    {isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
                  </h4>
                  <Link to="/admin/blogs" className="btn btn-outline-secondary btn-sm">
                    <i className="fas fa-arrow-left me-1" />
                    Back to List
                  </Link>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Basic Info */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Basic Information</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Blog Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
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
                      <label className="form-label">Author</label>
                      <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                      />
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
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Featured Image</h6>
                    <div className="mb-3">
                      <label className="form-label">Featured Image URL *</label>
                      <input
                        type="url"
                        className="form-control"
                        name="featuredImage"
                        value={formData.featuredImage}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                      <small className="text-muted">Enter the URL of the featured image</small>
                    </div>
                    {formData.featuredImage && (
                      <div className="mt-2">
                        <img 
                          src={formData.featuredImage} 
                          alt="Preview" 
                          className="img-thumbnail"
                          style={{ maxWidth: '200px' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">Blog Content</h6>
                    <div className="mb-3">
                      <label className="form-label">Content (HTML/Markdown) *</label>
                      <textarea
                        className="form-control"
                        rows={15}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="<p>Your blog content here...</p>"
                        required
                      />
                      <small className="text-muted">
                        You can use HTML tags for formatting. In a production app, you would use a rich text editor here.
                      </small>
                    </div>
                  </div>

                  {/* SEO */}
                  <div className="mb-4">
                    <h6 className="text-muted mb-3">SEO Settings</h6>
                    
                    <div className="mb-3">
                      <label className="form-label">Meta Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        required
                      />
                      <small className="text-muted">Recommended: 50-60 characters</small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Meta Description *</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        required
                      />
                      <small className="text-muted">Recommended: 150-160 characters</small>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-secondary">
                      <i className="fas fa-save me-2" />
                      {isEditMode ? 'Update Blog Post' : 'Create Blog Post'}
                    </button>
                    <Link to="/admin/blogs" className="btn btn-outline-secondary">
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
