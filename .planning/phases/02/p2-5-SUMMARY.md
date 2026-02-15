---
phase: 2
plan: 5
subsystem: content-infrastructure
tags: [images, migration, deduplication, wordpress]
dependency-graph:
  requires: [p1-6]
  provides: [organized-images, hero-gallery-naming]
  affects: [p2-6, p2-7, p2-8]
tech-stack:
  added: [sharp-metadata-reading]
  patterns: [hero-gallery-naming, wp-dedup, copy-not-move]
key-files:
  created:
    - scripts/migrate-images.ts
    - public/images/case-studies/ (11 subdirectories, 68 files)
    - public/images/insights/ (8 subdirectories, 8 files)
    - public/images/services/ (1 file)
    - public/images/shared/ (12 files including logos/ and team/)
  modified: []
decisions:
  - Construction-pm kept as shared generic project photos (18 images) rather than discarded
  - Crosslife Church mapped from numbered files 11-17.jpg per PLAN.md guidance
  - Logo filenames cleaned of WordPress hash prefixes for readability
  - Largest file by size used as hero; remaining sorted by size as gallery-NN
  - AboutUpscale kept the 768x1192 variant (larger) over 660x1024
metrics:
  duration: 3m
  completed: 2026-02-14
  tasks: 3
  files-created: 90
  files-modified: 1
---

# Phase 2 Plan 5: Image Migration & Organization Summary

WordPress image deduplication from 118 crawled files to 89 unique originals, organized into public/images/ with hero/gallery naming convention per case study and insight.

## What Was Done

### Task 1: Create Migration Script (`scripts/migrate-images.ts`)

Created a TypeScript migration script using `sharp` for metadata inspection. The script:

1. **Reads** all 118 images from `content/migration/images/`
2. **Deduplicates** by stripping WordPress dimension suffixes (`-1024x576`, `-768x432`, `-1536x1043-1`) and edit suffixes (`-e1751696465945`), then grouping by base name. For each group, keeps the highest-resolution original (preferring JPG/PNG over WebP when both exist).
3. **Maps** images to project directories using filename prefix rules from PLAN.md
4. **Copies** (not moves) to organized `public/images/` structure
5. **Names** files: `hero.{ext}` for the largest image per directory, `gallery-NN.{ext}` for the rest
6. **Verifies** no zero-byte files and confirms source preservation

### Task 2: Run Migration

Executed `npx tsx scripts/migrate-images.ts`. Results:

| Metric | Value |
|--------|-------|
| Source files | 118 |
| Duplicates removed | 29 |
| Unique images | 89 |
| Files copied | 89 |
| Unmapped files | 0 |

### Task 3: Verification

- All 89 output files verified non-zero
- Spot-checked dimensions confirm highest-resolution originals kept
- Source directory preserved with all 118 original files
- No WordPress thumbnail variants in output (`-NNNxNNN` pattern absent)

## Output Directory Structure

```
public/images/
  case-studies/
    231-elizabeth-street/     7 files  (hero + 6 gallery)
    calibre-cooper/           6 files  (hero + 5 gallery)
    construction-pm/         18 files  (hero + 17 gallery)
    crosslife-church/         6 files  (hero + 5 gallery)
    glass-house-macquarie-park/ 6 files (hero + 5 gallery)
    granville-diggers/        2 files  (hero + 1 gallery)
    health-infrastructure/    3 files  (hero + 2 gallery)
    newcastle-fit-out/        3 files  (hero + 2 gallery)
    pete-island/              3 files  (hero + 2 gallery)
    sydney-water/             5 files  (hero + 4 gallery)
    vibe-hotel/               9 files  (hero + 8 gallery)
  insights/
    beyond-balance/           1 file   (hero)
    beyond-projects/          1 file   (hero)
    boutique-residential/     1 file   (hero)
    client-side-pm/           1 file   (hero)
    granville-diggers-commencement/ 1 file (hero)
    ground-anchors/           1 file   (hero)
    mba-bc3-contract/         1 file   (hero)
    passion-for-delivering/   1 file   (hero)
  services/
    commercial-government.webp
  shared/
    about-upscale.png
    favicon-original.webp
    image-14.png
    residential-construction.jpg
    upscale-logo.jpg
    logos/
      blacktown-city-council.webp
      health-infrastructure.webp
      nsw-ambulance.webp
      school-infrastructure.webp
      sydney-water.webp
    team/
      kenny-gunawan.jpg
      nathan-maccullum.jpg
```

## Deduplication Examples

| Original (kept) | Duplicates removed |
|------------------|--------------------|
| `balance-vs-purpose.jpg` (326KB) | `balance-vs-purpose-1024x576.webp`, `balance-vs-purpose-768x432.webp` |
| `Vibe-Encumbrance-11.jpg` (339KB) | `Vibe-Encumbrance-11-1024x683.jpg` (147KB) |
| `12.jpg` (308KB, 1920x1080) | `12-1024x576.webp` (69KB), `12-768x432.webp` (49KB) |
| `Health-Project-Management-03.jpg` (392KB) | `Health-Project-Management-03-1024x683.jpg` (149KB) |
| `AboutUpscale-768x1192.png` (560KB) | `AboutUpscale-660x1024.png` (436KB) |

## Deviations from Plan

### Minor Adjustments

**1. [Rule 2 - Enhancement] Image count is 89 vs plan estimate of 60-70**
- **Reason:** The `construction-pm/` folder has 18 generic project shots. These are all unique originals (not duplicates). The plan's estimate of 60-70 was approximate.
- **Impact:** None -- all images are valid and needed for content migration in P2-6.

**2. [Rule 1 - Naming] Logo filenames cleaned of WordPress hash prefixes**
- **Found during:** Task 2 initial run
- **Issue:** Logos had ugly hash prefixes like `64f6f8fe37dca985ad02285b_sydney-water-logo.webp`
- **Fix:** Cleaned to readable names like `sydney-water.webp`
- **Files modified:** 5 logo files in `shared/logos/`

## Commits

| Commit | Message |
|--------|---------|
| `013f119` | `feat(p2-5): create image migration and deduplication script` |
| `64c8429` | `feat(p2-5): run image migration - deduplicate and organize 118 WordPress images` |

## Self-Check: PASSED

- All key files and directories exist
- Both commits verified in git history
- Source backup intact (118 files)
- All 11 case study subdirectories present
- All 8 insight subdirectories present
- Shared assets (logos, team, branding) present
