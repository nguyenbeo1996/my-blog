import Image from "next/image";
import Link from "next/link";
import portfolioImg from "../public/images/portfolio.jpg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostCard from "./components/PostCard";
import SectionTitle from "./components/SectionTitle";

export default function Home() {
  const featuredPosts = [
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

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#2C2C2C] font-sans antialiased">
      <Header />

      <main>
        {/* =====================================================================
            1. HERO SECTION
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
              <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 border border-[#824D3B] bg-[#824D3B] text-[#FDFCF7] font-medium rounded shadow-sm hover:opacity-90 transition-all duration-200">
                Read Blog
              </Link>
              <Link href="#" className="inline-flex items-center justify-center px-6 py-3 border border-[#AC9E85] text-[#2C2C2C] font-medium rounded hover:bg-[#F3EFDF] transition-all duration-200">
                View Portfolio
              </Link>
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
            2. ABOUT SNIPPET
            ===================================================================== */}
        <section className="bg-[#F3EFDF] border-y border-[#E5E3DB] py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-serif text-2xl font-bold mb-4">About</h3>
            <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed italic">
              "I am a Transportation, Logistics & Data Engineer. I am passionate about Data Science, Computer Science and Technology. I have a strong interest in Sports and Health Science. "
            </p>
          </div>
        </section>

        {/* =====================================================================
            3. FEATURED POSTS Section
            ===================================================================== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex justify-between items-baseline mb-12">
            <SectionTitle title="Featured Posts" centered={false} />
            <Link href="/blog" className="text-sm font-medium text-[#824D3B] hover:underline">View all &rarr;</Link>
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
