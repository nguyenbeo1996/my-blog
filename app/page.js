"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import portfolioImg from "../public/images/portfolio.jpg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import SectionTitle from "./components/SectionTitle";
import { LanguageContext } from "./context/LanguageContext";
import { translations } from "./translations";

export default function Home() {
  const { language } = useContext(LanguageContext);
  const t = translations[language].home;

  const featuredPosts = translations[language].posts;

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased transition-colors duration-300">
      <Header />

      <main>
        {/* =====================================================================
            1. HERO SECTION
            ===================================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* Info Side */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#2C2C2C] dark:text-[#F3F4F6] transition-colors leading-tight">
              Do Duc Khanh Nguyen
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-[#824D3B] dark:text-[#D4A373] mb-6 font-mono tracking-wide">
              {t.subtitle}
            </h2>
            <p className="text-base md:text-lg text-[#5A5A5A] dark:text-[#A0A09C] mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed transition-colors">
              {t.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 border border-[#824D3B] bg-[#824D3B] text-[#FDFCF7] font-medium rounded shadow-sm hover:bg-[#6B3E2F] hover:scale-105 transform transition-all duration-200">
                {t.readBlog}
              </Link>
              <Link href="#about" onClick={handleScrollToAbout} className="inline-flex items-center justify-center px-6 py-3 border border-[#AC9E85] dark:border-[#40403F] text-[#2C2C2C] dark:text-[#F3F4F6] font-medium rounded hover:bg-[#F3EFDF] dark:hover:bg-[#1C1C1B] hover:scale-105 transform transition-all duration-200">
                {t.viewPortfolio}
              </Link>
            </div>
          </div>

          {/* Avatar Side */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-md border-2 border-[#AC9E85] dark:border-[#40403F] p-1 bg-white dark:bg-[#1C1C1B] shadow-md hover:shadow-xl transform transition-all hover:scale-[1.01] duration-300">
              <Image 
                src={portfolioImg} 
                alt="Do Duc Khanh Nguyen"
                className="w-full h-auto filter sepia-[5%] dark:sepia-0 contrast-[98%]"
                priority
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. ABOUT SNIPPET
            ===================================================================== */}
        <section id="about" className="bg-[#F3EFDF] dark:bg-[#181817] border-y border-[#E5E3DB] dark:border-[#2C2C2A] py-16 transition-colors duration-300">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-serif text-2xl font-bold mb-4 text-[#2C2C2C] dark:text-[#F3F4F6]">{t.aboutTitle}</h3>
            <p className="text-base md:text-lg text-[#4A4A4A] dark:text-[#A0A09C] leading-relaxed italic">
              "{t.aboutText}"
            </p>
          </div>
        </section>

        {/* =====================================================================
            3. FEATURED POSTS Section
            ===================================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex justify-between items-baseline mb-12">
            <SectionTitle title={t.featured} centered={false} />
            <Link href="/blog" className="text-sm font-medium text-[#824D3B] dark:text-[#D4A373] hover:underline transition-colors">{t.viewAll} &rarr;</Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredPosts.map((post, index) => (
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
