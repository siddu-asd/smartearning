import { getProducts } from '../../../../lib/db';
import DealsClient from '../DealsClient';

/**
 * Category Deals Page - Server Component
 * Route: /deals/[categorySlug]
 */
interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export default async function CategoryDealsPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const products = await getProducts();
  return <DealsClient initialProducts={products} categorySlug={categorySlug} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const formattedName = categorySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedName} - StudentCrazyDeals`,
    description: `Best deals on ${formattedName}. Save big on your favorite products!`,
  };
}
