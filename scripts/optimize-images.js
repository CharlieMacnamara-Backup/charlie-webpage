#!/usr/bin/env node
/**
 * Optimise images in a directory in place (or preview with a dry run, the default).
 *
 * The site is a static export (`output: 'export'` forces `images.unoptimized: true`),
 * so next/image ships the original bytes with no resizing. Blog photos straight off a
 * phone are therefore served at 12MP into sub-1000px display slots.
 *
 * Usage:
 *   node scripts/optimize-images.js <dir> [--max=2048] [--quality=80] [--webp] [--palette] [--write]
 *
 *   --max      longest edge in px (default 2048; images already smaller are untouched)
 *   --quality  JPEG quality (default 80)
 *   --webp     convert PNGs to WebP. Tries lossless first and only falls back to
 *              lossy (quality 90) if lossless does not beat the original PNG.
 *              Writes `<name>.webp` and deletes the `.png` - references in MDX
 *              must be updated to match (plain string replace on the path).
 *   --palette  allow PNG palette quantisation (<=256 colours). LOSSY - only suitable
 *              for flat UI screenshots. Off by default because it bands photographs.
 *   --write    actually overwrite. Without it this only reports what would change.
 *
 * PNG output is lossless by default. Note that losslessly re-encoding an already
 * well-compressed PNG often saves nothing and can even grow the file; anything that
 * does not get smaller is left untouched.
 *
 * EXIF orientation is baked into the pixels before metadata is stripped, so rotation
 * survives the removal of the orientation tag.
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const args = process.argv.slice(2)
const target = args.find((arg) => !arg.startsWith('--'))
const write = args.includes('--write')
const palette = args.includes('--palette')
const toWebp = args.includes('--webp')

function flag(name, fallback) {
  const match = args.find((arg) => arg.startsWith(`--${name}=`))
  return match ? Number(match.split('=')[1]) : fallback
}

const MAX = flag('max', 2048)
const QUALITY = flag('quality', 80)
const WEBP_LOSSY_QUALITY = 90

if (!target) {
  console.error(
    'usage: node scripts/optimize-images.js <dir> [--max=2048] [--quality=80] [--webp] [--palette] [--write]',
  )
  process.exit(1)
}

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : [path.join(dir, entry.name)],
    )
}

const IMAGE = /\.(jpe?g|png)$/i
const mb = (bytes) => bytes / 1048576

async function optimise(file) {
  const before = fs.statSync(file).size
  const meta = await sharp(file).metadata()
  const isPng = meta.format === 'png'
  const longSide = Math.max(meta.width, meta.height)

  // fit: 'inside' constrains both axes, which matters because rotate() can swap
  // width/height for photos carrying an EXIF orientation tag.
  const geometry =
    longSide > MAX
      ? { width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true }
      : null

  const chain = (encoder, options) => {
    let pipeline = sharp(file).rotate()
    if (geometry) pipeline = pipeline.resize(geometry)
    return pipeline[encoder](options).toBuffer()
  }

  let buffer
  let encoding
  let outPath = file

  if (!isPng) {
    buffer = await chain('jpeg', {
      quality: QUALITY,
      mozjpeg: true,
      progressive: true,
    })
    encoding = `jpeg q${QUALITY}`
  } else if (toWebp) {
    // Prefer lossless WebP; only accept lossy if lossless cannot beat the PNG.
    const lossless = await chain('webp', { lossless: true, effort: 6 })
    const lossy = await chain('webp', {
      quality: WEBP_LOSSY_QUALITY,
      effort: 6,
    })
    if (lossless.length <= Math.min(lossy.length, before)) {
      buffer = lossless
      encoding = 'webp lossless'
    } else {
      buffer = lossy
      encoding = `webp q${WEBP_LOSSY_QUALITY}`
    }
    outPath = file.replace(/\.png$/i, '.webp')
  } else {
    buffer = await chain('png', { compressionLevel: 9, effort: 10, palette })
    encoding = palette ? 'png palette' : 'png lossless'
  }

  return {
    file,
    outPath,
    rel: null,
    format: meta.format,
    encoding,
    dims: `${meta.width}x${meta.height}`,
    resized: Boolean(geometry),
    hasAlpha: Boolean(meta.hasAlpha),
    before,
    after: buffer.length,
    buffer,
  }
}

;(async () => {
  const files = walk(target)
    .filter((file) => IMAGE.test(file))
    .sort()

  const rows = []
  for (const file of files) {
    try {
      rows.push(await optimise(file))
    } catch (error) {
      console.error(`  SKIP ${file}: ${error.message}`)
    }
  }

  rows.sort((a, b) => b.before - b.after - (a.before - a.after))

  const pad = (value, width) => String(value).padEnd(width)
  console.log(
    pad('file', 40) +
      pad('enc', 14) +
      pad('dims', 12) +
      pad('before', 10) +
      pad('after', 10) +
      'saved',
  )
  console.log('-'.repeat(100))

  for (const row of rows) {
    const rel = path.relative(target, row.file)
    const saved = row.before - row.after
    console.log(
      pad(rel.slice(0, 39), 40) +
        pad(row.encoding, 14) +
        pad(row.dims, 12) +
        pad(`${mb(row.before).toFixed(2)}MB`, 10) +
        pad(`${mb(row.after).toFixed(2)}MB`, 10) +
        (saved > 0
          ? `${mb(saved).toFixed(2)}MB (${Math.round((saved / row.before) * 100)}%)`
          : '0 (skipped)'),
    )
  }

  const kept = rows.filter((row) => row.after >= row.before)
  const written = rows.filter((row) => row.after < row.before)
  const beforeTotal = rows.reduce((sum, row) => sum + row.before, 0)
  const afterTotal = rows.reduce(
    (sum, row) => sum + Math.min(row.before, row.after),
    0,
  )

  console.log('-'.repeat(100))
  console.log(
    `${rows.length} images: ${mb(beforeTotal).toFixed(1)}MB -> ${mb(afterTotal).toFixed(1)}MB` +
      ` (saves ${mb(beforeTotal - afterTotal).toFixed(1)}MB, ${Math.round(((beforeTotal - afterTotal) / beforeTotal) * 100)}%)`,
  )
  console.log(`${written.length} to write, ${kept.length} left untouched`)

  if (!write) {
    console.log('\nDRY RUN - nothing written. Re-run with --write to apply.')
    return
  }

  for (const row of written) {
    fs.writeFileSync(row.outPath, row.buffer)
    if (row.outPath !== row.file) fs.unlinkSync(row.file)
  }

  if (toWebp && written.some((row) => row.outPath !== row.file)) {
    console.log(
      '\nPNGs converted to WebP - update any references to the old .png paths.',
    )
    for (const row of written.filter((r) => r.outPath !== r.file)) {
      console.log(
        `  ${path.relative(process.cwd(), row.file)} -> ${path.relative(process.cwd(), row.outPath)}`,
      )
    }
  }

  console.log(`\nWROTE ${written.length} file(s).`)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
