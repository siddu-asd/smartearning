import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '../../../../lib/db';
import ProductDetailClient from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.title} - StudentCrazyDeals` : 'Product',
    description: product?.description?.slice(0, 160) || 'View this amazing deal.',
  };
}
