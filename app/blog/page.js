"use client";

import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import SectionTitle from "../components/SectionTitle";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";
import { supabase } from "../lib/supabase";

// Map DB category (stored in Vietnamese) to English display name
const CATEGORY_EN_MAP = {
  "Phân tích Dữ liệu": "Data Analysis",
  "Cuộc sống": "Life",
  "Khoa học": "Science",
};

// Format date_iso (e.g. "2026-03-16") to localized string
// VI → "16 tháng 3, 2026" | EN → "March 16, 2026"
function formatDate(dateISO, language) {
  if (!dateISO) return "";
  // Append T00:00:00 to avoid timezone shifting the date by 1 day
  const date = new Date(dateISO + "T00:00:00");
  return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Transform a raw Supabase DB row into a post object for the current language
function transformPost(row, language) {
  const rawCategory = row.category || "";
  return {
    title: language === "vi" ? row.title_vi : row.title_en,
    excerpt: language === "vi" ? row.excerpt_vi : row.excerpt_en,
    // Display category in the active language
    category: language === "vi" ? rawCategory : (CATEGORY_EN_MAP[rawCategory] || rawCategory),
    date: formatDate(row.date_publish, language),
    date_publish: row.date_publish,
    date_update: row.date_update,
    slug: row.slug,
  };
}

export default function BlogListing() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].blog;

  // --- Data state ---
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- UI state ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(language === "vi" ? "Tất cả" : "All");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch all published posts from Supabase, re-run when language changes
  // so title / excerpt / category are re-mapped in the new language
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .order("date_publish", { ascending: false });

        if (fetchError) throw fetchError;

        setAllPosts(data.map((row) => transformPost(row, language)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [language]);

  // Reset selected category to "All / Tất cả" whenever language switches
  useEffect(() => {
    setSelectedCategory(language === "vi" ? "Tất cả" : "All");
  }, [language]);

  // Back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build the category filter list dynamically from fetched posts
  const allLabel = language === "vi" ? "Tất cả" : "All";
  const categories = [
    allLabel,
    ...Array.from(new Set(allPosts.map((post) => post.category))),
  ];

  // Filter by search query and selected category
  const filteredPosts = allPosts.filter((post) => {
    const title = post.title || "";
    const excerpt = post.excerpt || "";
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === allLabel || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date_publish) - new Date(a.date_publish);
    if (sortBy === "oldest") return new Date(a.date_publish) - new Date(b.date_publish);
    if (sortBy === "az")
      return a.title
        .normalize("NFC")
        .localeCompare(b.title.normalize("NFC"), language);
    return 0;
  });

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased transition-colors duration-300">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        <SectionTitle
          title={t.title}
          subtitle={t.subtitle}
          centered={true}
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-8 border-b border-[#E5E3DB] dark:border-[#2C2C2A]">

          {/* Category filter buttons – built from live DB data */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded border transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#824D3B] text-[#FDFCF7] border-[#824D3B]"
                    : "border-[#DCD5C6] dark:border-[#40403F] text-[#6B5B4C] dark:text-[#A0A0A0] hover:bg-[#F3EFDF] dark:hover:bg-[#20201F]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg w-full items-center">
            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto pl-3 pr-8 py-2 text-xs font-semibold rounded border border-[#DCD5C6] dark:border-[#40403F] bg-white dark:bg-[#1C1C1B] text-[#6B5B4C] dark:text-[#A0A0A0] focus:outline-none focus:border-[#824D3B] transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B5B4C%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.3c0%204.8%201.8%209%205.4%2012.5l133.2%20133.2a17.6%2017.6%200%200%200%2025%200L287%2094.8c3.6-3.6%205.4-7.7%205.4-12.5%200-5-1.8-9.3-5.4-12.9z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[position:right_10px_center] bg-no-repeat"
            >
              <option value="newest">{language === "vi" ? "Mới nhất" : "Newest"}</option>
              <option value="oldest">{language === "vi" ? "Cũ nhất" : "Oldest"}</option>
              <option value="az">{language === "vi" ? "Tựa đề A-Z" : "A-Z Title"}</option>
            </select>

            {/* Search input */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlh}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#1C1C1B] text-sm text-[#2C2C2C] dark:text-[#F3F4F6] focus:outline-none focus:border-[#824D3B] focus:ring-1 focus:ring-[#824D3B] placeholder-[#AC9E85] dark:placeholder-[#666665] transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#AC9E85] dark:text-[#666665]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16 text-[#AC9E85] dark:text-[#8B8B87]">
            <p className="text-sm">{language === "vi" ? "Đang tải bài viết..." : "Loading articles..."}</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-sm text-red-500">
              {language === "vi" ? "Có lỗi xảy ra: " : "Error: "}{error}
            </p>
          </div>
        )}

        {/* Post Grid */}
        {!loading && !error && (
          sortedPosts.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post, index) => (
                <PostCard
                  key={post.slug || index}
                  title={post.title}
                  date={post.date}
                  category={post.category}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#AC9E85] dark:text-[#8B8B87]">
              <p>{t.noFound}</p>
            </div>
          )
        )}

      </main>

      {/* Back to Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[#824D3B] text-white shadow-lg hover:bg-[#6B3E2F] hover:scale-110 active:scale-95 transform transition-all duration-200 z-40"
          aria-label="Back to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <Footer />
    </div>
  );
}
