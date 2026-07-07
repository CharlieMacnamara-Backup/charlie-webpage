const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Ensures a directory exists, creating it if necessary
 * @param {string} dirPath - Path to the directory
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    // Recursively create parent directories too
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Migrates images from blog-specific directories to public/images/blog
 */
function migrateBlogImages() {
  // Find all blog directories
  const blogDirs = glob.sync('src/app/blog/*');
  
  // Track the migration stats
  let stats = {
    blogsProcessed: 0,
    imagesMigrated: 0,
    alreadyInCorrectLocation: 0,
    migrationFailed: 0
  };
  
  // Process each blog
  blogDirs.forEach(blogDir => {
    // Skip if not a directory
    if (!fs.statSync(blogDir).isDirectory()) return;
    
    const blogName = path.basename(blogDir);
    console.log(`\nProcessing blog: ${blogName}`);
    stats.blogsProcessed++;
    
    // Create the target directory in public/images if it doesn't exist
    const targetDir = path.join('public/images/blog', blogName);
    ensureDirectoryExists(targetDir);
    
    // Check if blog has an images directory
    const imagesDir = path.join(blogDir, 'images');
    if (!fs.existsSync(imagesDir) || !fs.statSync(imagesDir).isDirectory()) {
      console.log(`  No images directory found in ${blogName}`);
      return;
    }
    
    // Process the images directory
    processImagesDirectory(imagesDir, targetDir, stats);
  });
  
  return stats;
}

/**
 * Process all images in a directory, copying them to the target location
 * @param {string} sourceDir - Source directory
 * @param {string} targetDir - Target directory
 * @param {Object} stats - Stats object to update
 */
function processImagesDirectory(sourceDir, targetDir, stats) {
  // Find all files in the source directory
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const sourceStats = fs.statSync(sourcePath);
    
    // Handle nested directories recursively
    if (sourceStats.isDirectory()) {
      // Create nested directory in target
      const nestedTargetDir = path.join(targetDir, file);
      ensureDirectoryExists(nestedTargetDir);
      
      // Process the nested directory
      processImagesDirectory(sourcePath, nestedTargetDir, stats);
      return;
    }
    
    // Skip non-image files
    const ext = path.extname(file).toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.heic', '.mp4', '.mov'];
    if (!imageExtensions.includes(ext)) return;
    
    // Normalize the filename to lowercase
    const normalizedFile = file.toLowerCase();
    const targetPath = path.join(targetDir, normalizedFile);
    
    // Check if file already exists in target location
    if (fs.existsSync(targetPath)) {
      console.log(`  ✓ [Already Exists] ${file}`);
      stats.alreadyInCorrectLocation++;
      return;
    }
    
    try {
      // Copy the file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`  ✓ [Migrated] ${sourcePath} → ${targetPath}`);
      stats.imagesMigrated++;
    } catch (error) {
      console.error(`  ✗ [Error] Failed to copy ${file}: ${error.message}`);
      stats.migrationFailed++;
    }
  });
}

console.log('Starting blog image migration...');
const stats = migrateBlogImages();

console.log('\nMigration Complete!');
console.log(`- Blogs processed: ${stats.blogsProcessed}`);
console.log(`- Images migrated: ${stats.imagesMigrated}`);
console.log(`- Already in correct location: ${stats.alreadyInCorrectLocation}`);
console.log(`- Migration failures: ${stats.migrationFailed}`);

console.log(`\nNext steps:
1. Run 'node scripts/check-blog-images.js' to check for any remaining missing images
2. Update blog post MDX files to use the standardized /images/blog/<blog-name>/ path format
3. Consider running 'node scripts/fix-image-names.js' to normalize image filenames`); 