-- ================================================
-- StudentCrazyDeals Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- PRODUCTS TABLE
-- Stores affiliate product deals
-- ================================================
CREATE TABLE IF NOT EXISTS product (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'deals',
  image_url TEXT NOT NULL DEFAULT '',
  affiliate_link TEXT NOT NULL DEFAULT '',
  mrp NUMERIC(10, 2) DEFAULT 0,
  discounted_price NUMERIC(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_product_slug ON product(slug);
CREATE INDEX IF NOT EXISTS idx_product_category ON product(category);
CREATE INDEX IF NOT EXISTS idx_product_active ON product(is_active);

-- ================================================
-- BLOGS TABLE
-- Stores blog posts for content marketing
-- ================================================
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT DEFAULT '',
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  category TEXT DEFAULT 'general',
  published BOOLEAN DEFAULT false,
  scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_scheduled ON blogs(scheduled_at);

-- ================================================
-- OPTIONAL: Row Level Security (RLS)
-- Enable for production security
-- ================================================

-- Enable RLS on tables (uncomment for production)
-- ALTER TABLE product ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to active products
-- CREATE POLICY "Public can view active products"
--   ON product FOR SELECT
--   USING (is_active = true);

-- Policy: Allow public read access to published blogs
-- CREATE POLICY "Public can view published blogs"
--   ON blogs FOR SELECT
--   USING (published = true);

-- Policy: Service role can do everything (admin operations)
-- CREATE POLICY "Service role full access on product"
--   ON product FOR ALL
--   USING (auth.role() = 'service_role');

-- CREATE POLICY "Service role full access on blogs"
--   ON blogs FOR ALL
--   USING (auth.role() = 'service_role');

-- ================================================
-- SAMPLE DATA (Optional)
-- ================================================

-- Insert sample blog post
INSERT INTO blogs (title, slug, content, category, published) VALUES
  ('Welcome to StudentCrazyDeals', 'welcome', 'Welcome to our site! Find the best student deals here.', 'general', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample product
INSERT INTO product (title, slug, category, image_url, affiliate_link, mrp, discounted_price, is_active) VALUES
  ('Sample Product', 'sample-product', 'electronics', 'https://via.placeholder.com/300', 'https://amazon.com', 999, 499, true)
ON CONFLICT (slug) DO NOTHING;
