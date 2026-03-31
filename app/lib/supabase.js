import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client using @supabase/ssr.
// Stores session in COOKIES (not localStorage) so middleware can read auth state.
// Use this in all Client Components ("use client").
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);
