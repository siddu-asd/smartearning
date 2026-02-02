import { getProductBySlug, getProducts } from '../../../../lib/db';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

/**
 * Product Detail Page - Server Component
 * Route: /product/[slug]
 */
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found - StudentCrazyDeals',
    };
  }

  return {
    title: `${product.title} - StudentCrazyDeals`,
    description: `Get the best deal on ${product.title}. Save big today!`,
  };
}
