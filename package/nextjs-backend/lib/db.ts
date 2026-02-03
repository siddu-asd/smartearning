import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Hardcoded Supabase credentials (same as in lib/supabase/client.ts)
const SUPABASE_URL = 'https://isseiuhezyxyuawtbajk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MDIsImV4cCI6MjA4NTI3NjcwMn0.HLwNG4v0VQjJVaNHAIV0AhuTj3ZNjRnYPHBzJqHuICE';

// Create a single supabase client
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase;
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabase;
}

export { supabase, getSupabaseClient };

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
  image_url?: string;
  category?: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  published?: boolean;
  created_at: string;
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const client = getSupabaseClient();
  
  const { data, error } = await client
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
  const client = getSupabaseClient();
  
  const { data, error } = await client
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
  const client = getSupabaseClient();
  
  const { data, error } = await client
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
  const client = getSupabaseClient();
  
  const { data, error } = await client
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
