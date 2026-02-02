import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for the frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product types
export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image_url?: string;
  price?: number;
  mrp?: number;
  original_price?: number;
  discounted_price?: number;
  sale_price?: number;
  affiliate_link: string;
  category?: string;
  created_at?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content?: string;
  featured_image?: string;
  created_at: string;
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

// Fetch all blogs
export async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return data || [];
}

// Fetch single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }

  return data;
}
