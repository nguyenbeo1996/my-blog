"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import SectionTitle from "../components/SectionTitle";

export default function BlogListing() {
  // Trạng thái lọc tìm kiếm & category
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Danh mục thể loại
  const categories = ["All", "Life", "Data Analysis", "Science"];

  // Dữ liệu mẫu bài viết cho Blog
  const allPosts = [
    {
      title: "Dashboard for my health data from daily tracking by mobile app and watch",
      date: "16 March 2026",
      category: "Data Analysis",
      excerpt: "I have been using mobile app and watch to track my health data for a few years. I decided to create a dashboard to visualize my health data and share it with you...",
      slug: "#"
    },
    {
      title: "My family tree",
      date: "15 March 2026",
      category: "Life",
      excerpt: "I have been using Heritage website to build my family tree. I decided to create a dashboard to visualize my family tree and share it with you...",
      slug: "#"
    },
    {
      title: "A short story about my life",
      date: "10 March 2026",
      category: "Life",
      excerpt: "This is a short story about my life with many ups and downs. I hope you enjoy it...",
      slug: "#"
    }
  ];

  // Logic Lọc bài viết
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#2C2C2C] font-sans antialiased">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* =====================================================================
            1. PAGE TITLE & SUBTITLE
            ==================================================================== */}
        <SectionTitle 
          title="Blog" 
          subtitle="A little corner for sharing my thoughts in every aspect of the surrounding world." 
          centered={true}
        />

        {/* =====================================================================
            2. SEARCH BAR & CATEGORIES FILTER
            ==================================================================== */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-8 border-b border-[#E5E3DB]">
          
          {/* List Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded border transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#824D3B] text-[#FDFCF7] border-[#824D3B]"
                    : "border-[#DCD5C6] text-[#6B5B4C] hover:bg-[#F3EFDF]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar Input */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#DCD5C6] rounded bg-white text-sm text-[#2C2C2C] focus:outline-none focus:border-[#824D3B] focus:ring-1 focus:ring-[#824D3B] placeholder-[#AC9E85] transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#AC9E85]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. RESPONSIVE LISTING GRID
            ==================================================================== */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard 
                key={index}
                title={post.title}
                date={post.date}
                category={post.category}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#AC9E85]">
            <p>No posts found matching your criteria.</p>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
