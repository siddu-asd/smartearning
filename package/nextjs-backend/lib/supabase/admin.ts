/**
 * Supabase Admin Client
 * Uses service_role key - NEVER expose to browser
 * For admin API routes ONLY (server-side)
 */
import { createClient } from '@supabase/supabase-js';

// Hardcoded fallback values
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://isseiuhezyxyuawtbajk.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTcwMDcwMiwiZXhwIjoyMDg1Mjc2NzAyfQ.11Uw1ejZf2BMu3cE1SklOfxD3wVfdpO3N3W0S9QFJw8';

// This client bypasses Row Level Security
// Only use in protected API routes
export function createAdminClient() {
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
