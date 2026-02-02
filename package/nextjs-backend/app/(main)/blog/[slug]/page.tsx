import { notFound } from 'next/navigation';
import { getBlogBySlug } from '../../../../lib/db';
import BlogDetailClient from './BlogDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  return {
    title: blog ? `${blog.title} - StudentCrazyDeals` : 'Blog Post',
    description: blog?.content?.slice(0, 160) || 'Read our latest blog post.',
  };
}
