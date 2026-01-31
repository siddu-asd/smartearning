/**
 * POST /api/admin/products
 * Admin API - Create new product
 * Uses service_role key (protected, server-side only)
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/auth';
import type { ProductInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Verify admin is authenticated
    const { authenticated } = await verifyAdmin();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: ProductInput = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.affiliate_link) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, affiliate_link' },
        { status: 400 }
      );
    }

    // Use admin client to insert (bypasses RLS)
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('product')
      .insert({
        title: body.title,
        slug: body.slug,
        category: body.category || 'general',
        image_url: body.image_url || '',
        affiliate_link: body.affiliate_link,
        mrp: body.mrp ? Number(body.mrp) : null,
        discounted_price: body.discounted_price ? Number(body.discounted_price) : null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      
      // Handle duplicate slug
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'A product with this slug already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Admin products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET all products (including inactive) for admin
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
      .from('product')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin products GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
