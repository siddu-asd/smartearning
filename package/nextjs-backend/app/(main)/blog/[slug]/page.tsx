import { getBlogBySlug, getBlogs } from '../../../../lib/db';
import BlogDetailClient from './BlogDetailClient';
import { notFound } from 'next/navigation';

/**
 * Blog Detail Page - Server Component
 * Route: /blog/[slug]
 */
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs
  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found - StudentCrazyDeals',
    };
  }

  return {
    title: `${blog.title} - StudentCrazyDeals`,
    description: blog.content?.substring(0, 160) || `Read ${blog.title} on StudentCrazyDeals`,
  };
}
