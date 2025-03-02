require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// **Security Check: Ensure credentials exist**
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("🚨 ERROR: Supabase credentials are missing! Check your environment variables.");
    process.exit(1);
}

// **Create Supabase Client** - Use **ANON KEY for public operations** and **SERVICE ROLE for admin tasks**
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
});

// **For admin tasks, use the SERVICE ROLE key separately**
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});

module.exports = { supabase, supabaseAdmin };
