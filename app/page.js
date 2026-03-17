"use client";

import { useState } from "react";
import Image from "next/image";
import portfolioImg from "../public/images/portfolio.jpg";
import iconImg from "../public/images/icon.png";

export default function Home() {
  // Trạng thái mở/đóng menu trên mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dữ liệu mẫu cho Featured Posts
  const featuredPosts = [
    {
      title: "Dashboard for my health data from daily tracking by mobile app and watch",
      date: " 16 March 2026",
      excerpt: "I have been using mobile app and watch to track my health data for a few years. I decided to create a dashboard to visualize my health data and share it with you...",
      link: "#"
    },
    {
      title: "My family tree",
      date: "15 March 2026",
      excerpt: "I have been using Heritage website to build my family tree. I decided to create a dashboard to visualize my family tree and share it with you...",
      link: "#"
    },
    {
      title: "A short story about my life",
      date: "10 March 2026",
      excerpt: "This is a short story about my life with many ups and downs. I hope you enjoy it...",
      link: "#"
    }
  ];

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
              <a href="#" className="flex items-center space-x-3 font-serif text-xl font-bold tracking-tight hover:text-[#824D3B] transition-colors">
                <Image 
                  src={iconImg} 
                  alt="Icon" 
                  width={40} 
                  height={40} 
                />
                <span>Do Duc Khanh Nguyen</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium hover:text-[#824D3B] transition-colors">Home</a>
              <a href="#" className="text-sm font-medium hover:text-[#824D3B] transition-colors">Blog</a>
              <a href="#" className="text-sm font-medium hover:text-[#824D3B] transition-colors">About</a>
              <a href="#" className="text-sm font-medium hover:text-[#824D3B] transition-colors">Contact</a>
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
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-[#F3EFDF] rounded-md">Home</a>
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-[#F3EFDF] rounded-md">Blog</a>
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-[#F3EFDF] rounded-md">About</a>
              <a href="#" className="block px-3 py-2 text-base font-medium hover:bg-[#F3EFDF] rounded-md">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* =====================================================================
            2. HERO SECTION
            ===================================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* Info Side */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Do Duc Khanh Nguyen
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-[#824D3B] mb-6 font-mono tracking-wide">
              Transportation, Logistics & Data Engineer
            </h2>
            <p className="text-base md:text-lg text-[#5A5A5A] mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Here is a place where I shared my interests, experiences, and thoughts on various topics. I hope you enjoy it...
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-[#824D3B] bg-[#824D3B] text-[#FDFCF7] font-medium rounded shadow-sm hover:opacity-90 transition-all duration-200">
                Read Blog
              </a>
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-[#AC9E85] text-[#2C2C2C] font-medium rounded hover:bg-[#F3EFDF] transition-all duration-200">
                View Portfolio
              </a>
            </div>
          </div>

          {/* Avatar Side */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-md border-2 border-[#AC9E85] p-1 bg-white shadow-md">
              <Image 
                src={portfolioImg} 
                alt="Do Duc Khanh Nguyen"
                className="w-full h-auto filter sepia-[5%] contrast-[98%]"
                priority
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. ABOUT SNIPPET
            ===================================================================== */}
        <section className="bg-[#F3EFDF] border-y border-[#E5E3DB] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-serif text-2xl font-bold mb-4">About Me</h3>
            <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed italic">
              "I am a Transportation, Logistics & Data Engineer. I am passionate about Data Science, Computer Science and Technology. I have a strong interest in Sports and Health Science. "
            </p>
          </div>
        </section>

        {/* =====================================================================
            4. FEATURED POSTS Section
            ===================================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex justify-between items-baseline mb-12">
            <h3 className="font-serif text-3xl font-bold">Featured Posts</h3>
            <a href="#" className="text-sm font-medium text-[#824D3B] hover:underline">View all &rarr;</a>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <article key={index} className="flex flex-col bg-white border border-[#E5E3DB] rounded p-6 hover:shadow-md transition-shadow duration-200">
                <span className="text-xs font-mono text-[#AC9E85] mb-2">{post.date}</span>
                <h4 className="font-serif text-xl font-bold mb-3 hover:text-[#824D3B] transition-colors">
                  <a href={post.link}>{post.title}</a>
                </h4>
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
        </section>
      </main>

      {/* =====================================================================
          5. FOOTER SECTION
          ===================================================================== */}
      <footer className="border-t border-[#E5E3DB] bg-[#FDFCF7] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <div className="text-sm text-[#AC9E85] font-mono">
            &copy; 2025 Do Duc Khanh Nguyen. All rights reserved.
          </div>

          {/* Social Links Placeholder */}
          <div className="flex space-x-6">
            <a href="#" className="text-[#824D3B] hover:text-[#AC9E85] transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-[#824D3B] hover:text-[#AC9E85] transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.77.84 1.235 1.911 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .321.218.702.83.582 4.765-1.593 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="text-[#824D3B] hover:text-[#AC9E85] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.047-.02z"/>
              </svg>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
