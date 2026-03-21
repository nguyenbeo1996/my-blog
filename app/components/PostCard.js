import Link from "next/link";

export default function PostCard({ title, date, category, excerpt, slug = "#" }) {
  // Bản đồ màu vintage cho các danh mục
  const categoryStyles = {
    "Data Analysis": "text-blue-700 bg-blue-50/70 border-blue-200",
    "Life": "text-emerald-700 bg-emerald-50/70 border-emerald-200",
    "Science": "text-indigo-700 bg-indigo-50/70 border-indigo-200",
  };

  const currentStyle = categoryStyles[category] || "text-[#824D3B] bg-[#FDFCF7] border-[#DCD5C6]";

  const postLink = slug.startsWith("#") ? "#" : `/blog/${slug}`;

  return (
    <article className="flex flex-col bg-white border border-[#E5E3DB] rounded p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-mono text-[#AC9E85]">{date}</span>
        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded ${currentStyle}`}>
          {category}
        </span>
      </div>
      <h2 className="font-serif text-xl font-bold mb-3 hover:text-[#824D3B] transition-colors leading-snug">
        <Link href={postLink}>{title}</Link>
      </h2>
      <p className="text-sm text-[#5A5A5A] mb-5 flex-grow leading-relaxed">
        {excerpt}
      </p>
      <div className="mt-auto">
        <Link href={postLink} className="text-xs font-bold uppercase tracking-wider text-[#824D3B] hover:opacity-80 transition-opacity">
          Read more &rarr;
        </Link>
      </div>
    </article>
  );
}
