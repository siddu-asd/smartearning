/**
 * Root page - serves static frontend or redirects to admin
 * The Vite frontend is served from /site via rewrites
 */
export default function HomePage() {
  // In production, this should never be reached
  // because rewrites will serve the static frontend
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/site/index.html" />
      </head>
      <body>
        <p>Redirecting to main site...</p>
      </body>
    </html>
  );
}
