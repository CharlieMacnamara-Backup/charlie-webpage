import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, dirname, join, relative, resolve } from 'path'

const ROOT = resolve(import.meta.dirname, '..')
const D2_BIN = process.env.D2_PATH || 'd2'
const SITE_FONT = "'Trebuchet MS', sans-serif"

function usage() {
  console.error('Usage: node scripts/generate-blog-diagram.mjs <path-to-d2-file>')
  process.exit(1)
}

const srcPath = process.argv[2]
if (!srcPath) usage()

const srcAbsolute = resolve(ROOT, srcPath)
if (!existsSync(srcAbsolute)) {
  console.error(`Error: ${srcAbsolute} not found`)
  process.exit(1)
}

const blogContentDir = join(ROOT, 'src', 'app', 'blog')
const publicBlogDir = join(ROOT, 'public', 'blog')

if (!srcAbsolute.startsWith(blogContentDir)) {
  console.error(`Error: diagram source must be under ${blogContentDir}`)
  process.exit(1)
}

const relativePath = relative(blogContentDir, srcAbsolute)
const outName = basename(relativePath).replace(/\.d2$/, '')
const outDir = dirname(join(publicBlogDir, relativePath))
mkdirSync(outDir, { recursive: true })

const svgPath = join(outDir, outName + '.svg')

console.log(`Generating diagram from ${relative(ROOT, srcAbsolute)}...`)
console.log(`  Output: ${relative(ROOT, svgPath)}`)

try {
  execSync(`${D2_BIN} --pad 20 "${srcAbsolute}" "${svgPath}"`, {
    cwd: ROOT,
    stdio: 'inherit',
  })
} catch (err) {
  console.error('D2 generation failed:', err.message)
  process.exit(1)
}

let svg = readFileSync(svgPath, 'utf-8')

const innerSvgMatch = svg.match(
  /<svg[^>]*class="d2-[^"]* d2-svg"[^>]*viewBox="([^"]*)"[^>]*>([\s\S]*)<\/svg><\/svg>/,
)

if (innerSvgMatch) {
  const [, viewBox, content] = innerSvgMatch
  const cleaned = content
    .replace(/<rect[^>]*\/>\s*/, '')
    .replace(/@font-face\s*\{[^}]*\}/g, '')
    .replace(/font-family:\s*"[^"]*"/g, `font-family: ${SITE_FONT}`)
  svg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="${viewBox}" style="background:transparent">
${cleaned}
</svg>`
}

writeFileSync(svgPath, svg, 'utf-8')
console.log('Done.')
