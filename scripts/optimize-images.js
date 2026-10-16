#!/usr/bin/env node
/**
 * Optimise images in a directory in place (or preview with --dry-run, the default).
 *
 * The site is a static export (`output: 'export'` forces `images.unoptimized: true`),
 * so next/image ships the original bytes with no resizing. Blog photos straight off a
 * phone are therefore served at 12MP into sub-1000px display slots.
 *
 * Usage:
 *   node scripts/optimize-images.js <dir> [--max=2048] [--quality=80] [--palette] [--write]
 *
 *   --max      longest edge in px (default 2048; images already smaller are untouched)
 *   --quality  JPEG quality (default 80)
 *   --palette  allow PNG palette quantisation (<=256 colours). LOSSY — only suitable
 *              for flat UI screenshots. Off by default because it bands photographs.
 *   --write    actually overwrite. Without it this only reports what would change.
 *
 * PNG output is lossless by default. Note that losslessly re-encoding an already
 * well-compressed PNG often saves nothing and can even grow the file; anything that
 * does not get smaller is left untouched. For real gains on photographic PNGs,
 * convert them to WebP/JPEG instead.
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

function flag(name, fallback) {
  const match = args.find((arg) => arg.startsWith(`--${name}=`))
  return match ? Number(match.split('=')[1]) : fallback
}

const MAX = flag('max', 2048)
const QUALITY = flag('quality', 80)

if (!target) {
  console.error(
    'usage: node scripts/optimize-images.js <dir> [--max=2048] [--quality=80] [--write]',
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

  // rotate() with no argument bakes in EXIF orientation.
  let pipeline = sharp(file).rotate()

  let resized = false
  if (longSide > MAX) {
    // fit: 'inside' constrains both axes, which matters because rotate() can swap
    // width/height for photos carrying an EXIF orientation tag.
    pipeline = pipeline.resize({
      width: MAX,
      height: MAX,
      fit: 'inside',
      withoutEnlargement: true,
    })
    resized = true
  }

  pipeline = isPng
    ? pipeline.png({ compressionLevel: 9, effort: 10, palette })
    : pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })

  const buffer = await pipeline.toBuffer()

  return {
    file,
    format: meta.format,
    dims: `${meta.width}x${meta.height}`,
    hasAlpha: Boolean(meta.hasAlpha),
    resized,
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
    pad('file', 42) +
      pad('fmt', 5) +
      pad('dims', 12) +
      pad('before', 10) +
      pad('after', 10) +
      'saved',
  )
  console.log('-'.repeat(95))

  for (const row of rows) {
    const rel = path.relative(target, row.file)
    const saved = row.before - row.after
    console.log(
      pad(rel.slice(0, 41), 42) +
        pad(row.format, 5) +
        pad(row.dims, 12) +
        pad(`${mb(row.before).toFixed(2)}MB`, 10) +
        pad(`${mb(row.after).toFixed(2)}MB`, 10) +
        (saved > 0
          ? `${mb(saved).toFixed(2)}MB (${Math.round((saved / row.before) * 100)}%)`
          : '0 (already optimal)'),
    )
  }

  const beforeTotal = rows.reduce((sum, row) => sum + row.before, 0)
  const afterTotal = rows.reduce((sum, row) => sum + row.after, 0)
  console.log('-'.repeat(95))
  console.log(
    `${rows.length} images: ${mb(beforeTotal).toFixed(1)}MB -> ${mb(afterTotal).toFixed(1)}MB` +
      ` (saves ${mb(beforeTotal - afterTotal).toFixed(1)}MB, ${Math.round(((beforeTotal - afterTotal) / beforeTotal) * 100)}%)`,
  )

  const skipped = rows.filter((row) => !row.resized)
  if (skipped.length) {
    console.log(
      `\nNote: ${skipped.length} image(s) already within ${MAX}px and were only re-encoded: ` +
        skipped.map((row) => path.relative(target, row.file)).join(', '),
    )
  }
  const pngs = rows.filter((row) => row.format === 'png')
  if (pngs.length) {
    console.log(
      `\nPNGs: ${pngs.length} encoded ${
        palette
          ? 'with palette quantisation (LOSSY, <=256 colours)'
          : 'losslessly (palette disabled)'
      }.`,
    )
    if (!palette) {
      console.log(
        'Note: lossless PNG re-encoding often saves little or nothing. Convert photographic PNGs to WebP/JPEG for real gains.',
      )
    }
  }

  if (!write) {
    console.log('\nDRY RUN — nothing written. Re-run with --write to apply.')
    return
  }

  const toWrite = rows.filter((row) => row.after < row.before)
  for (const row of toWrite) {
    fs.writeFileSync(row.file, row.buffer)
  }
  console.log(
    `\nWROTE ${toWrite.length} file(s); left ${rows.length - toWrite.length} unchanged (already smaller).`,
  )
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
