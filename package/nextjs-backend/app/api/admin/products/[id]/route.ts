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

    console.log('Updating product:', id, body);

    const supabase = createAdminClient();

    // Build update object - only include fields that are provided
    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.image_url !== undefined) updateData.image_url = body.image_url;
    if (body.affiliate_link !== undefined) updateData.affiliate_link = body.affiliate_link;
    if (body.is_active !== undefined) updateData.is_active = body.is_active;
    if (body.mrp !== undefined) updateData.mrp = body.mrp ? Number(body.mrp) : null;
    if (body.discounted_price !== undefined) updateData.discounted_price = body.discounted_price ? Number(body.discounted_price) : null;

    console.log('Update data:', updateData);

    const { data, error } = await supabase
      .from('product')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error.message, error.code, error.details);
      return NextResponse.json(
        { success: false, error: `Failed to update product: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    console.log('Product updated successfully:', data);
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
