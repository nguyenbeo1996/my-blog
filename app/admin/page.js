"use client";

// Admin Dashboard — protected by middleware.js (no need to re-check auth here).
// Shows: logged-in user email, all posts table, logout, add new post (placeholder).

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  // --- State ---
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState(null); // track which post is being deleted

  // Fetch logged-in user and all posts on mount
  useEffect(() => {
    async function init() {
      // 1. Get the current user session
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);

      // 2. Fetch all posts (including unpublished) ordered by date desc
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title_en, title_vi, category, date_iso, published")
        .order("date_iso", { ascending: false });

      if (!error) setPosts(data || []);
      setLoading(false);
    }

    init();
  }, []);

  // --- Logout ---
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  // --- Delete post with confirm dialog ---
  async function handleDelete(post) {
    const confirmed = window.confirm(
      `Delete "${post.title_en}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingSlug(post.slug);

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id);

    if (error) {
      alert("Failed to delete: " + error.message);
    } else {
      // Remove deleted post from local state without re-fetching
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }

    setDeletingSlug(null);
  }

  // --- Toggle published status ---
  async function handleTogglePublished(post) {
    const { error } = await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    }
  }

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased"
    >
      {/* ── Top Bar ── */}
      <header className="border-b border-[#E5E3DB] dark:border-[#2C2C2A] bg-white dark:bg-[#1A1A19]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-mono text-[#AC9E85] hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-colors"
            >
              ← Blog
            </Link>
            <span className="text-[#DCD5C6] dark:text-[#2C2C2A]">|</span>
            <span className="text-sm font-semibold text-[#2C2C2C] dark:text-[#F3F4F6]">
              Admin Dashboard
            </span>
          </div>

          {/* User email + Logout */}
          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:block text-xs text-[#AC9E85] dark:text-[#8B8B87] font-mono">
                {user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold border border-[#DCD5C6] dark:border-[#40403F] rounded text-[#6B5B4C] dark:text-[#A0A0A0] hover:border-[#824D3B] hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-all"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Page heading + Add New Post button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-[#2C2C2C] dark:text-[#F3F4F6]">
              Posts
            </h1>
            <p className="mt-0.5 text-xs text-[#AC9E85] dark:text-[#8B8B87]">
              {posts.length} {posts.length === 1 ? "post" : "posts"} total
            </p>
          </div>

          <Link
            href="/admin/new"
            className="px-4 py-2 text-xs font-semibold bg-[#824D3B] text-white rounded hover:bg-[#6B3E2F] transition-all"
          >
            + Add New Post
          </Link>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="py-16 text-center text-sm text-[#AC9E85] dark:text-[#8B8B87]">
            Loading posts...
          </div>
        )}

        {/* ── Posts Table ── */}
        {!loading && (
          <div className="border border-[#E5E3DB] dark:border-[#2C2C2A] rounded overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-[#F3EFDF] dark:bg-[#1C1C1B] border-b border-[#E5E3DB] dark:border-[#2C2C2A]">
              <div className="col-span-5 text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] uppercase tracking-wide">
                Title
              </div>
              <div className="col-span-2 text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] uppercase tracking-wide">
                Category
              </div>
              <div className="col-span-2 text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] uppercase tracking-wide">
                Date
              </div>
              <div className="col-span-1 text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] uppercase tracking-wide">
                Live
              </div>
              <div className="col-span-2 text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] uppercase tracking-wide text-right">
                Actions
              </div>
            </div>

            {/* Empty state */}
            {posts.length === 0 && (
              <div className="py-12 text-center text-sm text-[#AC9E85] dark:text-[#8B8B87]">
                No posts yet.
              </div>
            )}

            {/* Post rows */}
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`grid grid-cols-12 gap-2 px-4 py-3.5 items-center transition-colors hover:bg-[#F9F7F0] dark:hover:bg-[#1C1C1B] ${
                  index !== posts.length - 1
                    ? "border-b border-[#E5E3DB] dark:border-[#2C2C2A]"
                    : ""
                }`}
              >
                {/* Title (EN + VI subtitle) */}
                <div className="col-span-5 min-w-0">
                  <p className="text-sm font-medium text-[#2C2C2C] dark:text-[#F3F4F6] truncate">
                    {post.title_en || "—"}
                  </p>
                  <p className="text-xs text-[#AC9E85] dark:text-[#8B8B87] truncate mt-0.5">
                    {post.title_vi || ""}
                  </p>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#F3EFDF] dark:bg-[#222220] border border-[#DCD5C6] dark:border-[#40403F] text-[#824D3B] dark:text-[#D4A373] rounded">
                    {post.category || "—"}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">
                    {post.date_iso || "—"}
                  </span>
                </div>

                {/* Published toggle */}
                <div className="col-span-1">
                  <button
                    onClick={() => handleTogglePublished(post)}
                    title={post.published ? "Click to unpublish" : "Click to publish"}
                    className={`w-8 h-4 rounded-full transition-colors duration-200 relative ${
                      post.published
                        ? "bg-green-500"
                        : "bg-[#DCD5C6] dark:bg-[#40403F]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${
                        post.published ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Actions: Edit + Delete */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {/* Edit */}
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="px-2.5 py-1 text-xs font-medium border border-[#DCD5C6] dark:border-[#40403F] rounded text-[#AC9E85] dark:text-[#666665] hover:border-[#824D3B] hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-colors"
                  >
                    Edit
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={deletingSlug === post.slug}
                    className="px-2.5 py-1 text-xs font-medium border border-red-200 dark:border-red-900 rounded text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingSlug === post.slug ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
