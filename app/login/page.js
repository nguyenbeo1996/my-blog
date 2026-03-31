"use client";

// Login page for blog admin access.
// Uses Supabase Auth (email + password) and redirects to /admin on success.

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Sign in with Supabase Auth (email + password)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // Show the error returned by Supabase (e.g. "Invalid login credentials")
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Successful login → navigate to admin dashboard
    router.push("/admin");
    router.refresh(); // Force Next.js to re-check middleware/session
  }

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono text-[#AC9E85] hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-colors"
          >
            ← Back to blog
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#2C2C2C] dark:text-[#F3F4F6]">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-[#AC9E85] dark:text-[#8B8B87]">
            Sign in to manage your blog
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email field */}
          <div>
            <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#1C1C1B] text-sm text-[#2C2C2C] dark:text-[#F3F4F6] focus:outline-none focus:border-[#824D3B] focus:ring-1 focus:ring-[#824D3B] placeholder-[#AC9E85] dark:placeholder-[#666665] transition-all"
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#1C1C1B] text-sm text-[#2C2C2C] dark:text-[#F3F4F6] focus:outline-none focus:border-[#824D3B] focus:ring-1 focus:ring-[#824D3B] placeholder-[#AC9E85] dark:placeholder-[#666665] transition-all"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="px-3 py-2.5 rounded border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#824D3B] hover:bg-[#6B3E2F] active:scale-[0.98] text-white text-sm font-semibold rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-[#AC9E85] dark:text-[#666665]">
          This page is for blog owners only.
        </p>

      </div>
    </div>
  );
}
