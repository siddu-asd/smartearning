/**
 * React Hook to fetch products from Supabase
 */
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SupabaseProduct {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string;
  affiliate_link: string;
  created_at: string;
  mrp?: number;
  discounted_price?: number;
  // Alternative field names that might be in DB
  price?: number;
  sale_price?: number;
  original_price?: number;
}

export interface SupabaseBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  created_at: string;
  featured_image?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('product')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Debug: Log raw data from Supabase
        console.log('RAW Supabase products:', data);
        if (data && data.length > 0) {
          console.log('First product ALL FIELDS:', JSON.stringify(data[0], null, 2));
        }
        
        setProducts(data || []);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<SupabaseBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
}

export function useProductBySlug(slug: string | undefined) {
  const [product, setProduct] = useState<SupabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('product')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}

export function useBlogBySlug(slug: string | undefined) {
  const [blog, setBlog] = useState<SupabaseBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setBlog(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  return { blog, loading, error };
}
