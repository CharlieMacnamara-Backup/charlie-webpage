const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Ensures a directory exists, creating it if necessary
 * @param {string} dirPath - Path to the directory
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

/**
 * Checks if two files are identical
 * @param {string} file1 - Path to first file
 * @param {string} file2 - Path to second file
 * @returns {boolean} - Whether the files are identical
 */
function areFilesIdentical(file1, file2) {
  try {
    const stat1 = fs.statSync(file1);
    const stat2 = fs.statSync(file2);
    
    // Quick check: if file sizes differ, files are different
    if (stat1.size !== stat2.size) {
      return false;
    }
    
    // For small files, compare content directly
    if (stat1.size < 10 * 1024 * 1024) { // Less than 10MB
      const content1 = fs.readFileSync(file1);
      const content2 = fs.readFileSync(file2);
      return content1.equals(content2);
    }
    
    // For larger files, we could implement chunk comparison
    // but for simplicity assume they're different
    return false;
  } catch (error) {
    return false;
  }
}

/**
 * Consolidates the image system by removing duplicates
 */
function consolidateImageSystem() {
  console.log('Starting image system consolidation...');
  
  // Stats for tracking
  const stats = {
    sourceImagesFound: 0,
    publicImagesFound: 0,
    duplicatesRemoved: 0,
    imagesMoved: 0,
    errors: 0
  };
  
  // Find all image files in src
  const srcImages = glob.sync('src/app/blog/*/images/**/*.{jpg,jpeg,png,gif,webp,svg,heic,mp4,mov}', { nocase: true });
  stats.sourceImagesFound = srcImages.length;
  console.log(`Found ${srcImages.length} images in src directories`);
  
  // Find all image files in public
  const publicImages = glob.sync('public/images/blog/**/*.{jpg,jpeg,png,gif,webp,svg,heic,mp4,mov}', { nocase: true });
  stats.publicImagesFound = publicImages.length;
  console.log(`Found ${publicImages.length} images in public directories`);
  
  // Process each image in src directories
  srcImages.forEach(srcImage => {
    try {
      // Extract blog name from path
      const pathParts = srcImage.split(path.sep);
      const blogName = pathParts[2]; // src/app/blog/[blogName]/images/...
      
      // Get the image file name and any subdirectories after "images"
      const imagePathParts = pathParts.slice(pathParts.indexOf('images') + 1);
      const imagePath = imagePathParts.join(path.sep);
      
      // Normalize the filename to lowercase
      const normalizedImagePath = imagePath.toLowerCase();
      
      // Determine target path in public directory
      const targetDir = path.join('public/images/blog', blogName);
      const targetPath = path.join(targetDir, normalizedImagePath);
      
      // Ensure target directory exists
      ensureDirectoryExists(path.dirname(targetPath));
      
      // Check if file already exists in public
      if (fs.existsSync(targetPath)) {
        // Compare files to see if they're identical
        if (areFilesIdentical(srcImage, targetPath)) {
          console.log(`✓ [Duplicate] Removing ${srcImage}`);
          fs.unlinkSync(srcImage);
          stats.duplicatesRemoved++;
        } else {
          console.log(`! [Conflict] Different versions exist: ${srcImage} and ${targetPath}`);
          // Create a backup with a timestamp suffix
          const timestamp = new Date().getTime();
          const backupPath = `${targetPath}.backup-${timestamp}`;
          fs.copyFileSync(srcImage, backupPath);
          console.log(`  Created backup: ${backupPath}`);
          fs.unlinkSync(srcImage);
          stats.duplicatesRemoved++;
        }
      } else {
        // File doesn't exist in public, move it
        fs.copyFileSync(srcImage, targetPath);
        fs.unlinkSync(srcImage);
        console.log(`✓ [Moved] ${srcImage} → ${targetPath}`);
        stats.imagesMoved++;
      }
    } catch (error) {
      console.error(`✗ [Error] Failed to process ${srcImage}: ${error.message}`);
      stats.errors++;
    }
  });
  
  // Clean up empty directories
  cleanupEmptyDirectories('src/app/blog');
  
  return stats;
}

/**
 * Recursively removes empty directories
 * @param {string} dirPath - Directory to clean
 * @returns {boolean} - Whether the directory was empty and removed
 */
function cleanupEmptyDirectories(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }
  
  let files = fs.readdirSync(dirPath);
  
  if (files.length > 0) {
    let isEmpty = true;
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const wasEmpty = cleanupEmptyDirectories(fullPath);
        isEmpty = isEmpty && wasEmpty;
      } else {
        isEmpty = false;
      }
    }
    
    // Recheck if directory is now empty after cleaning subdirectories
    files = fs.readdirSync(dirPath);
    if (isEmpty && files.length === 0) {
      fs.rmdirSync(dirPath);
      console.log(`✓ [Cleaned] Removed empty directory: ${dirPath}`);
      return true;
    }
    
    return false;
  } else {
    // Directory is empty, remove it
    fs.rmdirSync(dirPath);
    console.log(`✓ [Cleaned] Removed empty directory: ${dirPath}`);
    return true;
  }
}

// Run the consolidation
const stats = consolidateImageSystem();

console.log('\nImage System Consolidation Complete!');
console.log(`- Source images found: ${stats.sourceImagesFound}`);
console.log(`- Public images found: ${stats.publicImagesFound}`);
console.log(`- Duplicates removed: ${stats.duplicatesRemoved}`);
console.log(`- Images moved to public: ${stats.imagesMoved}`);
console.log(`- Errors encountered: ${stats.errors}`);

console.log('\nNext steps:');
console.log('1. Run the image check script to ensure all references are valid:');
console.log('   node scripts/check-blog-images.js');
console.log('2. Update any remaining image references in your blog files to use the standard format:');
console.log('   /images/blog/[blog-name]/image.jpg'); 