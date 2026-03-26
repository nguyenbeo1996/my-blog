"use client";

import Link from "next/link";
import { useContext } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageContext } from "./context/LanguageContext";

export default function NotFound() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans antialiased transition-colors duration-300">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-6 text-center">
        <div className="max-w-xl w-full">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-[#824D3B] dark:text-[#D4A373]">
              404
            </h1>
            <div className="h-1 w-20 bg-[#DCD5C6] dark:bg-[#40403F] mx-auto mt-6 rounded"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
            {language === 'vi' ? 'Lạc đường rồi bạn ơi!' : 'Oops! Page Not Found.'}
          </h2>
          
          <p className="text-[#6B5B4C] dark:text-[#A0A0A0] text-lg md:text-xl mb-12 leading-relaxed max-w-md mx-auto">
            {language === 'vi' 
              ? 'Trang bạn đang tìm kiếm có vẻ đã "bay màu" hoặc chưa từng tồn tại trên cõi đời này. Hãy để tôi dẫn bạn về nhà nhé!' 
              : 'The page you are looking for seems to have flown away or never existed. Let me guide you back home!'}
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white dark:bg-[#1C1C1B] border border-[#DCD5C6] dark:border-[#40403F] text-[#824D3B] dark:text-[#D4A373] font-bold tracking-wide uppercase text-sm rounded hover:bg-[#F3EFDF] dark:hover:bg-[#20201F] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            {language === 'vi' ? 'Trở về Trang Chủ' : 'Back to Homepage'}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
