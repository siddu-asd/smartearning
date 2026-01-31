/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Serve the Vite-built frontend
  async rewrites() {
    return [
      // Root path serves the frontend
      {
        source: '/',
        destination: '/site/index.html',
      },
      // Static assets from site folder
      {
        source: '/assets/:path*',
        destination: '/site/assets/:path*',
      },
      // All other non-admin/api routes serve frontend SPA
      {
        source: '/:path((?!admin|api|_next|site).*)',
        destination: '/site/index.html',
      },
    ];
  },
};

module.exports = nextConfig;
