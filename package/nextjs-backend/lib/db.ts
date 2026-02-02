import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Create a single supabase client for the frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if env vars are available
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not set');
    return null;
  }
  
  supabase = createClient(supabaseUrl, supabaseAnonKey);
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
  created_at: string;
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  const client = getSupabaseClient();
  if (!client) return [];
  
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
  if (!client) return null;
  
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
  if (!client) return [];
  
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
  if (!client) return null;
  
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
