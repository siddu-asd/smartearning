/**
 * Admin Dashboard Page
 * /admin/dashboard
 */
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import LogoutButton from './LogoutButton';

export default async function AdminDashboard() {
  // Check authentication
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch stats using admin client
  const adminClient = createAdminClient();
  
  const [productsRes, blogsRes] = await Promise.all([
    adminClient.from('product').select('id, is_active'),
    adminClient.from('blogs').select('id, published'),
  ]);

  const totalProducts = productsRes.data?.length || 0;
  const activeProducts = productsRes.data?.filter(p => p.is_active).length || 0;
  const totalBlogs = blogsRes.data?.length || 0;
  const publishedBlogs = blogsRes.data?.filter(b => b.published).length || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Products</h3>
            <p className="text-3xl font-bold">{totalProducts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Active Products</h3>
            <p className="text-3xl font-bold text-green-600">{activeProducts}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Blogs</h3>
            <p className="text-3xl font-bold">{totalBlogs}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Published Blogs</h3>
            <p className="text-3xl font-bold text-green-600">{publishedBlogs}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/add-product"
            className="bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700 transition"
          >
            + Add Product
          </Link>
          <Link 
            href="/admin/add-blog"
            className="bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700 transition"
          >
            + Add Blog
          </Link>
          <Link 
            href="/admin/products"
            className="bg-gray-600 text-white rounded-lg p-4 text-center hover:bg-gray-700 transition"
          >
            Manage Products
          </Link>
          <Link 
            href="/admin/blogs"
            className="bg-gray-600 text-white rounded-lg p-4 text-center hover:bg-gray-700 transition"
          >
            Manage Blogs
          </Link>
        </div>
      </main>
    </div>
  );
}
