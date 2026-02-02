import { getBlogs } from '../../../lib/db';
import BlogListClient from './BlogListClient';

/**
 * Blog List Page - Server Component
 * Route: /blog
 */
export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogListClient initialBlogs={blogs} />;
}

export const metadata = {
  title: 'Blog - StudentCrazyDeals',
  description: 'Read our latest articles on deals, savings tips, and product reviews.',
};
