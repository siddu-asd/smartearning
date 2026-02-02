import { getProducts } from '../../../lib/db';
import DealsClient from './DealsClient';

/**
 * Deals Page - Server Component
 * Route: /deals
 */
export default async function DealsPage() {
  const products = await getProducts();
  return <DealsClient initialProducts={products} />;
}

export const metadata = {
  title: 'All Deals - StudentCrazyDeals',
  description: 'Browse all the best deals on laptops, phones, headphones, and more.',
};
