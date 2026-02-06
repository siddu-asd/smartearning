-- ================================================
-- Migration: Add scheduled_at column to blogs table
-- Run this in your Supabase SQL Editor
-- ================================================

-- Add scheduled_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'blogs' AND column_name = 'scheduled_at'
    ) THEN
        ALTER TABLE blogs ADD COLUMN scheduled_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;
    END IF;
END $$;

-- Create index for scheduled blogs
CREATE INDEX IF NOT EXISTS idx_blogs_scheduled ON blogs(scheduled_at);

-- Verification query (optional - run this to verify the column was added)
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'blogs';
