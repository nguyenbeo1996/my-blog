# Skills & Workflows

## new-page
When creating a new page:
1. Create folder in app/ with page.js inside
2. Add proper metadata (title, description)
3. Import Header and Footer components
4. Wrap content in responsive container: max-w-3xl mx-auto px-4
5. Update CONTEXT.md status

## new-component
When creating a new component:
1. Create file in app/components/
2. Define props clearly at the top as comments
3. Use Tailwind CSS only
4. Make it mobile responsive
5. Export as default

## fix-bug
When fixing a bug:
1. Explain what caused the bug
2. Show the exact fix
3. Explain how to prevent it next time

## add-feature
When adding a new feature:
1. Check .ai/context.md for current state
2. Plan the implementation steps
3. Build step by step
4. Update .ai/context.md when done

## commit-ready
Before every commit, verify:
1. No console.log left in code
2. All pages responsive on mobile
3. Components properly imported
4. No hardcoded data that should come from database