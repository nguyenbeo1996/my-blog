import { createClient } from "@supabase/supabase-js";

// Public Supabase client – uses anon key for client-side reads.
// IMPORTANT: You must add a SELECT policy in Supabase Dashboard so reads work:
//   Table Editor → posts → RLS Policies → New Policy
//   → FOR SELECT → Using expression: (published = true)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
