# Tasks: Add Dynamic Blog Post Routes

## 📋 1. Setup & Data Expansion
- [ ] Cập nhật toàn bộ `slug` từ `#` về mã ký tự thực tế cho tất cả bài viết trong `app/translations.js` (ví dụ: `my-family-tree`, `health-dashboard`, `story-about-life`).
- [ ] Bổ sung trường dữ liệu `content` đa dòng hoặc paragraphs vào các bài viết đa ngôn ngữ để làm nội dung đầy đủ cho trang Single Post.

## 📋 2. Cập nhật Component PostCard.js
- [ ] Sửa lại thẻ Liên kết `<Link href={postLink}>` trong `PostCard.js` để trỏ đúng đường dẫn `/blog/${slug}` thay vì `#`.

## 📋 3. Xây dựng Trang Dynamic /blog/[slug]
- [ ] Tạo thư mục `app/blog/[slug]` và tệp giao diện `page.js`.
- [ ] Tạo logic đọc `params.slug` từ Next.js.
- [ ] Đọc trạng thái ngôn ngữ qua `LanguageContext` hiện hành để tìm kiếm bài viết tương ứng bằng `.find(p => p.slug === slug)`.
- [ ] Phác họa UI: 
    *   Tiêu đề (H1), Ngày đăng, Danh mục (Category Badge).
    *   Thân bài viết (`<article>` Paragraph loops).
- [ ] Thêm liên kết **Bài viết trước đó** / **Bài viết tiếp theo** (Prev/Next Navigation) ở góc dưới chân trang.

## 📋 4. Kiểm thử và SEO Metadata
- [ ] Truyền hàm `generateMetadata` vào `page.js` để tự động trả về tiêu đề SEO và Meta Description khớp với nội dung bài viết.
- [ ] Kiểm tra xem chuyển đổi cờ Đa ngôn ngữ có hoạt động mượt mà trên Single Post View hay không.
- [ ] Xác minh tệp index bài viết không bị rỗng khi lọc.
