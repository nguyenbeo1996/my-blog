"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default function PostForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [titleEn, setTitleEn] = useState("");
  const [titleVi, setTitleVi] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Cuộc sống");
  const [dateIso, setDateIso] = useState(new Date().toISOString().split("T")[0]);
  const [published, setPublished] = useState(false);
  
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptVi, setExcerptVi] = useState("");
  
  const [contentEn, setContentEn] = useState(""); // We will store as raw text
  const [contentVi, setContentVi] = useState(""); // and split by newline before saving to DB

  // Initialize data if editing
  useEffect(() => {
    if (initialData) {
      setTitleEn(initialData.title_en || "");
      setTitleVi(initialData.title_vi || "");
      setSlug(initialData.slug || "");
      setCategory(initialData.category || "Cuộc sống");
      setDateIso(initialData.date_iso || new Date().toISOString().split("T")[0]);
      setPublished(initialData.published || false);
      setExcerptEn(initialData.excerpt_en || "");
      setExcerptVi(initialData.excerpt_vi || "");

      // DB content is stored as JSON array of strings: '["Para 1", "Para 2"]'
      try {
        const parsedEn = JSON.parse(initialData.content_en || "[]");
        setContentEn(Array.isArray(parsedEn) ? parsedEn.join("\n\n") : "");
      } catch { setContentEn(""); }

      try {
        const parsedVi = JSON.parse(initialData.content_vi || "[]");
        setContentVi(Array.isArray(parsedVi) ? parsedVi.join("\n\n") : "");
      } catch { setContentVi(""); }
    }
  }, [initialData]);

  // Auto-generate slug from English title
  function handleTitleEnChange(e) {
    const newVal = e.target.value;
    setTitleEn(newVal);
    if (!initialData) {
      const generatedSlug = newVal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dash
        .replace(/(^-|-$)+/g, ""); // remove leading/trailing dash
      setSlug(generatedSlug);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert raw text into JSON array of paragraphs (filtering empty lines)
    const contentEnArray = contentEn.split("\n").map(s => s.trim()).filter(Boolean);
    const contentViArray = contentVi.split("\n").map(s => s.trim()).filter(Boolean);

    const postData = {
      title_en: titleEn,
      title_vi: titleVi,
      slug,
      category,
      date_iso: dateIso,
      published,
      excerpt_en: excerptEn,
      excerpt_vi: excerptVi,
      content_en: JSON.stringify(contentEnArray),
      content_vi: JSON.stringify(contentViArray),
      // Set the date column logic (just keeping it as a display string if needed, though date_iso is preferred)
      // The old format used localized string but date_iso is best for sorting
    };

    let res;
    if (isEdit) {
      res = await supabase
        .from("posts")
        .update(postData)
        .eq("id", initialData.id);
    } else {
      res = await supabase
        .from("posts")
        .insert([postData]);
    }

    if (res.error) {
      setError(res.error.message);
      setLoading(false);
      return;
    }

    // Success! Navigate back to admin dashboard
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white dark:bg-[#1C1C1B] rounded border border-[#DCD5C6] dark:border-[#40403F] p-6 shadow-sm">
      
      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          Error: {error}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Title (EN)*</label>
          <input required type="text" value={titleEn} onChange={handleTitleEnChange} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Title (VI)*</label>
          <input required type="text" value={titleVi} onChange={(e) => setTitleVi(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">URL Slug*</label>
          <input required type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Category*</label>
            <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]">
              <option value="Cuộc sống">Cuộc sống (Life)</option>
              <option value="Phân tích Dữ liệu">Phân tích dữ liệu (Data Analysis)</option>
              <option value="Khoa học">Khoa học (Science)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Date*</label>
            <input required type="date" value={dateIso} onChange={(e) => setDateIso(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]" />
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Excerpt (EN)*</label>
          <textarea required rows="3" value={excerptEn} onChange={(e) => setExcerptEn(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2] resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Excerpt (VI)*</label>
          <textarea required rows="3" value={excerptVi} onChange={(e) => setExcerptVi(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2] resize-none" />
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Content (EN) - Press Enter for new paragraphs</label>
          <textarea required rows="10" value={contentEn} onChange={(e) => setContentEn(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B5B4C] dark:text-[#A0A0A0] mb-1">Content (VI) - Nút Enter tạo đoạn văn mới</label>
          <textarea required rows="10" value={contentVi} onChange={(e) => setContentVi(e.target.value)} className="w-full px-3 py-2 border border-[#DCD5C6] dark:border-[#40403F] rounded bg-white dark:bg-[#2C2C2A] focus:outline-none focus:border-[#824D3B] text-sm text-[#2C2C2C] dark:text-[#E2E2E2]" />
        </div>
      </div>

      {/* Published Toggle */}
      <div className="flex items-center gap-2">
        <input id="publishedToggle" type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 text-[#824D3B] border-[#DCD5C6] rounded focus:ring-[#824D3B] dark:border-[#40403F]" />
        <label htmlFor="publishedToggle" className="text-sm font-medium text-[#2C2C2C] dark:text-[#F3F4F6] cursor-pointer">Live / Published Status</label>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-[#E5E3DB] dark:border-[#40403F]">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-[#824D3B] text-white text-sm font-semibold rounded hover:bg-[#6B3E2F] disabled:opacity-50 transition-colors">
          {loading ? "Saving..." : (isEdit ? "Update Post" : "Create Post")}
        </button>
        <Link href="/admin" className="text-sm text-[#AC9E85] dark:text-[#8B8B87] hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
