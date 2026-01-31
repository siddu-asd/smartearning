import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://isseiuhezyxyuawtbajk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc2VpdWhlenl4eXVhd3RiYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDA3MDIsImV4cCI6MjA4NTI3NjcwMn0.HLwNG4v0VQjJVaNHAIV0AhuTj3ZNjRnYPHBzJqHuICE'
);

async function test() {
  console.log('Fetching products...');
  const { data, error } = await supabase.from('product').select('*').limit(2);
  
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Products found:', data?.length);
    if (data && data.length > 0) {
      console.log('\n=== FIRST PRODUCT ALL FIELDS ===');
      console.log(JSON.stringify(data[0], null, 2));
      console.log('\n=== FIELD NAMES ===');
      console.log(Object.keys(data[0]));
    }
  }
}

test();
