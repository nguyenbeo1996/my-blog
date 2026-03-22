import { translations } from "../../../app/translations";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Điểm chung cho cả 2 ngôn ngữ là slug giống nhau
  const postVi = translations.vi.posts.find((p) => p.slug === slug);
  const postEn = translations.en.posts.find((p) => p.slug === slug);

  const post = postVi || postEn;

  if (!post) {
    return {
      title: "Bài viết không tìm thấy | Do Duc Khanh Nguyen",
    };
  }

  return {
    title: `${post.title} | Do Duc Khanh Nguyen`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default function BlogPostLayout({ children }) {
  return <>{children}</>;
}
