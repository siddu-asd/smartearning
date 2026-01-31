/**
 * Admin Dashboard Page - Clean Professional Design
 * /admin/dashboard
 */
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import LogoutButton from './LogoutButton';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  if (productsRes.error) {
    console.error('Dashboard - Products fetch error:', productsRes.error);
  }
  if (blogsRes.error) {
    console.error('Dashboard - Blogs fetch error:', blogsRes.error);
  }

  const totalProducts = productsRes.data?.length ?? 0;
  const activeProducts = productsRes.data?.filter(p => p.is_active).length ?? 0;
  const totalBlogs = blogsRes.data?.length ?? 0;
  const publishedBlogs = blogsRes.data?.filter(b => b.published).length ?? 0;

  const stats = [
    { title: 'Total Products', value: totalProducts, icon: '📦', color: 'bg-blue-500', bgLight: 'bg-blue-50' },
    { title: 'Active Products', value: activeProducts, icon: '✅', color: 'bg-green-500', bgLight: 'bg-green-50' },
    { title: 'Total Blogs', value: totalBlogs, icon: '📝', color: 'bg-amber-500', bgLight: 'bg-amber-50' },
    { title: 'Published Blogs', value: publishedBlogs, icon: '🚀', color: 'bg-purple-500', bgLight: 'bg-purple-50' },
  ];

  const quickActions = [
    { title: 'Add Product', href: '/admin/add-product', icon: '➕', desc: 'Create new deal', color: 'bg-blue-600 hover:bg-blue-700' },
    { title: 'Add Blog', href: '/admin/add-blog', icon: '✍️', desc: 'Write new article', color: 'bg-green-600 hover:bg-green-700' },
    { title: 'Manage Products', href: '/admin/products', icon: '📋', desc: 'View all products', color: 'bg-purple-600 hover:bg-purple-700' },
    { title: 'Manage Blogs', href: '/admin/blogs', icon: '📰', desc: 'View all posts', color: 'bg-amber-600 hover:bg-amber-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your deals and content</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
                <span className="text-gray-700 text-sm truncate max-w-[150px]">{user.email}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link 
                key={index}
                href={action.href}
                className={`${action.color} rounded-xl p-6 text-white transition-all hover:scale-105 hover:shadow-lg`}
              >
                <span className="text-3xl block mb-3">{action.icon}</span>
                <h3 className="font-semibold text-lg">{action.title}</h3>
                <p className="text-white/80 text-sm mt-1">{action.desc}</p>
                <span className="inline-flex items-center mt-3 text-sm font-medium">
                  Go → 
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <span className="text-2xl">🎯</span>
                <h4 className="font-semibold text-gray-900 mt-2">Quality Images</h4>
                <p className="text-gray-600 text-sm mt-1">High-quality images increase engagement</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <span className="text-2xl">📈</span>
                <h4 className="font-semibold text-gray-900 mt-2">Detailed Descriptions</h4>
                <p className="text-gray-600 text-sm mt-1">Help users understand deals better</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <span className="text-2xl">🔗</span>
                <h4 className="font-semibold text-gray-900 mt-2">Verify Links</h4>
                <p className="text-gray-600 text-sm mt-1">Always test links before publishing</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
