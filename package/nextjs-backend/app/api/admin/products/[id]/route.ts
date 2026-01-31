/**
 * PUT/DELETE /api/admin/products/[id]
 * Admin API - Update or delete a product
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/auth';
import type { ProductInput } from '@/lib/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Update product
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
    const body: Partial<ProductInput> = await request.json();

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('product')
      .update({
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.category && { category: body.category }),
        ...(body.image_url && { image_url: body.image_url }),
        ...(body.affiliate_link && { affiliate_link: body.affiliate_link }),
        ...(body.is_active !== undefined && { is_active: body.is_active }),
        ...(body.mrp !== undefined && { mrp: body.mrp ? Number(body.mrp) : null }),
        ...(body.discounted_price !== undefined && { discounted_price: body.discounted_price ? Number(body.discounted_price) : null }),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Admin product update error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete product
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
      .from('product')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin product delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
