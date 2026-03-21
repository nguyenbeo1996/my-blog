"use client";

import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import SectionTitle from "../components/SectionTitle";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";

export default function BlogListing() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].blog;
  const categories = t.categories;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [language, categories]);

  const allPosts = translations[language].posts;

  // Logic Nút Back To Top
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === categories[0] || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased transition-colors duration-300">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        <SectionTitle 
          title={t.title} 
          subtitle={t.subtitle} 
          centered={true}
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-8 border-b border-[#E5E3DB] dark:border-[#2C2C2A]">
          
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

          <div className="relative max-w-sm w-full">
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

        {/* Post Grid */}
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
          <div className="text-center py-12 text-[#AC9E85] dark:text-[#8B8B87]">
            <p>{t.noFound}</p>
          </div>
        )}

      </main>

      {/* Nút Back to Top */}
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
