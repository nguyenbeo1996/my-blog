import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Middleware runs on the Edge before every matched request.
// It protects /admin routes and refreshes the Supabase session cookie.
export async function middleware(request) {
  // Start with a basic "pass-through" response that we will modify if needed
  let supabaseResponse = NextResponse.next({ request });

  // Create a Supabase client that can read/write cookies on the Edge
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        // Read cookies from the incoming request
        getAll() {
          return request.cookies.getAll();
        },
        // Write updated session cookies to both request and response
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          );
          // Rebuild the response so it carries the updated cookies
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() validates the session with Supabase Auth server.
  // IMPORTANT: Do NOT use getSession() here – it only reads the local cookie
  // and can be spoofed. getUser() is the secure check.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Rule 1: /admin pages require login → redirect to /login if not authenticated
  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Rule 2: Already logged in users visiting /login → redirect to /admin
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Pass through for all other cases (session cookies already refreshed above)
  return supabaseResponse;
}

// Only run middleware on these routes – skip static files and API routes
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
