import { getProducts } from '../../../lib/db';
import DealsClient from './DealsClient';

interface Props {
  searchParams: Promise<{ cat?: string }>;
}

export default async function DealsPage({ searchParams }: Props) {
  const products = await getProducts();
  const params = await searchParams;
  return <DealsClient products={products} initialCategory={params.cat} />;
}

export const metadata = {
  title: 'All Deals - StudentCrazyDeals',
  description: 'Browse all the best deals on laptops, phones, headphones, and more.',
};
