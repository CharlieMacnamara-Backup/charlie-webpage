const fs = require('fs')
const path = require('path')
const glob = require('glob')

const glossaryPath = path.resolve(__dirname, '../src/data/glossary.json')
const blogDir = path.resolve(__dirname, '../src/app/blog')
const srcDir = path.resolve(__dirname, '../src')

function loadGlossary() {
  return JSON.parse(fs.readFileSync(glossaryPath, 'utf-8'))
}

function findDefinitionTerms(content) {
  const terms = []
  const regex = /<Definition\s+term="([^"]+)"[^>]*>/g
  let match
  while ((match = regex.exec(content)) !== null) {
    terms.push(match[1])
  }
  return terms
}

function findMdxFiles() {
  return glob.sync('**/page.mdx', { cwd: blogDir, ignore: '**/_template/**' })
}

function checkImportErrors(content, file) {
  const errors = []

  const importHeadingRegex = /^#\s+import\s/gm
  if (importHeadingRegex.test(content)) {
    errors.push(
      'Stray `# ` before import statement (turns it into a markdown heading)',
    )
  }

  if (/from\s+['"]\.\.?\/[^'"]+['"]/.test(content)) {
    errors.push(
      'Relative import detected — use @/ alias instead (e.g. @/components/ArticleLayout)',
    )
  }

  const importRegex = /from\s+['"]@\/([^'"]+)['"]/g
  let match
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1].replace(/\.\w+$/, '')
    const possibleExtensions = ['.js', '.jsx', '.ts', '.tsx', '.mdx']
    const exists = possibleExtensions.some((ext) => {
      const fullPath = path.join(srcDir, importPath + ext)
      return fs.existsSync(fullPath)
    })
    if (!exists) {
      errors.push(`Import @/${match[1]} does not resolve to any file in src/`)
    }
  }

  return errors
}

function checkNestedProse(content, file) {
  const errors = []
  const proseCount = (
    content.match(/className=["'][^"']*prose[^"']*["']/g) || []
  ).length
  if (proseCount > 1) {
    errors.push(
      `Found ${proseCount} prose class instances — expected at most 1 (use a single prose wrapper, nest with not-prose for custom components)`,
    )
  }
  return errors
}

function checkBlogSlugConsistency(content, file) {
  const errors = []
  const slugRegex = /blogSlug="([^"]+)"/g
  const slugs = []
  let match
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1])
  }
  if (slugs.length > 1) {
    const uniqueSlugs = [...new Set(slugs)]
    if (uniqueSlugs.length > 1) {
      errors.push(
        `Inconsistent blogSlug values: ${uniqueSlugs.map((s) => `"${s}"`).join(', ')} — all blogSlug references should match the article slug`,
      )
    }
  }
  return errors
}

function checkImageImport(content, file) {
  const errors = []
  const hasImageUsage = /<Image\s/.test(content)
  const hasImageImport = /import\s+Image\s+from\s+['"]next\/image['"]/.test(
    content,
  )
  if (hasImageUsage && !hasImageImport) {
    errors.push(
      "<Image> component used but `import Image from 'next/image'` is missing",
    )
  }
  return errors
}

function validate() {
  const glossary = loadGlossary()
  const definedTerms = new Set(Object.keys(glossary))

  const mdxFiles = findMdxFiles()
  const usedTerms = new Set()
  let hasErrors = false

  for (const file of mdxFiles) {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    const terms = findDefinitionTerms(content)
    for (const term of terms) {
      usedTerms.add(term)
      if (!definedTerms.has(term)) {
        console.error(
          `  ERROR: "${term}" used in ${file} but not defined in glossary.json`,
        )
        hasErrors = true
      }
    }

    const importErrors = checkImportErrors(content, file)
    for (const err of importErrors) {
      console.error(`  ERROR: ${file} — ${err}`)
      hasErrors = true
    }

    const proseErrors = checkNestedProse(content, file)
    for (const err of proseErrors) {
      console.error(`  ERROR: ${file} — ${err}`)
      hasErrors = true
    }

    const slugErrors = checkBlogSlugConsistency(content, file)
    for (const err of slugErrors) {
      console.error(`  ERROR: ${file} — ${err}`)
      hasErrors = true
    }

    const imageImportErrors = checkImageImport(content, file)
    for (const err of imageImportErrors) {
      console.error(`  ERROR: ${file} — ${err}`)
      hasErrors = true
    }
  }

  const unusedTerms = [...definedTerms].filter((t) => !usedTerms.has(t))
  if (unusedTerms.length > 0) {
    console.log(`  WARNING: Unused glossary terms: ${unusedTerms.join(', ')}`)
  }

  if (hasErrors) {
    console.error('\nFAILED: MDX validation found errors')
    process.exit(1)
  }

  console.log('OK: All MDX content checks passed')
}

validate()
