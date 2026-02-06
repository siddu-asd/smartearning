/**
 * GET /api/cron/publish-blogs
 * Cron API - Automatically publish scheduled blogs
 * 
 * This endpoint should be called by a cron job service (Vercel Cron, cron-job.org, etc.)
 * to publish blogs that have reached their scheduled time.
 * 
 * For Vercel Cron: Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/publish-blogs",
 *     "schedule": "0 * * * *"  // Every hour (or "0 0 * * *" for daily at midnight)
 *   }]
 * }
 * 
 * For external cron services: Call this URL with the CRON_SECRET header
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Secret to protect the cron endpoint (set in environment variables)
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional security layer)
    const authHeader = request.headers.get('authorization');
    if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
      // Also allow Vercel's cron authorization
      const vercelCronHeader = request.headers.get('x-vercel-cron');
      if (!vercelCronHeader) {
        console.log('⚠️ Unauthorized cron request');
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const supabase = createAdminClient();
    const now = new Date().toISOString();

    console.log(`🕐 Running scheduled blog publish check at ${now}`);

    // Find all blogs that are scheduled and ready to publish
    const { data: scheduledBlogs, error: fetchError } = await supabase
      .from('blogs')
      .select('id, title, scheduled_at')
      .eq('published', false)
      .not('scheduled_at', 'is', null)
      .lte('scheduled_at', now);

    if (fetchError) {
      console.error('❌ Error fetching scheduled blogs:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch scheduled blogs' },
        { status: 500 }
      );
    }

    if (!scheduledBlogs || scheduledBlogs.length === 0) {
      console.log('✅ No blogs scheduled for publishing at this time');
      return NextResponse.json({
        success: true,
        message: 'No blogs to publish',
        published: 0,
      });
    }

    console.log(`📝 Found ${scheduledBlogs.length} blog(s) to publish`);

    // Publish all scheduled blogs
    const blogIds = scheduledBlogs.map(blog => blog.id);
    
    const { error: updateError } = await supabase
      .from('blogs')
      .update({ 
        published: true,
        scheduled_at: null, // Clear the schedule after publishing
      })
      .in('id', blogIds);

    if (updateError) {
      console.error('❌ Error publishing blogs:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to publish scheduled blogs' },
        { status: 500 }
      );
    }

    const publishedTitles = scheduledBlogs.map(b => b.title);
    console.log(`✅ Successfully published ${scheduledBlogs.length} blog(s):`, publishedTitles);

    return NextResponse.json({
      success: true,
      message: `Published ${scheduledBlogs.length} blog(s)`,
      published: scheduledBlogs.length,
      blogs: publishedTitles,
    });
  } catch (error) {
    console.error('Cron publish-blogs error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also support POST for some cron services
export async function POST(request: NextRequest) {
  return GET(request);
}
