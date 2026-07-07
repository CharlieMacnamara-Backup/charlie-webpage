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

  // Check for stray markdown chars before import statements
  const importHeadingRegex = /^#\s+import\s/gm
  if (importHeadingRegex.test(content)) {
    errors.push('Stray `# ` before import statement (turns it into a markdown heading)')
  }

  // Reject relative imports — must use @/ alias
  if (/from\s+['"]\.\.?\/[^'"]+['"]/.test(content)) {
    errors.push('Relative import detected — use @/ alias instead (e.g. @/components/ArticleLayout)')
  }

  // Check for @/ imports and verify the target file exists
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

function validate() {
  const glossary = loadGlossary()
  const definedTerms = new Set(Object.keys(glossary))

  const mdxFiles = findMdxFiles()
  const usedTerms = new Set()
  let hasErrors = false

  for (const file of mdxFiles) {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    // Check Definition terms
    const terms = findDefinitionTerms(content)
    for (const term of terms) {
      usedTerms.add(term)
      if (!definedTerms.has(term)) {
        console.error(`  ERROR: "${term}" used in ${file} but not defined in glossary.json`)
        hasErrors = true
      }
    }

    // Check import errors
    const importErrors = checkImportErrors(content, file)
    for (const err of importErrors) {
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

  console.log('OK: All glossary terms used in MDX are defined, imports look valid')
}

validate()
