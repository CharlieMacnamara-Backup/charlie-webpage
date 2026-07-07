import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'

function importArticle(articleFilename) {
  try {
    const fullPath = path.join(
      process.cwd(),
      'src',
      'app',
      'blog',
      articleFilename,
    )

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`)
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // First check for article metadata
    const articleMatch = fileContents.match(
      /export const article = ({[\s\S]*?})/m,
    )

    if (articleMatch) {
      try {
        // Convert the metadata string to a valid JavaScript object
        const metadata = articleMatch[1]
        // Create a function that will evaluate the metadata string in a safe context
        const evalMetadata = new Function(`return ${metadata}`)
        const article = evalMetadata()

        return {
          slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
          ...article,
        }
      } catch (e) {
        console.error(
          `Error parsing article metadata for ${articleFilename}:`,
          e,
        )
      }
    }

    // Fallback to metadata if article is not found
    const metadataMatch = fileContents.match(
      /export const metadata = ({[\s\S]*?})/m,
    )
    if (metadataMatch) {
      try {
        // Convert the metadata string to a valid JavaScript object
        const metadata = metadataMatch[1]
        const evalMetadata = new Function(`return ${metadata}`)
        const articleMetadata = evalMetadata()

        // Extract slug from filename
        const slug = articleFilename.replace(/(\/page)?\.mdx$/, '')

        return {
          slug,
          title: articleMetadata.title || slug,
          description: articleMetadata.description || '',
          date: articleMetadata.date || new Date().toISOString().split('T')[0],
          author: articleMetadata.author || 'Charlie Macnamara',
        }
      } catch (e) {
        console.error(`Error parsing metadata for ${articleFilename}:`, e)
      }
    }

    return null
  } catch (e) {
    console.error(`Error processing ${articleFilename}:`, e)
    return null
  }
}

export function getAllArticles() {
  try {
    // Use sync version of glob
    const articleFilenames = glob.sync('*/page.mdx', {
      cwd: path.join(process.cwd(), 'src', 'app', 'blog'),
      ignore: ['_*/**'],
    })

    console.log('Found MDX files:', articleFilenames)

    const articles = articleFilenames
      .map(importArticle)
      .filter((article) => article !== null)

    return articles.sort((a, z) => new Date(z.date) - new Date(a.date))
  } catch (e) {
    console.error('Error in getAllArticles:', e)
    return []
  }
}
