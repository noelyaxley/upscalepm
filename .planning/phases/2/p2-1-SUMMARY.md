---
phase: 2
plan: 1
subsystem: content-infrastructure
tags: [mdx, content-pipeline, remark, rehype, next-image]
dependency-graph:
  requires: [phase-1-foundation]
  provides: [mdx-pipeline, content-types, content-utilities, mdx-components]
  affects: [case-study-routes, insight-routes, mdx-rendering]
tech-stack:
  added: [remark-frontmatter@5.0.0, remark-mdx-frontmatter@5.2.0, rehype-slug@6.0.0, reading-time@1.5.0]
  patterns: [string-based-turbopack-plugins, gray-matter-frontmatter-parsing, generic-content-item-type]
key-files:
  created:
    - src/lib/content.types.ts
    - src/lib/content.ts
    - content/case-studies/example.mdx
  modified:
    - next.config.mjs
    - mdx-components.tsx
    - tsconfig.json
    - package.json
    - package-lock.json
decisions:
  - "String-based plugin references for Turbopack compatibility instead of function imports"
metrics:
  duration: 3m
  completed: 2026-02-14T07:39:32Z
  tasks: 7
  files: 8
---

# Phase 2 Plan 1: MDX Pipeline Setup Summary

MDX content pipeline with remark-frontmatter, remark-mdx-frontmatter, rehype-slug, and reading-time; content utility library with typed frontmatter parsing; next/image and next/link overrides in mdx-components.tsx.

## Tasks Completed

| Task | Description | Commit | Key Files |
|------|-------------|--------|-----------|
| 1 | Install MDX pipeline dependencies | `9568afc` | package.json, package-lock.json |
| 2 | Configure remark/rehype plugins in next.config.mjs | `bf5d65a` | next.config.mjs |
| 3 | Add @content path alias and MDX includes to tsconfig | `2a9a129` | tsconfig.json |
| 4 | Create content frontmatter type definitions | `0903e4a` | src/lib/content.types.ts |
| 5 | Create content utility library | `0d689c0` | src/lib/content.ts |
| 6 | Add next/image and next/link overrides to MDX components | `8c4f5da` | mdx-components.tsx |
| 7 | Create test MDX file and verify pipeline | `3c4de00` | content/case-studies/example.mdx, next.config.mjs |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Turbopack plugin serialization error**
- **Found during:** Task 7 (build verification)
- **Issue:** Next.js 16.1.6 uses Turbopack by default, which requires loader options to be serializable. Importing remark/rehype plugins as functions and passing them to createMDX() caused `"does not have serializable options"` error at build time.
- **Fix:** Changed from function imports (`import remarkFrontmatter from 'remark-frontmatter'`) to string-based plugin references (`'remark-frontmatter'`). The @next/mdx loader's `importPluginForPath` function resolves string references at runtime.
- **Files modified:** next.config.mjs
- **Commit:** `3c4de00`

## Verification Results

- `npm run dev` starts without errors
- `npm run build` completes without TypeScript errors (10 static pages generated)
- `getAllCaseStudies()` returns empty array (example.mdx is draft:true)
- `getCaseStudyBySlug('example')` returns item with correct frontmatter types and reading time
- Content utility functions correctly parse YAML frontmatter via gray-matter
- reading-time correctly calculates article reading time (1 min for test content)

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| String-based plugin references for Turbopack | Next.js 16 defaults to Turbopack which cannot serialize function references in webpack loader options; @next/mdx's loader already supports string resolution via `importPluginForPath` |

## Architecture Notes

- **Content types** use TypeScript generics (`ContentItem<T>`) for type-safe frontmatter across case studies and insights
- **Content utilities** are server-only (fs operations) -- they read from `content/` directory at build time
- **MDX component overrides** handle img->next/image (with responsive sizing) and a->next/link (for internal links) globally
- **@content/* path alias** enables clean imports from MDX content directory in dynamic routes
- **Test file** (`content/case-studies/example.mdx`) left as draft:true for pipeline verification; will be removed in Prompt 2

## Self-Check: PASSED

All 7 created/modified files verified present on disk. All 7 commit hashes verified in git log.
