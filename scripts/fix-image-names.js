const fs = require('fs')
const path = require('path')

/**
 * Normalizes image filenames to lowercase in a directory
 * @param {string} dirPath - Path to directory containing images
 */
function normalizeImageNames(dirPath) {
  console.log(`Normalizing image names in ${dirPath}...`)

  if (!fs.existsSync(dirPath)) {
    console.error(`Directory does not exist: ${dirPath}`)
    return
  }

  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      // Recursively process subdirectories
      normalizeImageNames(filePath)
    } else {
      // Process image files
      const ext = path.extname(file).toLowerCase()
      const imageExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.svg',
        '.heic',
      ]

      if (imageExtensions.includes(ext)) {
        const lowercaseFile = file.toLowerCase()

        // Only rename if the filename has uppercase characters
        if (file !== lowercaseFile) {
          const newPath = path.join(dirPath, lowercaseFile)
          console.log(`Renaming: ${file} → ${lowercaseFile}`)

          try {
            fs.renameSync(filePath, newPath)
          } catch (error) {
            console.error(`Error renaming ${file}: ${error.message}`)
          }
        }
      }
    }
  })
}

// Normalize images in the public/images directory
normalizeImageNames(path.join(__dirname, '../public/images'))

console.log('Image normalization complete!')
