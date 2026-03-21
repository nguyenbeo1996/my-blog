"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import iconImg from "../../public/images/icon.png";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  
  // Lấy Context Ngôn ngữ
  const { language, changeLanguage } = useContext(LanguageContext);
  const t = translations[language].nav;

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  const navItems = [
    { name: t.Home, href: "/" },
    { name: t.Blog, href: "/blog" },
    { name: t.About, href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF7]/90 dark:bg-[#181817]/90 backdrop-blur-sm border-b border-[#E5E3DB] dark:border-[#2C2C2A] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 font-sans text-xl font-bold tracking-tight hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-colors dark:text-[#F3F4F6]">
              <Image 
                src={iconImg} 
                alt="Icon" 
                width={34} 
                height={34} 
                className="dark:invert-[0.1]"
              />
              <span>Do Duc Khanh Nguyen</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-200 hover:text-[#824D3B] dark:hover:text-[#D4A373] ${
                      isActive 
                        ? "text-[#824D3B] dark:text-[#D4A373] font-semibold border-b-2 border-[#824D3B] dark:border-[#D4A373]" 
                        : "text-[#5A5A5A] dark:text-[#A0A0A0]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2 border-l border-[#DCD5C6] dark:border-[#40403F] pl-4">
              {/* Language Switcher */}
              <button
                onClick={() => changeLanguage(language === "vi" ? "en" : "vi")}
                className="flex items-center justify-center p-1.5 rounded-full border border-[#DCD5C6] dark:border-[#40403F] bg-white dark:bg-[#20201F] hover:bg-[#F3EFDF] dark:hover:bg-[#2C2C2A] transition-all duration-200"
                aria-label="Switch Language"
                title={language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              >
                <img 
                  src={language === "vi" ? "https://flagcdn.com/w40/vn.png" : "https://flagcdn.com/w40/gb.png"} 
                  alt={language === "vi" ? "Tiếng Việt" : "English"}
                  className="h-3.5 w-5 object-cover rounded shadow-sm"
                />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full border border-[#DCD5C6] dark:border-[#40403F] bg-white dark:bg-[#20201F] text-[#5A5A5A] dark:text-[#F3F4F6] hover:bg-[#F3EFDF] dark:hover:bg-[#2C2C2A] transition-all duration-200"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Section Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button onClick={() => changeLanguage(language === "vi" ? "en" : "vi")} className="p-1 px-1.5 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#1C1C1B]">
              <img 
                src={language === "vi" ? "https://flagcdn.com/w40/vn.png" : "https://flagcdn.com/w40/gb.png"} 
                className="h-3 w-4.5 object-cover" 
                alt="Flag" 
              />
            </button>
            <button onClick={toggleDarkMode} className="p-1 border border-[#DCD5C6] dark:border-[#40403F]">
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#F3EFDF] dark:hover:bg-[#2C2C2A] dark:text-[#F3F4F6]"
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
        <div className="md:hidden border-t border-[#E5E3DB] dark:border-[#2C2C2A] bg-[#FDFCF7] dark:bg-[#181817]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-[#F3EFDF] dark:hover:bg-[#2C2C2A] transition-colors ${
                    isActive 
                      ? "text-[#824D3B] dark:text-[#D4A373] bg-[#F3EFDF] dark:bg-[#2C2C2A] font-semibold" 
                      : "text-[#5A5A5A] dark:text-[#A0A0A0]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
