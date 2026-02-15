---
phase: 2
plan: 6
subsystem: content-migration
tags: [case-studies, mdx, wordpress, migration, content]
dependency-graph:
  requires: [p2-1, p2-2, p2-4, p2-5]
  provides: [case-study-content, 14-case-studies]
  affects: [p2-7, p3-pages]
tech-stack:
  added: []
  patterns: [mdx-frontmatter, project-stats-component, image-gallery-component, callout-component, internal-linking]
key-files:
  created:
    - content/case-studies/granville-diggers-club-development.mdx
    - content/case-studies/granville-diggers-club-development-origin.mdx
    - content/case-studies/structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions.mdx
    - content/case-studies/crosslife-church-asquith-development.mdx
    - content/case-studies/calibre-cooper-street-residential-apartments-surry-hills.mdx
    - content/case-studies/navigating-encumbrance-vibe-hotel-darling-harbour.mdx
    - content/case-studies/major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities.mdx
    - content/case-studies/health-project-management-in-regional-emergency-infrastructure.mdx
    - content/case-studies/delivering-modern-government-workspaces-at-231-elizabeth-street.mdx
    - content/case-studies/expanding-government-tenancy-at-glass-house-macquarie-park.mdx
    - content/case-studies/project-management-delivery-in-the-final-stretch-newcastle-office-fit-out.mdx
    - content/case-studies/strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney.mdx
    - content/case-studies/private-architectural-practice-combining-design-vision-and-construction-project-management.mdx
    - content/case-studies/delivering-complexity-with-clarity.mdx
  modified: []
  deleted:
    - content/case-studies/_placeholder.mdx
decisions:
  - Content derived from crawl-data.json metadata and bodyTextPreview fields (manual reconstruction approach per PLAN.md)
  - Granville Diggers trilogy ordered 1-3 as flagship project
  - Categories assigned based on project type matching CaseStudyFrontmatter union type
  - construction-pm images reused for private-architectural and delivering-complexity case studies (no dedicated images available)
  - Peat Island spelling retained in body text (correct name) while slug uses pete-island per redirect map
  - Internal links use new /case-studies/ URL structure throughout
metrics:
  duration: 8m
  completed: 2026-02-14
  tasks: 1
  files-created: 14
  files-deleted: 1
---

# Phase 2 Plan 6: Case Study Content Migration Summary

14 case study MDX files migrated from WordPress crawl data, with CaseStudyFrontmatter, ProjectStats, ImageGallery, and Callout components, heroImage paths to existing images, and internal cross-linking.

## What Was Done

### Task 1: Create 14 Case Study MDX Files

Created all 14 case study MDX files in `content/case-studies/` with:

1. **YAML frontmatter** following the `CaseStudyFrontmatter` schema: title, excerpt, category, projectType, location, client (where applicable), architect (where applicable), heroImage, images array, services array, order (1-14), draft: false
2. **Body content** converted from WordPress crawl data (titles, meta descriptions, body text previews) into clean Markdown with headings, paragraphs, lists, and emphasis
3. **MDX components** used throughout:
   - `<ProjectStats>` near the top of each case study with key project metadata
   - `<ImageGallery>` for multi-image sections using images from `public/images/case-studies/`
   - `<Callout>` for important insights and highlights
4. **Internal links** all using new URL structure (`/case-studies/{slug}`)
5. **Removed `_placeholder.mdx`** which was only needed for Turbopack dynamic import resolution when no real content existed

### Case Study Inventory

| # | Slug | Category | Location |
|---|------|----------|----------|
| 1 | granville-diggers-club-development | development | Granville, Sydney NSW |
| 2 | granville-diggers-club-development-origin | development | Granville, Sydney NSW |
| 3 | structured-for-success-...as4902-and-separable-portions | development | Granville, Sydney NSW |
| 4 | crosslife-church-asquith-development | development | Asquith, Sydney NSW |
| 5 | calibre-cooper-street-residential-apartments-surry-hills | residential | Surry Hills, Sydney NSW |
| 6 | navigating-encumbrance-vibe-hotel-darling-harbour | hotel | Darling Harbour, Sydney NSW |
| 7 | major-laboratory-relocation-...sydney-waters-filtration | infrastructure | Sydney, NSW |
| 8 | health-project-management-in-regional-emergency-infrastructure | infrastructure | Regional NSW |
| 9 | delivering-modern-government-workspaces-at-231-elizabeth-street | fitout | Sydney CBD, NSW |
| 10 | expanding-government-tenancy-at-glass-house-macquarie-park | fitout | Macquarie Park, Sydney NSW |
| 11 | project-management-delivery-...-newcastle-office-fit-out | fitout | Newcastle, NSW |
| 12 | strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney | planning-proposal | Central Coast NSW |
| 13 | private-architectural-practice-...-project-management | residential | Sydney, NSW |
| 14 | delivering-complexity-with-clarity | commercial | Sydney, NSW |

### Build Verification

`npm run build` completed successfully with all 14 case study pages generated as static HTML via `generateStaticParams`. The `/case-studies` listing page shows all 14 case studies. Each is accessible at `/case-studies/{slug}`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Placeholder removal for real content**
- **Found during:** File creation
- **Issue:** `_placeholder.mdx` existed for Turbopack resolution but would appear as a draft entry
- **Fix:** Deleted the file since 14 real MDX files now provide the dynamic import resolution pattern
- **Files modified:** content/case-studies/_placeholder.mdx (deleted)
- **Commit:** fb89488

**2. [Rule 2 - Missing] construction-pm images reused for non-dedicated case studies**
- **Found during:** Image path assignment
- **Issue:** `private-architectural-practice` and `delivering-complexity-with-clarity` have no dedicated image directories; they use generic project photos from construction-pm
- **Fix:** Pointed heroImage and gallery images to existing `/images/case-studies/construction-pm/` paths which contain 17+ generic construction/architecture photos
- **Impact:** Images display correctly but are not project-specific. Can be updated when dedicated photos are provided.

## Commits

| Commit | Message |
|--------|---------|
| `fb89488` | feat(p2-6): migrate 14 case study MDX files from WordPress content |

## Self-Check: PASSED

All 14 MDX files verified to exist in content/case-studies/. Commit fb89488 exists in git log. Build passes with all 14 static pages generated.
