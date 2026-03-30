"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Header from "../../../app/components/Header";
import Footer from "../../../app/components/Footer";
import { LanguageContext } from "../../../app/context/LanguageContext";
import { supabase } from "../../../app/lib/supabase";

// Map DB category (stored in Vietnamese) to English display name
const CATEGORY_EN_MAP = {
  "Phân tích Dữ liệu": "Data Analysis",
  "Cuộc sống": "Life",
  "Khoa học": "Science",
};

// Format date_iso to localized string
function formatDate(dateISO, language) {
  if (!dateISO) return "";
  const date = new Date(dateISO + "T00:00:00");
  return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Parse content stored as JSON string in DB back to an array of paragraphs
function parseContent(jsonString) {
  try {
    return JSON.parse(jsonString || "[]");
  } catch {
    return [];
  }
}

// Transform a DB row to a displayable post object for the current language
function transformPost(row, language) {
  const rawCategory = row.category || "";
  return {
    title: language === "vi" ? row.title_vi : row.title_en,
    excerpt: language === "vi" ? row.excerpt_vi : row.excerpt_en,
    content: language === "vi"
      ? parseContent(row.content_vi)
      : parseContent(row.content_en),
    category: language === "vi" ? rawCategory : (CATEGORY_EN_MAP[rawCategory] || rawCategory),
    date: formatDate(row.date_iso, language),
    dateISO: row.date_iso,
    slug: row.slug,
  };
}

export default function BlogPostPage({ params }) {
  const { language } = useContext(LanguageContext);

  // --- Data state ---
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Unwrap params (Next.js 15 – params is a Promise)
  useEffect(() => {
    Promise.resolve(params).then((p) => setSlug(p.slug));
  }, [params]);

  // Fetch post by slug + adjacent posts for prev/next navigation
  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch the current post by slug
        const { data: rows, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .limit(1);

        if (fetchError) throw fetchError;
        if (!rows || rows.length === 0) {
          setPost(null);
          setLoading(false);
          return;
        }

        const currentRow = rows[0];
        setPost(transformPost(currentRow, language));

        // 2. Fetch the previous post (older, date_iso < current)
        const { data: prevRows } = await supabase
          .from("posts")
          .select("slug, title_en, title_vi, date_iso")
          .eq("published", true)
          .lt("date_iso", currentRow.date_iso)
          .order("date_iso", { ascending: false })
          .limit(1);

        setPrevPost(
          prevRows && prevRows.length > 0
            ? {
                slug: prevRows[0].slug,
                title: language === "vi" ? prevRows[0].title_vi : prevRows[0].title_en,
              }
            : null
        );

        // 3. Fetch the next post (newer, date_iso > current)
        const { data: nextRows } = await supabase
          .from("posts")
          .select("slug, title_en, title_vi, date_iso")
          .eq("published", true)
          .gt("date_iso", currentRow.date_iso)
          .order("date_iso", { ascending: true })
          .limit(1);

        setNextPost(
          nextRows && nextRows.length > 0
            ? {
                slug: nextRows[0].slug,
                title: language === "vi" ? nextRows[0].title_vi : nextRows[0].title_en,
              }
            : null
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, language]); // Re-run when language changes to re-map title/content

  // --- Loading state ---
  if (loading) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center text-[#AC9E85] dark:text-[#8B8B87]">
          <p className="text-sm">{language === "vi" ? "Đang tải bài viết..." : "Loading article..."}</p>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p className="text-sm text-red-500 mb-4">{error}</p>
          <Link href="/blog" className="text-[#824D3B] dark:text-[#D4A373] hover:underline">
            &larr; {language === "vi" ? "Quay lại danh sách" : "Back to Articles"}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Post not found ---
  if (!post) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "vi" ? "Bài viết không tồn tại" : "Post not found"}
          </h1>
          <Link href="/blog" className="text-[#824D3B] dark:text-[#D4A373] hover:underline">
            &larr; {language === "vi" ? "Quay lại danh sách" : "Back to Articles"}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Render post ---
  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased transition-colors duration-300">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-[#824D3B] dark:text-[#D4A373] hover:underline hover:opacity-80 transition-all"
          >
            &larr; {language === "vi" ? "Quay lại danh sách" : "Back to Articles"}
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-12 border-b border-[#E5E3DB] dark:border-[#2C2C2A] pb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">
              {post.date}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#F3EFDF] dark:bg-[#1C1C1B] border border-[#DCD5C6] dark:border-[#40403F] text-[#824D3B] dark:text-[#D4A373] rounded">
              {post.category}
            </span>
          </div>
          <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-[#2C2C2C] dark:text-[#F3F4F6] mb-4 leading-tight">
            {post.title?.normalize("NFC")}
          </h1>
          <p className="text-lg text-[#5A5A5A] dark:text-[#A0A09C] italic">
            &quot;{post.excerpt?.normalize("NFC")}&quot;
          </p>
        </header>

        {/* Article body – content is an array of paragraph strings */}
        <article className="space-y-6 text-[#4A4A4A] dark:text-[#B0B0AC] leading-relaxed text-base md:text-lg">
          {post.content && post.content.map((paragraph, index) => (
            <p key={index}>{paragraph.normalize("NFC")}</p>
          ))}
        </article>

        {/* Prev / Next navigation */}
        <div className="border-t border-[#E5E3DB] dark:border-[#2C2C2A] mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="w-full sm:w-1/2 text-left">
            {prevPost && (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex flex-col p-4 border border-[#DCD5C6] dark:border-[#40403F] rounded hover:border-[#824D3B] dark:hover:border-[#824D3B] transition-colors h-full"
              >
                <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">
                  &larr; {language === "vi" ? "Bài viết trước đó" : "Previous Post"}
                </span>
                <span className="text-sm font-bold text-[#2C2C2C] dark:text-[#F3F4F6] mt-1 group-hover:text-[#824D3B] dark:group-hover:text-[#D4A373] transition-colors line-clamp-1">
                  {prevPost.title?.normalize("NFC")}
                </span>
              </Link>
            )}
          </div>

          <div className="w-full sm:w-1/2 text-right">
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex flex-col p-4 border border-[#DCD5C6] dark:border-[#40403F] rounded hover:border-[#824D3B] dark:hover:border-[#824D3B] transition-colors h-full"
              >
                <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">
                  {language === "vi" ? "Bài viết tiếp theo" : "Next Post"} &rarr;
                </span>
                <span className="text-sm font-bold text-[#2C2C2C] dark:text-[#F3F4F6] mt-1 group-hover:text-[#824D3B] dark:group-hover:text-[#D4A373] transition-colors line-clamp-1">
                  {nextPost.title?.normalize("NFC")}
                </span>
              </Link>
            )}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
