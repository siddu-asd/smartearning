/**
 * Supabase Admin Client
 * Uses service_role key - NEVER expose to browser
 * For admin API routes ONLY (server-side)
 */
import { createClient } from '@supabase/supabase-js';

// This client bypasses Row Level Security
// Only use in protected API routes
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin credentials');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
