/**
 * Image Migration & Organization Script
 *
 * Reads all images from content/migration/images/, deduplicates WordPress
 * resolution variants, and copies originals to organized public/images/ structure.
 *
 * Rules:
 * - Keep only the highest-resolution original (no -1024x576, -768x432 suffixes)
 * - Copy files (don't move) -- keep originals as backup
 * - Do NOT convert to WebP -- next/image handles format negotiation
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const PROJECT_ROOT = process.cwd()
const SOURCE_DIR = path.join(PROJECT_ROOT, 'content/migration/images')
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/images')

// --------------------------------------------------------------------------
// Image-to-project mapping (from PLAN.md)
// --------------------------------------------------------------------------

interface MappingRule {
  patterns: RegExp[]
  dest: string
  rename?: Record<string, string> // originalFilename -> newFilename
}

const MAPPING_RULES: MappingRule[] = [
  // Case Studies
  {
    patterns: [/^GP_DIGEERS_/i, /^Granville-Diggers-Club-Development/i],
    dest: 'case-studies/granville-diggers',
  },
  {
    patterns: [/^Calibre-/i],
    dest: 'case-studies/calibre-cooper',
  },
  {
    patterns: [/^Vibe-/i],
    dest: 'case-studies/vibe-hotel',
  },
  {
    patterns: [/^sydney-water-filtration-/i],
    dest: 'case-studies/sydney-water',
  },
  {
    patterns: [/^Health-Project-Management-/i],
    dest: 'case-studies/health-infrastructure',
  },
  {
    patterns: [/^231-[Ee]lizabeth-/i, /^06_231_Elizabeth_/i],
    dest: 'case-studies/231-elizabeth-street',
  },
  {
    patterns: [/^Mac-Park-/i],
    dest: 'case-studies/glass-house-macquarie-park',
  },
  {
    patterns: [/^Project-Management-Delivery-Newcastle-/i],
    dest: 'case-studies/newcastle-fit-out',
  },
  {
    patterns: [/^Strategic-Rezoning-Planning-Proposal-Pete-Island-/i],
    dest: 'case-studies/pete-island',
  },
  {
    patterns: [/^Construction-Project-Management-/i],
    dest: 'case-studies/construction-pm',
  },

  // Insights
  {
    patterns: [/^balance-vs-purpose/i],
    dest: 'insights/beyond-balance',
  },
  {
    patterns: [/^Boutique-Residential-Development-/i],
    dest: 'insights/boutique-residential',
  },
  {
    patterns: [/^Passion-for-Delivering-Projects/i],
    dest: 'insights/passion-for-delivering',
  },
  {
    patterns: [/^Ground-anchors-/i],
    dest: 'insights/ground-anchors',
  },
  {
    patterns: [/^inside-mba-bc3-contract/i],
    dest: 'insights/mba-bc3-contract',
  },
  {
    patterns: [/^client-side-project-management/i],
    dest: 'insights/client-side-pm',
  },
  {
    patterns: [/^Property-Built-environment/i],
    dest: 'insights/beyond-projects',
  },
  {
    patterns: [/^Granville-Diggers-Commencement/i],
    dest: 'insights/granville-diggers-commencement',
  },

  // Shared - Team
  {
    patterns: [/^NathanMacCullum/i],
    dest: 'shared/team',
  },
  {
    patterns: [/^kenny-gunawan/i],
    dest: 'shared/team',
  },

  // Shared - General
  {
    patterns: [/^AboutUpscale/i],
    dest: 'shared',
  },
  {
    patterns: [/^Upscale-Project-Management-Logo/i],
    dest: 'shared',
  },
  {
    patterns: [/^cropped-Gemini_Generated_Image/i],
    dest: 'shared',
  },
  {
    patterns: [/^Resi-Const-/i],
    dest: 'shared',
  },

  // Services
  {
    patterns: [/^02-Commercial-Work-for-Government-Agencies/i],
    dest: 'services',
  },

  // Logos
  {
    patterns: [/^64f6f8fe37dca985ad02285b_sydney-water-logo/i],
    dest: 'shared/logos',
  },
  {
    patterns: [/^64fa3bf4cff2ce1546242c71_Health-Infrastructure/i],
    dest: 'shared/logos',
  },
  {
    patterns: [/^64fa3d35deed167eba9e32df_Blacktown-city-council/i],
    dest: 'shared/logos',
  },
  {
    patterns: [/^64fbbb01c0f28079cb9b2eeb_School_Infrastructure_logo/i],
    dest: 'shared/logos',
  },
  {
    patterns: [/^64fbbb2319ae7b46214f2a45_NSW-Ambulance_logo/i],
    dest: 'shared/logos',
  },

  // Unknown numbered files -> Crosslife Church
  {
    patterns: [/^1[1-7]\.(jpg|webp|png)$/i, /^1[1-7]-\d+x\d+\.(jpg|webp|png)$/i],
    dest: 'case-studies/crosslife-church',
  },

  // image-14.png -> shared
  {
    patterns: [/^image-14\.png$/i],
    dest: 'shared',
  },
]

// --------------------------------------------------------------------------
// WordPress dimension suffix pattern
// --------------------------------------------------------------------------

/**
 * Matches WordPress-generated dimension suffixes like:
 * -1024x576, -768x432, -1536x1043-1, -300x102, -150x150, -660x1024
 * Also matches WordPress edit suffixes like -e1751696465945
 * Combined pattern: optional edit suffix, optional dimension suffix, optional trailing -1
 */
const WP_DIMENSION_REGEX = /(-e\d+)?(-\d+x\d+)?(-\d)?(?=\.\w+$)/

/**
 * Strip WordPress dimension and edit suffixes from a filename to get the base name.
 * Examples:
 *   "Vibe-Encumbrance-11-1024x683.jpg" -> "Vibe-Encumbrance-11.jpg"
 *   "AboutUpscale-768x1192.png" -> "AboutUpscale.png"
 *   "231-elizabeth-street-sydney-fitout-nsw-sydney-shape-australia_1-1-1024x683.jpg"
 *     -> "231-elizabeth-street-sydney-fitout-nsw-sydney-shape-australia_1-1.jpg"
 *   "Construction-Project-Management-03-e1752380840864-1024x682.jpg"
 *     -> "Construction-Project-Management-03.jpg"
 */
function getBaseName(filename: string): string {
  const ext = path.extname(filename)
  const name = filename.slice(0, -ext.length)

  // Strip WordPress edit suffixes (-e followed by digits)
  let cleaned = name.replace(/-e\d+/g, '')

  // Strip dimension suffixes (-NNNxNNN) but be careful not to strip
  // parts of the actual filename like -01, -02, -03
  // WordPress dimensions are typically larger numbers like 1024x576
  cleaned = cleaned.replace(/-\d{2,4}x\d{2,4}(?:-\d)?$/, '')

  // Also handle the -1536x1043-1 pattern (already covered by above)

  return cleaned + ext
}

/**
 * Check if a filename has WordPress dimension suffixes (i.e., it's a thumbnail variant).
 */
function hasDimensionSuffix(filename: string): boolean {
  const base = getBaseName(filename)
  return base !== filename
}

// --------------------------------------------------------------------------
// Deduplication logic
// --------------------------------------------------------------------------

interface ImageInfo {
  filename: string
  baseName: string
  ext: string
  fileSize: number
  fullPath: string
  isDuplicate: boolean
}

/**
 * Group images by their base name (stripping WP suffixes and normalizing extensions).
 * For each group, keep only the largest file (highest resolution original).
 */
function deduplicateImages(files: string[]): ImageInfo[] {
  const imageInfos: ImageInfo[] = files.map((filename) => {
    const fullPath = path.join(SOURCE_DIR, filename)
    const stats = fs.statSync(fullPath)
    const baseName = getBaseName(filename)
    const ext = path.extname(filename).toLowerCase()

    return {
      filename,
      baseName,
      ext,
      fileSize: stats.size,
      fullPath,
      isDuplicate: false,
    }
  })

  // Group by normalized base name (case-insensitive, extension-independent for same-name variants)
  const groups = new Map<string, ImageInfo[]>()

  for (const info of imageInfos) {
    // Normalize: lowercase base name without extension for grouping
    const nameWithoutExt = info.baseName.slice(0, -path.extname(info.baseName).length).toLowerCase()
    const key = nameWithoutExt

    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(info)
  }

  const results: ImageInfo[] = []

  for (const [_key, group] of groups) {
    if (group.length === 1) {
      results.push(group[0])
      continue
    }

    // Among variants, prefer:
    // 1. Files without dimension suffixes (originals)
    // 2. JPG/PNG over WebP (originals are usually JPG)
    // 3. Largest file size

    // Separate originals from thumbnails
    const originals = group.filter((g) => !hasDimensionSuffix(g.filename))
    const thumbnails = group.filter((g) => hasDimensionSuffix(g.filename))

    if (originals.length > 0) {
      // Among originals, prefer JPG/PNG over WebP, then largest file
      const sorted = originals.sort((a, b) => {
        // Prefer JPG/PNG over WebP
        const aIsOrigFormat = ['.jpg', '.jpeg', '.png'].includes(a.ext) ? 1 : 0
        const bIsOrigFormat = ['.jpg', '.jpeg', '.png'].includes(b.ext) ? 1 : 0
        if (aIsOrigFormat !== bIsOrigFormat) return bIsOrigFormat - aIsOrigFormat
        // Then largest file size
        return b.fileSize - a.fileSize
      })
      results.push(sorted[0])
      // Mark rest as duplicates
      for (let i = 1; i < sorted.length; i++) {
        sorted[i].isDuplicate = true
        results.push(sorted[i])
      }
      for (const t of thumbnails) {
        t.isDuplicate = true
        results.push(t)
      }
    } else {
      // All are thumbnails -- keep the one with largest dimensions (largest file)
      // Prefer JPG/PNG over WebP
      const sorted = thumbnails.sort((a, b) => {
        const aIsOrigFormat = ['.jpg', '.jpeg', '.png'].includes(a.ext) ? 1 : 0
        const bIsOrigFormat = ['.jpg', '.jpeg', '.png'].includes(b.ext) ? 1 : 0
        if (aIsOrigFormat !== bIsOrigFormat) return bIsOrigFormat - aIsOrigFormat
        return b.fileSize - a.fileSize
      })
      results.push(sorted[0])
      for (let i = 1; i < sorted.length; i++) {
        sorted[i].isDuplicate = true
        results.push(sorted[i])
      }
    }
  }

  return results
}

// --------------------------------------------------------------------------
// Mapping logic
// --------------------------------------------------------------------------

function findDestination(filename: string): string | null {
  for (const rule of MAPPING_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(filename)) {
        return rule.dest
      }
    }
  }
  return null
}

// --------------------------------------------------------------------------
// Renaming logic for organized output
// --------------------------------------------------------------------------

/**
 * Track files per destination directory for sequential naming.
 */
const destFileCounters = new Map<string, number>()

function getOutputFilename(originalFilename: string, dest: string): string {
  const ext = path.extname(originalFilename).toLowerCase()

  // Special naming for known single-purpose files
  if (dest.startsWith('shared/logos/')) {
    // Clean up logo filenames
    if (originalFilename.includes('sydney-water-logo')) return `sydney-water-logo${ext}`
    if (originalFilename.includes('Health-Infrastructure')) return `health-infrastructure${ext}`
    if (originalFilename.includes('Blacktown-city-council')) return `blacktown-city-council${ext}`
    if (originalFilename.includes('School_Infrastructure_logo')) return `school-infrastructure${ext}`
    if (originalFilename.includes('NSW-Ambulance_logo')) return `nsw-ambulance${ext}`
  }

  if (dest === 'shared/team') {
    if (originalFilename.toLowerCase().includes('nathanmaccullum')) return `nathan-maccullum${ext}`
    if (originalFilename.toLowerCase().includes('kenny-gunawan')) return `kenny-gunawan${ext}`
  }

  if (dest === 'shared') {
    if (originalFilename.startsWith('AboutUpscale')) return `about-upscale${ext}`
    if (originalFilename.startsWith('Upscale-Project-Management-Logo')) return `upscale-logo${ext}`
    if (originalFilename.startsWith('cropped-Gemini')) return `favicon-original${ext}`
    if (originalFilename.startsWith('Resi-Const-')) return `residential-construction${ext}`
    if (originalFilename.startsWith('image-14')) return `image-14${ext}`
  }

  if (dest === 'services') {
    if (originalFilename.includes('Commercial-Work-for-Government')) return `commercial-government${ext}`
  }

  // For case studies and insights, use descriptive names
  return cleanFilename(originalFilename)
}

function cleanFilename(filename: string): string {
  const ext = path.extname(filename)
  let name = filename.slice(0, -ext.length)

  // Remove WordPress edit suffixes
  name = name.replace(/-e\d+/g, '')
  // Remove dimension suffixes
  name = name.replace(/-\d{2,4}x\d{2,4}(?:-\d)?$/, '')

  // Normalize: lowercase, replace spaces and underscores with hyphens
  name = name.toLowerCase().replace(/[_\s]+/g, '-')

  // Remove double hyphens
  name = name.replace(/-+/g, '-')

  // Remove leading/trailing hyphens
  name = name.replace(/^-|-$/g, '')

  return name + ext.toLowerCase()
}

// --------------------------------------------------------------------------
// Main execution
// --------------------------------------------------------------------------

async function main() {
  console.log('=== Image Migration & Organization ===\n')

  // 1. Read source files
  const allFiles = fs.readdirSync(SOURCE_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
  })
  console.log(`Source images: ${allFiles.length}`)

  // 2. Deduplicate
  const imageInfos = deduplicateImages(allFiles)
  const uniqueImages = imageInfos.filter((i) => !i.isDuplicate)
  const duplicates = imageInfos.filter((i) => i.isDuplicate)

  console.log(`Unique images (after dedup): ${uniqueImages.length}`)
  console.log(`Duplicates removed: ${duplicates.length}\n`)

  if (duplicates.length > 0) {
    console.log('Duplicates removed:')
    for (const dup of duplicates) {
      const kept = uniqueImages.find(
        (u) => getBaseName(u.filename).slice(0, -path.extname(getBaseName(u.filename)).length).toLowerCase() ===
               getBaseName(dup.filename).slice(0, -path.extname(getBaseName(dup.filename)).length).toLowerCase()
      )
      console.log(`  SKIP: ${dup.filename} (${(dup.fileSize / 1024).toFixed(0)}KB) -- kept: ${kept?.filename}`)
    }
    console.log()
  }

  // 3. Map and copy
  let copiedCount = 0
  let unmappedCount = 0
  const unmapped: string[] = []

  // Track files per destination for hero/gallery naming
  const destFiles = new Map<string, Array<{ original: string; size: number }>>()

  for (const img of uniqueImages) {
    const dest = findDestination(img.filename)
    if (!dest) {
      unmapped.push(img.filename)
      unmappedCount++
      continue
    }

    if (!destFiles.has(dest)) {
      destFiles.set(dest, [])
    }
    destFiles.get(dest)!.push({ original: img.filename, size: img.fileSize })
  }

  // Process each destination
  for (const [dest, files] of destFiles) {
    const outDir = path.join(OUTPUT_DIR, dest)
    fs.mkdirSync(outDir, { recursive: true })

    // Sort by file size descending -- largest is likely the hero
    const sorted = [...files].sort((a, b) => b.size - a.size)

    for (let i = 0; i < sorted.length; i++) {
      const { original } = sorted[i]
      const ext = path.extname(original).toLowerCase()

      let outputName: string

      // For case study and insight directories with multiple files,
      // name the first (largest) as hero, rest as gallery-NN
      if ((dest.startsWith('case-studies/') || dest.startsWith('insights/')) && sorted.length > 1) {
        if (i === 0) {
          outputName = `hero${ext}`
        } else {
          outputName = `gallery-${String(i).padStart(2, '0')}${ext}`
        }
      } else if ((dest.startsWith('case-studies/') || dest.startsWith('insights/')) && sorted.length === 1) {
        outputName = `hero${ext}`
      } else {
        outputName = getOutputFilename(original, dest)
      }

      const srcPath = path.join(SOURCE_DIR, original)
      const destPath = path.join(outDir, outputName)

      fs.copyFileSync(srcPath, destPath)
      copiedCount++

      // Get dimensions for logging
      try {
        const metadata = await sharp(destPath).metadata()
        console.log(
          `  COPY: ${original} -> ${dest}/${outputName} (${metadata.width}x${metadata.height}, ${(sorted[i].size / 1024).toFixed(0)}KB)`
        )
      } catch {
        console.log(
          `  COPY: ${original} -> ${dest}/${outputName} (${(sorted[i].size / 1024).toFixed(0)}KB)`
        )
      }
    }
  }

  // 4. Summary
  console.log('\n=== Migration Summary ===')
  console.log(`Source files:     ${allFiles.length}`)
  console.log(`Duplicates:       ${duplicates.length}`)
  console.log(`Unique images:    ${uniqueImages.length}`)
  console.log(`Copied:           ${copiedCount}`)
  console.log(`Unmapped:         ${unmappedCount}`)

  if (unmapped.length > 0) {
    console.log('\nUnmapped files (no mapping rule):')
    for (const f of unmapped) {
      console.log(`  ${f}`)
    }
  }

  // 5. Verify no zero-byte files
  console.log('\n=== Verification ===')
  let issues = 0
  const walkDir = (dir: string) => {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath)
      } else {
        const stats = fs.statSync(fullPath)
        if (stats.size === 0) {
          console.log(`  ZERO-BYTE: ${fullPath}`)
          issues++
        }
      }
    }
  }
  walkDir(OUTPUT_DIR)

  if (issues === 0) {
    console.log('All output files verified (no zero-byte files).')
  }

  // 6. Directory summary
  console.log('\n=== Output Directory Structure ===')
  const printTree = (dir: string, prefix = '') => {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name)
        const fileCount = countFiles(subDir)
        console.log(`${prefix}${entry.name}/ (${fileCount} files)`)
        printTree(subDir, prefix + '  ')
      } else {
        console.log(`${prefix}${entry.name}`)
      }
    }
  }

  const countFiles = (dir: string): number => {
    let count = 0
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        count += countFiles(path.join(dir, entry.name))
      } else {
        count++
      }
    }
    return count
  }

  printTree(OUTPUT_DIR)

  console.log(`\nTotal output files: ${countFiles(OUTPUT_DIR)}`)

  // 7. Verify originals still exist
  console.log('\n=== Source Backup Verification ===')
  const sourceFilesAfter = fs.readdirSync(SOURCE_DIR).length
  console.log(`Source files before: ${allFiles.length}`)
  console.log(`Source files after:  ${sourceFilesAfter}`)
  console.log(sourceFilesAfter >= allFiles.length ? 'OK: Originals preserved.' : 'WARNING: Some source files missing!')
}

main().catch(console.error)
