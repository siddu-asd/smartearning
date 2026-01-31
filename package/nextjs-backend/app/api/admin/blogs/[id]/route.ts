/**
 * PUT/DELETE /api/admin/blogs/[id]
 * Admin API - Update or delete a blog post
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/auth';
import type { BlogInput } from '@/lib/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Update blog
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { authenticated } = await verifyAdmin();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body: Partial<BlogInput> = await request.json();

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('blogs')
      .update({
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.content && { content: body.content }),
        ...(body.featured_image && { featured_image: body.featured_image }),
        ...(body.meta_title && { meta_title: body.meta_title }),
        ...(body.meta_description && { meta_description: body.meta_description }),
        ...(body.category && { category: body.category }),
        ...(body.published !== undefined && { published: body.published }),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update blog' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin blog update error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete blog
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { authenticated } = await verifyAdmin();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const supabase = createAdminClient();

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete blog' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin blog delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
