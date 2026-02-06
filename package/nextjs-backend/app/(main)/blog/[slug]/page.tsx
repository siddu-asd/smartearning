import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '../../../../lib/db';
import BlogDetailClient from './BlogDetailClient';

// Disable caching to always show latest blogs
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  // Get related blogs (excluding current one)
  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs.filter(b => b.id !== blog.id).slice(0, 3);

  return <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  return {
    title: blog ? `${blog.title} - StudentsCrazyDeals` : 'Blog Post',
    description: blog?.content?.slice(0, 160) || 'Read our latest blog post.',
  };
}
