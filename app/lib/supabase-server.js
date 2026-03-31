import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client for use in Server Components.
// Reads and writes cookies via next/headers so session is synced with browser.
// Note: This file must ONLY be imported in Server Components (no "use client").
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        // Read all cookies from the incoming request
        getAll() {
          return cookieStore.getAll();
        },
        // Write cookies back to the response
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Components can't set cookies directly.
            // Middleware will handle session refresh automatically.
          }
        },
      },
    }
  );
}
