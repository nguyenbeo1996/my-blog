require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration from environment variables
// Use service_role key for migration to bypass Row Level Security (RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env.local");
  console.error("Tip: Get the service_role key from Supabase Dashboard > Settings > API");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting migration...");

  try {
    // Hack to load ESM file in CJS since user specifically requested CommonJS
    // We read the file, remove the 'export' and 'module.exports' it.
    const translationsPath = path.join(__dirname, '../app/translations.js');
    const content = fs.readFileSync(translationsPath, 'utf8');
    
    // We replace 'export const translations =' with 'const translations ='
    // and append 'module.exports = translations;' to parse it locally
    const cjsContent = content
      .replace(/export const translations =/, 'const translations =')
      + '\nmodule.exports = translations;';

    // Temporary file for CJS
    const tempFile = path.join(__dirname, 'temp_translations.js');
    fs.writeFileSync(tempFile, cjsContent);
    const translations = require('./temp_translations');
    fs.unlinkSync(tempFile); // Cleanup

    const viPosts = translations.vi.posts;
    const enPosts = translations.en.posts;

    // Create a map by slug to easily combine vi/en data
    const postsMap = new Map();

    viPosts.forEach(post => {
      postsMap.set(post.slug, { vi: post });
    });

    enPosts.forEach(post => {
      if (postsMap.has(post.slug)) {
        postsMap.get(post.slug).en = post;
      } else {
        postsMap.set(post.slug, { en: post });
      }
    });

    const postsToInsert = [];
    postsMap.forEach((data, slug) => {
      const vi = data.vi || {};
      const en = data.en || {};

      postsToInsert.push({
        title_en: en.title || null,
        title_vi: vi.title || null,
        excerpt_en: en.excerpt || null,
        excerpt_vi: vi.excerpt || null,
        content_en: en.content ? JSON.stringify(en.content) : null,
        content_vi: vi.content ? JSON.stringify(vi.content) : null,
        slug: slug,
        category: vi.category || en.category,
        date: en.date || null,
        date_iso: vi.dateISO || en.dateISO || null,
        lang: "both",
        published: true
      });
    });

    console.log(`Mapping successful. Found ${postsToInsert.length} posts to migrate.`);

    let successCount = 0;
    let errorCount = 0;

    for (const post of postsToInsert) {
      const { data, error } = await supabase
        .from('posts')
        .insert([post]);

      if (error) {
        console.error(`Error inserting post with slug "${post.slug}":`, error.message);
        errorCount++;
      } else {
        console.log(`Success: Inserted post with slug "${post.slug}"`);
        successCount++;
      }
    }

    console.log("\nMigration completed.");
    console.log(`Total: ${postsToInsert.length}`);
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);

  } catch (error) {
    console.error("Migration failed with fatal error:", error.message);
  }
}

migrate();
