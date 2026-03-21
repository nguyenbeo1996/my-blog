import Image from "next/image";
import portfolioImg from "../../public/images/portfolio.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";

export default function About() {
  // Dữ liệu mạng xã hội
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/your-profile",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      href: "https://github.com/your-username",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.77.84 1.235 1.911 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .321.218.702.83.582 4.765-1.593 8.2-6.082 8.2-11.385 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://facebook.com/your-username",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://instagram.com/your-username",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.341 3.608 1.316.975.975 1.254 2.242 1.316 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.341 2.633-1.316 3.608-.975.975-2.242 1.254-3.608 1.316-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.341-3.608-1.316-.975-.975-1.254-2.242-1.316-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.341-2.633 1.316-3.608.975-.975 2.242-1.254 3.608-1.316 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.633.074-2.88.354-3.89 1.364-1.01 1.01-1.29 2.257-1.364 3.89-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.074 1.633.354 2.88 1.364 3.89 1.01 1.01 2.257 1.29 3.89 1.364 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.633-.074 2.88-.354 3.89-1.364 1.01-1.01 1.29-2.257 1.364-3.89.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.074-1.633-.354-2.88-1.364-3.89-1.01-1.01-2.257-1.29-3.89-1.364-1.28-.058-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      name: "Email",
      href: "mailto:your-email@example.com",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#2C2C2C] font-sans antialiased">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* =====================================================================
            1. ABOUT SECTION
            ==================================================================== */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
          
          {/* Avatar frame */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="max-w-xs border-2 border-[#AC9E85] p-1 bg-white shadow-md">
              <Image 
                src={portfolioImg} 
                alt="Do Duc Khanh Nguyen"
                className="w-full h-auto filter sepia-[5%] contrast-[98%]"
                priority
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* Text Description */}
          <div className="flex-1">
            <SectionTitle title="About" centered={false} />
            <h2 className="text-lg font-medium text-[#824D3B] mb-6 font-mono">
              Transportation, Logistics & Data Engineer
            </h2>
            <div className="space-y-4 text-[#5A5A5A] leading-relaxed">
              <p>
                Hello there! I is a place where I shared my interests, experiences, and thoughts on various topics. 
              </p>
              <p>
                I am a Transportation, Logistics & Data Engineer. I am passionate about Data Science, Computer Science and Technology. I have a strong interest in Sports and Health Science.
              </p>
              <p>
                Thank you for stopping by!
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. SOCIAL LINKS SECTION
            ==================================================================== */}
        <div className="border-t border-[#E5E3DB] pt-12">
          <h3 className="font-serif text-2xl font-bold mb-6 text-[#2C2C2C] text-center md:text-left">
            Connect with Me
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-5 border border-[#DCD5C6] rounded bg-white hover:bg-[#824D3B] hover:text-[#FDFCF7] hover:border-[#824D3B] text-[#824D3B] shadow-sm transition-all duration-300 group"
              >
                <div className="mb-2 group-hover:scale-110 transition-transform duration-200">
                  {link.icon}
                </div>
                <span className="text-xs font-mono font-medium tracking-wide text-[#5A5A5A] group-hover:text-[#FDFCF7]">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
