# Proposal: Add Dynamic Blog Post Routes

## Problem
Currently, the personal blog displays a static list of articles, but clicking on them does not navigate to a full post page (`/blog/[slug]`). This limits content readability, degrades user experience, and completely prevents fine-grained SEO metadata optimization per article.

## Solution
We will implement Next.js Dynamic Routes (`app/blog/[slug]/page.js`) that reads post details dynamically from our dictionary map (`translations.js`). Each post will have:
1.  **Full Article View**: Layout containing Cover image, title, date, categories & paragraphs.
2.  **Navigation Links**: Prev/Next post shortcuts standing at footer base.
3.  **Multilingual Handling**: Reads Vietnamese & English text flawlessly based on current Context layout layers.
4.  **SEO Metadata**: Appending dynamic `generateMetadata()` for dynamic Titles and Excerpts tags.

## Proposed Strategy
- Creates `app/blog/[slug]/page.js` Client/Server hybrid or Client page.
- Updates `app/translations.js` to augment post entries with `content` field details (e.g. paragraphs).
- Corrects `PostCard.js` to link correctly from slug `#` into `/blog/family-tree` offset.
