/**
 * Supabase Client for React Frontend
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://isseiuhezyxyuawtbajk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MDIsImV4cCI6MjA4NTI3NjcwMn0.HLwNG4v0VQjJVaNHAIV0AhuTj3ZNjRnYPHBzJqHuICE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all products
export async function getProducts() {
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
export async function getProductBySlug(slug: string) {
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

// Fetch all published blogs
export async function getBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
}

// Fetch single blog by slug
export async function getBlogBySlug(slug: string) {
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
