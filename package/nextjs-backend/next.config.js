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
    return {
      beforeFiles: [
        // Keep admin and API routes in Next.js
      ],
      afterFiles: [
        // Serve frontend static files for non-admin routes
        {
          source: '/:path((?!admin|api|_next|site).*)',
          destination: '/site/:path*',
        },
      ],
      fallback: [
        // Fallback to frontend index.html for SPA routing
        {
          source: '/:path((?!admin|api|_next|site).*)',
          destination: '/site/index.html',
        },
      ],
    };
  },
};

module.exports = nextConfig;
