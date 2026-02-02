import { getBlogs } from '../../../lib/db';
import BlogClient from './BlogClient';

export default async function BlogPage() {
  const blogs = await getBlogs();
  return <BlogClient blogs={blogs} />;
}

export const metadata = {
  title: 'Blog - StudentCrazyDeals',
  description: 'Tips, guides, and insights to help you save money.',
};
