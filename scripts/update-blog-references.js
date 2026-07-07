const fs = require('fs')
const path = require('path')
const glob = require('glob')

/**
 * Updates image references in blog post MDX files
 */
function updateBlogReferences() {
  console.log('Updating blog image references...')

  // Find all blog post MDX files
  const blogPosts = glob.sync('src/app/blog/*/page.mdx')

  let stats = {
    postsProcessed: 0,
    referencesUpdated: 0,
    errors: 0,
  }

  // Process each blog post
  blogPosts.forEach((blogPost) => {
    try {
      const blogName = blogPost.split(path.sep)[2] // src/app/blog/[blogName]/page.mdx
      console.log(`\nProcessing blog: ${blogName}`)

      // Read the file content
      let content = fs.readFileSync(blogPost, 'utf8')
      let updatedContent = content
      let postReferencesUpdated = 0

      // Update src attributes in SingleImage components
      // Example: src="/blog/sourdough-journey/images/day1-1.jpg" => src="/images/blog/sourdough-journey/day1-1.jpg"
      const singleImageRegex = /src=["']\/blog\/([^\/]+)\/images\/([^"']+)["']/g
      updatedContent = updatedContent.replace(
        singleImageRegex,
        (match, blogSlug, imagePath) => {
          postReferencesUpdated++
          return `src="/images/blog/${blogSlug}/${imagePath}"`
        },
      )

      // Update src in image objects within TwoColGrid and ThreeColGrid components
      // Example: src: "/blog/sourdough-journey/images/day1-2.jpg" => src: "/images/blog/sourdough-journey/day1-2.jpg"
      const gridImageRegex =
        /src:\s*["']\/blog\/([^\/]+)\/images\/([^"']+)["']/g
      updatedContent = updatedContent.replace(
        gridImageRegex,
        (match, blogSlug, imagePath) => {
          postReferencesUpdated++
          return `src: "/images/blog/${blogSlug}/${imagePath}"`
        },
      )

      // Check if content was actually modified
      if (content !== updatedContent) {
        // Write the updated content back to the file
        fs.writeFileSync(blogPost, updatedContent, 'utf8')
        console.log(
          `✓ Updated ${postReferencesUpdated} references in ${blogName}`,
        )
        stats.referencesUpdated += postReferencesUpdated
      } else {
        console.log(`- No image references needed updating in ${blogName}`)
      }

      stats.postsProcessed++
    } catch (error) {
      console.error(`✗ [Error] Failed to process ${blogPost}: ${error.message}`)
      stats.errors++
    }
  })

  return stats
}

// Add blogSlug parameter to image components
function addBlogSlugParameter() {
  console.log('\nAdding blogSlug parameter to image components...')

  // Find all blog post MDX files
  const blogPosts = glob.sync('src/app/blog/*/page.mdx')

  let stats = {
    postsProcessed: 0,
    componentsUpdated: 0,
    errors: 0,
  }

  // Process each blog post
  blogPosts.forEach((blogPost) => {
    try {
      const blogName = blogPost.split(path.sep)[2] // src/app/blog/[blogName]/page.mdx

      // Read the file content
      let content = fs.readFileSync(blogPost, 'utf8')
      let updatedContent = content
      let postComponentsUpdated = 0

      // Add blogSlug parameter to TwoColGrid components that don't already have it
      const twoColGridRegex = /<TwoColGrid([^>]*)>/g
      updatedContent = updatedContent.replace(
        twoColGridRegex,
        (match, attributes) => {
          if (!attributes.includes('blogSlug=')) {
            postComponentsUpdated++
            return `<TwoColGrid${attributes} blogSlug="${blogName}">`
          }
          return match
        },
      )

      // Add blogSlug parameter to ThreeColGrid components that don't already have it
      const threeColGridRegex = /<ThreeColGrid([^>]*)>/g
      updatedContent = updatedContent.replace(
        threeColGridRegex,
        (match, attributes) => {
          if (!attributes.includes('blogSlug=')) {
            postComponentsUpdated++
            return `<ThreeColGrid${attributes} blogSlug="${blogName}">`
          }
          return match
        },
      )

      // Add blogSlug parameter to SingleImage components that don't already have it
      const singleImageRegex = /<SingleImage([^>]*)>/g
      updatedContent = updatedContent.replace(
        singleImageRegex,
        (match, attributes) => {
          if (!attributes.includes('blogSlug=')) {
            postComponentsUpdated++
            return `<SingleImage${attributes} blogSlug="${blogName}">`
          }
          return match
        },
      )

      // Check if content was actually modified
      if (content !== updatedContent) {
        // Write the updated content back to the file
        fs.writeFileSync(blogPost, updatedContent, 'utf8')
        console.log(
          `✓ Added blogSlug to ${postComponentsUpdated} components in ${blogName}`,
        )
        stats.componentsUpdated += postComponentsUpdated
      } else {
        console.log(`- No components needed updating in ${blogName}`)
      }

      stats.postsProcessed++
    } catch (error) {
      console.error(
        `✗ [Error] Failed to update components in ${blogPost}: ${error.message}`,
      )
      stats.errors++
    }
  })

  return stats
}

// Run the updates
console.log('Starting blog reference updates...')
const refStats = updateBlogReferences()
const compStats = addBlogSlugParameter()

console.log('\nBlog Reference Updates Complete!')
console.log(`- Blog posts processed: ${refStats.postsProcessed}`)
console.log(`- Image references updated: ${refStats.referencesUpdated}`)
console.log(`- Image components updated: ${compStats.componentsUpdated}`)
console.log(`- Errors encountered: ${refStats.errors + compStats.errors}`)

console.log('\nNext steps:')
console.log(
  '1. Check your blog posts to ensure images are displaying correctly',
)
console.log('2. Run the image check script to validate all references:')
console.log('   node scripts/check-blog-images.js')
