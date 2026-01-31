/**
 * Root page - redirects to the React frontend
 */
export default function HomePage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/site/index.html" />
        <script dangerouslySetInnerHTML={{ __html: "window.location.href='/site/index.html'" }} />
      </head>
      <body>
        <p>Loading StudentCrazyDeals...</p>
      </body>
    </html>
  );
}
