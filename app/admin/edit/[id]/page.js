"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import PostForm from "../../components/PostForm";

export default function EditPostPage({ params }) {
  const { id } = use(params);
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const { data, error: fetchError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans">
      <header className="border-b border-[#E5E3DB] dark:border-[#2C2C2A] bg-white dark:bg-[#1A1A19]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/admin" className="text-xs font-mono text-[#AC9E85] hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-colors">
            ← Admin Dashboard
          </Link>
          <span className="text-[#DCD5C6] dark:text-[#2C2C2A]">|</span>
          <span className="text-sm font-semibold text-[#2C2C2C] dark:text-[#F3F4F6]">
            Edit Post
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold mb-8">Edit Post</h1>
        
        {loading && <p className="text-sm text-[#AC9E85]">Loading post data...</p>}
        {error && <p className="text-sm text-red-500">Error: {error}</p>}
        {!loading && !error && post && (
          <PostForm initialData={post} isEdit={true} />
        )}
      </main>
    </div>
  );
}
