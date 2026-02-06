'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Blog } from '@/lib/types';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    featured_image: '',
    meta_title: '',
    meta_description: '',
    category: '',
    published: false,
    scheduled_at: '',
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blogs?id=${blogId}`);
        if (response.ok) {
          const data = await response.json();
          const blogs = data.data || data;
          const blog = Array.isArray(blogs) 
            ? blogs.find((b: Blog) => b.id === blogId)
            : blogs;
          
          if (blog) {
            setFormData({
              title: blog.title || '',
              slug: blog.slug || '',
              content: blog.content || '',
              featured_image: blog.featured_image || '',
              meta_title: blog.meta_title || '',
              meta_description: blog.meta_description || '',
              category: blog.category || '',
              published: blog.published ?? false,
              scheduled_at: blog.scheduled_at ? new Date(blog.scheduled_at).toISOString().slice(0, 16) : '',
            });
          } else {
            setError('Blog post not found');
          }
        } else {
          setError('Failed to fetch blog post');
        }
      } catch {
        setError('Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      const result = await response.json();

      if (response.ok && result.url) {
        setFormData({ ...formData, featured_image: result.url });
      } else {
        setError(result.error || 'Failed to upload image');
      }
    } catch {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        router.push('/admin/blogs');
      } else {
        setError(result.error || 'Failed to update blog post');
      }
    } catch {
      setError('Failed to update blog post');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, slug });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <Link
            href="/admin/blogs"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            ← Back to Blogs
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Top 10 Student Laptops for 2025"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Slug *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="top-10-student-laptops-2025"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Tech Reviews">Tech Reviews</option>
              <option value="Study Tips">Study Tips</option>
              <option value="Deals & Discounts">Deals & Discounts</option>
              <option value="Student Life">Student Life</option>
              <option value="Buying Guides">Buying Guides</option>
              <option value="Budget Tips">Budget Tips</option>
            </select>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="flex items-start gap-4">
              {formData.featured_image && (
                <img
                  src={formData.featured_image}
                  alt="Preview"
                  className="w-32 h-20 object-cover rounded-lg border"
                />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                <input
                  type="text"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="Or paste image URL"
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (HTML) *
            </label>
            <textarea
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="<p>Your blog content here...</p>"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supports HTML formatting: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;a&gt;, etc.
            </p>
          </div>

          {/* SEO Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SEO-optimized title (50-60 characters)"
                  maxLength={70}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.meta_title.length}/70 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description for search results (150-160 characters)"
                  maxLength={170}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.meta_description.length}/170 characters
                </p>
              </div>
            </div>
          </div>

          {/* Published Status */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Publishing Options</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Publish Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.scheduled_at 
                    ? `Blog will be published automatically on ${new Date(formData.scheduled_at).toLocaleString()}`
                    : 'Set the date and time when this blog should be published'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Publish immediately (ignore schedule, make visible now)
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {saving ? 'Saving...' : 'Update Blog Post'}
            </button>
            <Link
              href="/admin/blogs"
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
