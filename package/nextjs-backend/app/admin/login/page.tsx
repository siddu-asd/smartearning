/**
 * Admin Login Page
 * /admin/login
 */
'use client';

import { useState, useEffect, useMemo } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

// Hardcoded values for production
const SUPABASE_URL = 'https://isseiuhezyxyuawtbajk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MDIsImV4cCI6MjA4NTI3NjcwMn0.HLwNG4v0VQjJVaNHAIV0AhuTj3ZNjRnYPHBzJqHuICE';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Create Supabase client only on client-side
  const supabase = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }, []);

  // Check if already logged in
  useEffect(() => {
    if (!supabase) return;
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Already logged in, redirect to dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setCheckingAuth(false);
      }
    };
    checkSession();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setError('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Auth error:', authError);
        setError(authError.message || 'Invalid email or password');
        return;
      }

      if (!data.session) {
        setError('Login failed - no session created');
        return;
      }

      // Success! Hard redirect to ensure cookies are read properly
      window.location.href = '/admin/dashboard';
    } catch (err) {
      console.error('Login exception:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <p className="text-gray-500 text-center mb-6 text-sm">StudentCrazyDeals Admin Panel</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
