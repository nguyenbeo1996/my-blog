import PostForm from "../components/PostForm";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7] dark:bg-[#121211] text-[#2C2C2C] dark:text-[#E2E2E2] font-sans">
      <header className="border-b border-[#E5E3DB] dark:border-[#2C2C2A] bg-white dark:bg-[#1A1A19]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/admin" className="text-xs font-mono text-[#AC9E85] hover:text-[#824D3B] dark:hover:text-[#D4A373] transition-colors">
            ← Admin Dashboard
          </Link>
          <span className="text-[#DCD5C6] dark:text-[#2C2C2A]">|</span>
          <span className="text-sm font-semibold text-[#2C2C2C] dark:text-[#F3F4F6]">
            Add New Post
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold mb-8">Create Post</h1>
        <PostForm isEdit={false} />
      </main>
    </div>
  );
}
