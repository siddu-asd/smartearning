/**
 * TypeScript Types for Database Tables
 */

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  image_url: string;
  affiliate_link: string;
  is_active: boolean;
  created_at: string;
  mrp?: number;
  discounted_price?: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  category: string;
  published: boolean;
  scheduled_at: string | null;
  created_at: string;
}

export interface ProductInput {
  title: string;
  slug: string;
  category: string;
  image_url: string;
  affiliate_link: string;
  is_active?: boolean;
  mrp?: number | string;
  discounted_price?: number | string;
}

export interface BlogInput {
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  category: string;
  published?: boolean;
  scheduled_at?: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
