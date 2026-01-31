/**
 * POST /api/admin/blogs
 * Admin API - Create new blog post
 * Uses service_role key (protected, server-side only)
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/auth';
import type { BlogInput } from '@/lib/types';

// Set to true for development without auth (set to false in production!)
const SKIP_AUTH_FOR_DEV = process.env.NODE_ENV === 'development';

export async function POST(request: NextRequest) {
  try {
    // Verify admin is authenticated (skip in dev mode)
    if (!SKIP_AUTH_FOR_DEV) {
      const { authenticated, user } = await verifyAdmin();
      console.log('Auth check:', { authenticated, userId: user?.id });
      if (!authenticated) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized - Please log in at /admin/login' },
          { status: 401 }
        );
      }
    } else {
      console.log('⚠️ Skipping auth check (development mode)');
    }

    // Parse request body
    const body: BlogInput = await request.json();
    console.log('📝 Creating blog:', { title: body.title, slug: body.slug });

    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, content' },
        { status: 400 }
      );
    }

    // Use admin client to insert (bypasses RLS)
    const supabase = createAdminClient();
    console.log('🔌 Supabase admin client created');

    const insertData = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      featured_image: body.featured_image || '',
      meta_title: body.meta_title || body.title,
      meta_description: body.meta_description || '',
      category: body.category || 'general',
      published: body.published ?? false,
      created_at: new Date().toISOString(),
    };
    console.log('📦 Insert data:', insertData);

    const { data, error } = await supabase
      .from('blogs')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', JSON.stringify(error, null, 2));
      
      // Handle duplicate slug
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'A blog with this slug already exists' },
          { status: 409 }
        );
      }

      // Return detailed error in development
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Failed to create blog: ${error.message} (code: ${error.code})`
        : 'Failed to create blog';

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }

    console.log('✅ Blog created:', data.id);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Admin blogs API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET all blogs (including unpublished) for admin
export async function GET() {
  try {
    const { authenticated } = await verifyAdmin();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin blogs GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
