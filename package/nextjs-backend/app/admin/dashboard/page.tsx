/**
 * Admin Dashboard Page - Modern Redesign
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

  // Debug logging
  console.log('Dashboard - Products response:', JSON.stringify(productsRes, null, 2));
  console.log('Dashboard - Blogs response:', JSON.stringify(blogsRes, null, 2));

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
  
  console.log('Dashboard - Stats:', { totalProducts, activeProducts, totalBlogs, publishedBlogs });

  const stats = [
    { 
      title: 'Total Products', 
      value: totalProducts, 
      icon: '📦', 
      color: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-500/10 to-purple-600/10'
    },
    { 
      title: 'Active Products', 
      value: activeProducts, 
      icon: '✅', 
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10'
    },
    { 
      title: 'Total Blogs', 
      value: totalBlogs, 
      icon: '📝', 
      color: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500/10 to-red-600/10'
    },
    { 
      title: 'Published Blogs', 
      value: publishedBlogs, 
      icon: '🚀', 
      color: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-500/10 to-rose-600/10'
    },
  ];

  const quickActions = [
    { 
      title: 'Add Product', 
      href: '/admin/add-product', 
      icon: '➕', 
      desc: 'Create new deal',
      color: 'from-blue-600 to-indigo-700'
    },
    { 
      title: 'Add Blog', 
      href: '/admin/add-blog', 
      icon: '✍️', 
      desc: 'Write new article',
      color: 'from-green-600 to-teal-700'
    },
    { 
      title: 'Manage Products', 
      href: '/admin/products', 
      icon: '📋', 
      desc: 'View all products',
      color: 'from-purple-600 to-violet-700'
    },
    { 
      title: 'Manage Blogs', 
      href: '/admin/blogs', 
      icon: '📰', 
      desc: 'View all posts',
      color: 'from-orange-600 to-amber-700'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-500/5 to-transparent" />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                <span className="text-3xl">🎛️</span>
                Admin Dashboard
              </h1>
              <p className="text-white/60 text-sm mt-1">Welcome back! Manage your deals and content</p>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <span className="text-lg">👤</span>
                <span className="text-white/80 text-sm truncate max-w-[150px]">{user.email}</span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Overview Stats
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden group hover:scale-105 transition-all duration-300`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{stat.icon}</span>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-white text-lg font-bold">#</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link 
                key={index}
                href={action.href}
                className={`group relative bg-gradient-to-br ${action.color} rounded-2xl p-6 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <div className="relative z-10">
                  <span className="text-4xl block mb-4">{action.icon}</span>
                  <h3 className="text-white font-bold text-lg mb-1">{action.title}</h3>
                  <p className="text-white/70 text-sm">{action.desc}</p>
                  <div className="mt-4 flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                    Go →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="mt-10 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Quick Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-2xl">🎯</span>
              <h4 className="text-white font-semibold mt-2">Add Quality Images</h4>
              <p className="text-white/60 text-sm mt-1">High-quality product images increase engagement</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-2xl">📈</span>
              <h4 className="text-white font-semibold mt-2">Write Detailed Descriptions</h4>
              <p className="text-white/60 text-sm mt-1">Help users understand the deals better</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <span className="text-2xl">🔗</span>
              <h4 className="text-white font-semibold mt-2">Verify Affiliate Links</h4>
              <p className="text-white/60 text-sm mt-1">Always test your links before publishing</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
