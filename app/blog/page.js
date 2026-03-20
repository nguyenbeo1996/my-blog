"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import iconImg from "../../public/images/icon.png";

export default function BlogListing() {
  // Trạng thái mở/đóng menu trên mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
      link: "#"
    },
    {
      title: "My family tree",
      date: "15 March 2026",
      category: "Life",
      excerpt: "I have been using Heritage website to build my family tree. I decided to create a dashboard to visualize my family tree and share it with you...",
      link: "#"
    },
    {
      title: "A short story about my life",
      date: "10 March 2026",
      category: "Life",
      excerpt: "This is a short story about my life with many ups and downs. I hope you enjoy it...",
      link: "#"
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
      
      {/* =====================================================================
          1. HEADER SECTION & NAVIGATION
          ===================================================================== */}
      <header className="sticky top-0 z-50 bg-[#FDFCF7]/90 backdrop-blur-sm border-b border-[#E5E3DB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo/Name */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 font-serif text-xl font-bold tracking-tight hover:text-[#824D3B] transition-colors">
                <Image 
                  src={iconImg} 
                  alt="Icon" 
                  width={34} 
                  height={34} 
                />
                <span>Do Duc Khanh Nguyen</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-sm font-medium hover:text-[#824D3B] transition-colors">Home</Link>
              <Link href="/blog" className="text-sm font-medium text-[#824D3B] hover:text-[#824D3B] transition-colors">Blog</Link>
              <Link href="/about" className="text-sm font-medium hover:text-[#824D3B] transition-colors">About</Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#F3EFDF] focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[#E5E3DB] bg-[#FDFCF7]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/" className="block px-3 py-2 text-base font-medium hover:bg-[#F3EFDF] rounded-md">Home</Link>
              <Link href="/blog" className="block px-3 py-2 text-base font-medium text-[#824D3B] hover:bg-[#F3EFDF] rounded-md">Blog</Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium hover:bg-[#F3EFDF] rounded-md">About</Link>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* =====================================================================
            2. PAGE TITLE & SUBTITLE
            ===================================================================== */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#2C2C2C]">
            Blog
          </h1>
          <p className="text-base md:text-lg text-[#5A5A5A] max-w-xl mx-auto leading-relaxed">
            A little corner for sharing my thoughts in every aspect of the surrounding world.
          </p>
        </div>

        {/* =====================================================================
            3. SEARCH BAR & CATEGORIES FILTER
            ===================================================================== */}
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
            4. RESPONSIVE LISTING GRID
            ===================================================================== */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <article key={index} className="flex flex-col bg-white border border-[#E5E3DB] rounded p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-[#AC9E85]">{post.date}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#824D3B] bg-[#FDFCF7] border border-[#DCD5C6] rounded">
                    {post.category}
                  </span>
                </div>
                <h2 className="font-serif text-xl font-bold mb-3 hover:text-[#824D3B] transition-colors leading-snug">
                  <a href={post.link}>{post.title}</a>
                </h2>
                <p className="text-sm text-[#5A5A5A] mb-5 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <a href={post.link} className="text-xs font-bold uppercase tracking-wider text-[#824D3B] hover:opacity-80 transition-opacity">
                    Read more &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#AC9E85]">
            <p>No posts found matching your criteria.</p>
          </div>
        )}

      </main>

      <footer className="border-t border-[#E5E3DB] bg-[#FDFCF7] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-sm text-[#AC9E85] font-mono">
            &copy; 2025 Do Duc Khanh Nguyen. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
