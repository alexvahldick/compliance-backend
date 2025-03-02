import { createClient } from '@supabase/supabase-js';

// Ensure Supabase credentials are properly loaded
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase credentials are missing! Check your environment variables.");
}

// ✅ Singleton Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
});

export default supabase;
