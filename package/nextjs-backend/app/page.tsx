import { getProducts } from '../lib/db';
import HomeClient from './(main)/HomeClient';

/**
 * Home Page - Server Component
 * Fetches data on server and passes to client component
 */
export default async function HomePage() {
  const products = await getProducts();

  return <HomeClient initialProducts={products} />;
}

// Metadata for SEO
export const metadata = {
  title: 'StudentCrazyDeals - Best Deals for Students',
  description: 'Find the best deals on laptops, phones, headphones, and more. Save big on tech essentials!',
};
