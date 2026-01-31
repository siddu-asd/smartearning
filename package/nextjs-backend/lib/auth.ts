/**
 * Auth Helper for Admin API Routes
 * Verifies admin is logged in before allowing access
 */
import { createServerClient } from '@/lib/supabase/server';

export async function verifyAdmin() {
  const supabase = await createServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { authenticated: false, user: null };
  }

  return { authenticated: true, user };
}
