/**
 * Supabase Server-Side Client
 * Uses anon key by default for public operations
 * For server components and API routes
 */
import { createServerClient as createClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Hardcoded fallback values
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://isseiuhezyxyuawtbajk.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MDIsImV4cCI6MjA4NTI3NjcwMn0.HLwNG4v0VQjJVaNHAIV0AhuTj3ZNjRnYPHBzJqHuICE';

export async function createServerClient() {
  const cookieStore = await cookies();

  return createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookies in Server Components (read-only)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookies in Server Components (read-only)
          }
        },
      },
    }
  );
}
