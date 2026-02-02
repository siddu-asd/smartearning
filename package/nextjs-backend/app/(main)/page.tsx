import { getProducts } from '../../lib/db';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const products = await getProducts();
  return <HomeClient products={products} />;
}

export const metadata = {
  title: 'StudentCrazyDeals - Best Deals for Students',
  description: 'Find the best deals on laptops, phones, headphones, and more. Save big on tech essentials!',
};
