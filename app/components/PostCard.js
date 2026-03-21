import Link from "next/link";

export default function PostCard({ title, date, category, excerpt, slug = "#" }) {
  const categoryStyles = {
    "Data Analysis": "text-blue-700 bg-blue-50/70 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
    "Life": "text-emerald-700 bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    "Science": "text-indigo-700 bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800",
  };

  const currentStyle = categoryStyles[category] || "text-[#824D3B] dark:text-[#D4A373] bg-[#FDFCF7] dark:bg-[#1E1E1D] border-[#DCD5C6] dark:border-[#383835]";

  const postLink = slug.startsWith("#") ? "#" : `/blog/${slug}`;

  return (
    <article className="flex flex-col bg-white dark:bg-[#1C1C1B] border border-[#E5E3DB] dark:border-[#2C2C2A] rounded p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 h-full group">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-mono text-[#AC9E85] dark:text-[#8B8B87]">{date}</span>
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded transition-colors ${currentStyle}`}>
          {category}
        </span>
      </div>
      
      <h2 className="font-sans text-xl font-bold mb-3 group-hover:text-[#824D3B] dark:group-hover:text-[#D4A373] transition-colors leading-snug text-[#2C2C2C] dark:text-[#F3F4F6]">
        <Link href={postLink}>{title.normalize("NFC")}</Link>
      </h2>
      
      <p className="text-sm text-[#5A5A5A] dark:text-[#A0A09C] mb-5 flex-grow leading-relaxed">
        {excerpt.normalize("NFC")}
      </p>
      
      <div className="mt-auto">
        <Link href={postLink} className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#824D3B] dark:text-[#D4A373] hover:opacity-80 transition-opacity">
          Read more <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
