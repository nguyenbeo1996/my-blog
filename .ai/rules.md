# Coding Rules & Standards

## Tech Stack Rules
- Always use JavaScript, NEVER TypeScript
- Always use Tailwind CSS, NEVER plain CSS or inline styles
- Always use Next.js Image component, NEVER <img> tag
- Always use Next.js Link component, NEVER <a> tag for internal links
- Always use App Router patterns, NEVER Pages Router

## Component Rules
- One component per file
- File name = Component name (PascalCase)
  VD: PostCard.js, SectionTitle.js, Header.js
- Always define props as comments at top of component
- Always export as default

## Code Style
- Variable names: camelCase (postTitle, blogList)
- Component names: PascalCase (PostCard, BlogList)
- Constants: UPPER_SNAKE_CASE (MAX_POSTS, API_URL)
- Always add English comments for complex logic

## Responsive Rules
- Always mobile-first
- Breakpoints: sm(640) md(768) lg(1024) xl(1280)
- Test on mobile before desktop

## Performance Rules
- Always add alt text to images
- Always add loading="lazy" for non-critical images
- Keep components small and focused