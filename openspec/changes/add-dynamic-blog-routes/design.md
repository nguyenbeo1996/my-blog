# Design: Add Dynamic Blog Post Routes

## Architecture
### 1. File Structure
- `app/blog/[slug]/page.js` (NEW): Full page template for each blog rendering.
- `app/translations.js` (Edit): Augment `posts` metadata model logic.
- `app/components/PostCard.js` (Edit): Modify component to use `/blog/[slug]`.

## Data Model (Metadata Expansion)
We will expand `translations.js` arrays to support `content` and accurate `slug` parameters:
```javascript
{
  title: "Cây gia phả của tôi",
  date: "15 Tháng 3 2026",
  category: "Cuộc sống",
  excerpt: "...",
  slug: "my-family-tree",
  content: [
    "Dòng 1: Giới thiệu gia phả ...",
    "Dòng 2: Nội dung gốc gác ...",
    "Dòng 3: Cảm xúc đọng lại ..."
  ]
}
```

## Page Layout (`app/blog/[slug]/page.js`)
*   **Header**: Standard menu bar correctly rendered.
*   **Body Container**:
    *   Title, Date, Category with Badge layout.
    *   Body text mapped into `<article>` standard layout containers with typography utilities.
*   **Footer Navigation**:
    *   Left/Right absolute layout anchors containing links to Post `Index - 1` and Post `Index + 1` offsets from the continuous lookup mapped offset securely.

## SEO Integration
We will inject `generateMetadata` or standard metadata config standard standard setups inside `app/blog/[slug]/page.js` following Next.js dynamic routing structures. Since full static parameters exist, it loads absolute quickly flawlessly!
