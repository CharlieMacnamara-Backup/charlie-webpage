const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ts = require('typescript')

const messages = require('../src/data/locales.js').messages

const scanPatterns = [
  'src/app/**/*.{js,jsx,ts,tsx}',
  'src/components/**/*.{js,jsx,ts,tsx}',
]

const ignorePatterns = [
  '**/_template/**',
  '**/__tests__/**',
  '**/*.test.*',
  '**/*.mdx',
  '**/*.md',
]

// Attribute names whose string-literal values are user-visible text.
// Note: aria-labelledby is intentionally NOT in the allowlist — its value is
// an element-ID reference (like htmlFor), not visible text (see SimpleLayout,
// Loading). Flagging it would be a false positive.
const translatableAttrs = new Set([
  'placeholder',
  'alt',
  'title',
  'aria-label',
  'content',
  'summary',
])

function scriptKindFor(file) {
  switch (path.extname(file)) {
    case '.js':
      return ts.ScriptKind.JS
    case '.jsx':
      return ts.ScriptKind.JSX
    case '.ts':
      return ts.ScriptKind.TS
    case '.tsx':
      return ts.ScriptKind.TSX
    default:
      return ts.ScriptKind.TSX
  }
}

function resolvePath(obj, parts) {
  return parts.reduce((acc, part) => {
    if (acc === null || acc === undefined) return undefined
    return acc[part]
  }, obj)
}

function findTranslationNamespaces(sf) {
  const namespaces = new Set()
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === 'useTranslations' ||
        node.expression.text === 'getTranslations') &&
      node.arguments.length > 0 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      namespaces.add(node.arguments[0].text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return namespaces
}

function checkFile(file) {
  const absolutePath = path.resolve(__dirname, '..', file)
  const content = fs.readFileSync(absolutePath, 'utf-8')
  const sf = ts.createSourceFile(
    file,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKindFor(file),
  )

  const flags = []
  const warnings = new Set()
  const namespaces = findTranslationNamespaces(sf)

  function position(node) {
    const pos = sf.getLineAndCharacterOfPosition(node.getStart(sf))
    return `${file}:${pos.line + 1}:${pos.character + 1}`
  }

  function inMetadataObject(node) {
    // Walk up the tree: are we inside the object literal of
    // `export const metadata = {...}`?
    let current = node.parent
    while (current) {
      if (ts.isVariableDeclaration(current)) {
        if (
          ts.isIdentifier(current.name) &&
          current.name.text === 'metadata' &&
          current.initializer &&
          ts.isObjectLiteralExpression(current.initializer)
        ) {
          // Ensure the enclosing statement is `export const metadata`
          let statement = current
          while (statement.parent && !ts.isSourceFile(statement.parent)) {
            statement = statement.parent
          }
          if (
            ts.isVariableStatement(statement) &&
            statement.modifiers &&
            statement.modifiers.some(
              (m) => m.kind === ts.SyntaxKind.ExportKeyword,
            )
          ) {
            return true
          }
        }
      }
      current = current.parent
    }
    return false
  }

  function visit(node) {
    // (a) JSX text nodes containing letters
    if (ts.isJsxText(node)) {
      const text = node.text.replace(/\s+/g, ' ').trim()
      if (/[A-Za-z]/.test(text)) {
        flags.push(
          `${position(node)} hardcoded JSX text: "${text.slice(0, 80)}"`,
        )
      }
    }

    // (b) string-literal values of allowlisted translatable attributes
    if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
      const attrName = node.name.text
      if (
        translatableAttrs.has(attrName) &&
        node.initializer &&
        ts.isStringLiteral(node.initializer)
      ) {
        const value = node.initializer.text
        if (/[A-Za-z]/.test(value)) {
          flags.push(
            `${position(node)} hardcoded ${attrName}: "${value.slice(0, 80)}"`,
          )
        }
      }
    }

    // (c) string values inside `export const metadata = {...}` objects
    if (ts.isPropertyAssignment(node) && ts.isStringLiteral(node.initializer)) {
      if (inMetadataObject(node)) {
        const value = node.initializer.text
        if (/[A-Za-z]/.test(value)) {
          flags.push(
            `${position(node)} hardcoded metadata string: "${value.slice(0, 80)}"`,
          )
        }
      }
    }

    // Dangling-key warnings (exit code unaffected)
    if (
      ts.isCallExpression(node) &&
      node.arguments.length > 0 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      const exprText = node.expression.getText(sf)
      if (exprText === 't' || exprText.startsWith('t.')) {
        const key = node.arguments[0].text
        const parts = key.split('.')
        let resolved = false
        for (const ns of namespaces) {
          if (resolvePath(messages[ns], parts) !== undefined) {
            resolved = true
            break
          }
        }
        if (!resolved && resolvePath(messages, parts) !== undefined) {
          resolved = true
        }
        if (!resolved) {
          warnings.add(
            `${position(node.arguments[0])} warning: t("${key}") does not resolve in locales.js`,
          )
        }
      }
    }

    if (ts.isPropertyAccessExpression(node)) {
      const parts = []
      let current = node
      while (ts.isPropertyAccessExpression(current)) {
        parts.unshift(current.name.text)
        current = current.expression
      }
      if (ts.isIdentifier(current) && current.text === 'messages') {
        if (resolvePath(messages, parts) === undefined) {
          warnings.add(
            `${position(node)} warning: messages.${parts.join('.')} does not resolve in locales.js`,
          )
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sf)
  return { flags, warnings }
}

function main() {
  const files = scanPatterns
    .flatMap((pattern) => glob.sync(pattern, { ignore: ignorePatterns }))
    .filter(
      (file) =>
        !file.includes('_template') &&
        !file.includes('__tests__') &&
        !file.includes('.test.'),
    )

  let allFlags = []
  const allWarnings = new Set()

  for (const file of files) {
    const { flags, warnings } = checkFile(file)
    allFlags = allFlags.concat(flags)
    for (const w of warnings) {
      allWarnings.add(w)
    }
  }

  if (allWarnings.size > 0) {
    console.error(`WARNING: ${allWarnings.size} dangling key reference(s)`)
    for (const w of allWarnings) {
      console.error(`  ${w}`)
    }
  }

  if (allFlags.length > 0) {
    console.error(`FAILED: ${allFlags.length} hardcoded string(s) found`)
    for (const f of allFlags) {
      console.error(`  ${f}`)
    }
    process.exit(1)
  }

  console.log(`OK: no hardcoded strings in ${files.length} scanned file(s)`)
}

main()
