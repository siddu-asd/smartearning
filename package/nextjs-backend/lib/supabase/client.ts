/**
 * Supabase Client-Side Client
 * Uses anon key - safe to expose in browser
 * For public read operations only
 */
import { createBrowserClient } from '@supabase/ssr';

// Hardcoded fallback values
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://isseiuhezyxyuawtbajk.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MDIsImV4cCI6MjA4NTI3NjcwMn0.HLwNG4v0VQjJVaNHAIV0AhuTj3ZNjRnYPHBzJqHuICE';

export function createClient() {
  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}
