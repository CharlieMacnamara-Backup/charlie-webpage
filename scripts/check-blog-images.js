const fs = require('fs')
const path = require('path')
const glob = require('glob')

function extractImagePaths(content) {
  const paths = []
  ;['src=', 'poster='].forEach((attr) => {
    const re = new RegExp(`${attr}['"]([^'"]+)['"]`, 'g')
    let m
    while ((m = re.exec(content)) !== null) paths.push(m[1])
  })
  const gridRe = /src:\s*['"]([^'"]+)['"]/g
  let m
  while ((m = gridRe.exec(content)) !== null) paths.push(m[1])
  return paths
}

function resolveImagePath(imagePath) {
  if (imagePath.startsWith('http')) return null
  const blogMatch = imagePath.match(/^\/blog\/([^\/]+)\/(.*)$/)
  if (blogMatch) {
    return path.join(
      process.cwd(),
      'public',
      'blog',
      blogMatch[1],
      blogMatch[2],
    )
  }
  return path.join(process.cwd(), 'public', imagePath)
}

const blogPosts = glob.sync('src/app/blog/*/page.mdx')
let total = 0,
  missing = 0
const missingByBlog = {}

blogPosts.forEach((post) => {
  const content = fs.readFileSync(post, 'utf8')
  const blogName = post.split('/')[3]
  const paths = extractImagePaths(content)
  total += paths.length

  paths.forEach((p) => {
    const resolved = resolveImagePath(p)
    if (!resolved) return
    if (!fs.existsSync(resolved)) {
      missing++
      ;(missingByBlog[blogName] = missingByBlog[blogName] || []).push({
        path: p,
        resolvedTo: resolved,
      })
    }
  })
})

console.log(`\nBlog Image Check Summary:`)
console.log(`- Posts checked: ${blogPosts.length}`)
console.log(`- Images referenced: ${total}`)
console.log(`- Missing: ${missing}\n`)

if (missing) {
  Object.entries(missingByBlog).forEach(([blog, imgs]) => {
    console.log(`\n${blog} (${imgs.length} missing):`)
    imgs.forEach((i) => console.log(`  - ${i.path}`))
  })
} else {
  console.log('All blog images found successfully!')
}
