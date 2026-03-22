"use client";

import { useContext, use } from "react";
import Link from "next/link";
import Header from "../../../app/components/Header";
import Footer from "../../../app/components/Footer";
import { LanguageContext } from "../../../app/context/LanguageContext";
import { translations } from "../../../app/translations";

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const { language } = useContext(LanguageContext);

  const posts = translations[language].posts;
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[currentIndex];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
          <Link href="/blog" className="text-[#824D3B] dark:text-[#D4A373] hover:underline">
            &larr; Quay lại danh sách
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased transition-colors duration-300">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-[#824D3B] dark:text-[#D4A373] hover:underline hover:opacity-80 transition-all">
            &larr; {language === "vi" ? "Quay lại danh sách" : "Back to Articles"}
          </Link>
        </div>

        {/* Article Header */}
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
            {post.title.normalize("NFC")}
          </h1>
          <p className="text-lg text-[#5A5A5A] dark:text-[#A0A09C] italic">
            "{post.excerpt.normalize("NFC")}"
          </p>
        </header>

        {/* Article Body */}
        <article className="space-y-6 text-[#4A4A4A] dark:text-[#B0B0AC] leading-relaxed text-base md:text-lg">
          {post.content && post.content.map((paragraph, index) => (
            <p key={index}>{paragraph.normalize("NFC")}</p>
          ))}
        </article>

        {/* Prev / Next Navigation */}
        <div className="border-t border-[#E5E3DB] dark:border-[#2C2C2A] mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="w-full sm:w-1/2 text-left">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col p-4 border border-[#DCD5C6] dark:border-[#40403F] rounded hover:border-[#824D3B] dark:hover:border-[#824D3B] transition-colors h-full">
                <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">
                  &larr; {language === "vi" ? "Bài viết trước đó" : "Previous Post"}
                </span>
                <span className="text-sm font-bold text-[#2C2C2C] dark:text-[#F3F4F6] mt-1 group-hover:text-[#824D3B] dark:group-hover:text-[#D4A373] transition-colors line-clamp-1">
                  {prevPost.title.normalize("NFC")}
                </span>
              </Link>
            )}
          </div>
          
          <div className="w-full sm:w-1/2 text-right">
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col p-4 border border-[#DCD5C6] dark:border-[#40403F] rounded hover:border-[#824D3B] dark:hover:border-[#824D3B] transition-colors h-full">
                <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">
                  {language === "vi" ? "Bài viết tiếp theo" : "Next Post"} &rarr;
                </span>
                <span className="text-sm font-bold text-[#2C2C2C] dark:text-[#F3F4F6] mt-1 group-hover:text-[#824D3B] dark:group-hover:text-[#D4A373] transition-colors line-clamp-1">
                  {nextPost.title.normalize("NFC")}
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
