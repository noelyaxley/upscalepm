#!/usr/bin/env node

/**
 * WordPress Site Crawler for upscalepm.com.au
 *
 * Crawls the existing WordPress site via sitemap,
 * extracts page metadata, downloads images, and
 * generates structured migration data.
 *
 * Usage: node scripts/crawl-wordpress.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, basename } from 'path'
import { execSync } from 'child_process'

const SITE_URL = 'https://upscalepm.com.au'
const OUTPUT_DIR = join(process.cwd(), 'content', 'migration')
const IMAGE_DIR = join(OUTPUT_DIR, 'images')

// All URLs from sitemap index (collected from post-sitemap.xml, page-sitemap.xml, category-sitemap.xml)
// Excludes elementor-hf template pages (not real content pages)
const SITEMAP_URLS = [
  // Posts (from post-sitemap.xml)
  'https://upscalepm.com.au/city-of-sydney-da-explained-challenges-delays-and-solutions/',
  'https://upscalepm.com.au/granville-diggers-club-development-origin/',
  'https://upscalepm.com.au/passion-for-delivering-projects/',
  'https://upscalepm.com.au/boutique-residential-development-lessons-from-the-rushcutters-sydney/',
  'https://upscalepm.com.au/structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions/',
  'https://upscalepm.com.au/beyond-projects-building-for-health-community-and-change/',
  'https://upscalepm.com.au/beyond-balance-finding-meaning-in-the-demands-of-project-delivery/',
  'https://upscalepm.com.au/delivering-complexity-with-clarity/',
  'https://upscalepm.com.au/tender-evaluation-how-we-choose-the-right-contractor/',
  'https://upscalepm.com.au/commercial-tenant-fit-out-who-pays-for-upgrades-and-compliance/',
  'https://upscalepm.com.au/construction-contracts-for-your-refurbishment-project/',
  'https://upscalepm.com.au/construction-variations-and-design-freeze/',
  'https://upscalepm.com.au/insights-into-floor-space-ratio/',
  'https://upscalepm.com.au/from-architect-to-project-manager-first-project/',
  'https://upscalepm.com.au/inside-the-mba-bc3-contract/',
  'https://upscalepm.com.au/ground-anchors-and-license-access-deeds/',
  'https://upscalepm.com.au/client-side-project-management-sydney/',
  'https://upscalepm.com.au/project-management-delivery-in-the-final-stretch-newcastle-office-fit-out/',
  'https://upscalepm.com.au/strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney/',
  'https://upscalepm.com.au/private-architectural-practice-combining-design-vision-and-construction-project-management/',
  'https://upscalepm.com.au/major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities/',
  'https://upscalepm.com.au/navigating-encumbrance-vibe-hotel-darling-harbour/',
  'https://upscalepm.com.au/health-project-management-in-regional-emergency-infrastructure/',
  'https://upscalepm.com.au/calibre-cooper-street-residential-apartments-surry-hills/',
  'https://upscalepm.com.au/delivering-modern-government-workspaces-at-231-elizabeth-street/',
  'https://upscalepm.com.au/expanding-government-tenancy-at-glass-house-macquarie-park/',
  'https://upscalepm.com.au/privacy-policy/',
  'https://upscalepm.com.au/terms-and-conditions/',
  // Pages (from page-sitemap.xml)
  'https://upscalepm.com.au/',
  'https://upscalepm.com.au/contact-us/',
  'https://upscalepm.com.au/thank-you-page/',
  'https://upscalepm.com.au/quick-bites-project-management-sydney/',
  'https://upscalepm.com.au/crosslife-church-asquith-development/',
  'https://upscalepm.com.au/granville-diggers-club-development/',
  'https://upscalepm.com.au/tender-assessment/',
  'https://upscalepm.com.au/construction-superintendent/',
  'https://upscalepm.com.au/insights/',
  'https://upscalepm.com.au/da-approval/',
  'https://upscalepm.com.au/design-management/',
  'https://upscalepm.com.au/feasibility-and-advisory/',
  'https://upscalepm.com.au/about-us/',
  'https://upscalepm.com.au/project-page-template/',
  'https://upscalepm.com.au/projects/',
  // Categories (from category-sitemap.xml)
  'https://upscalepm.com.au/category/uncategorized/',
  'https://upscalepm.com.au/category/residential/',
  'https://upscalepm.com.au/category/commercial/',
  'https://upscalepm.com.au/category/fitout/',
  'https://upscalepm.com.au/category/infrastructure/',
  'https://upscalepm.com.au/category/hotel/',
  'https://upscalepm.com.au/category/development/',
  'https://upscalepm.com.au/category/planning-proposal/',
  'https://upscalepm.com.au/category/quick-bites/',
]

// Also check common WordPress URLs not in sitemap
const EXTRA_URLS_TO_CHECK = [
  'https://upscalepm.com.au/feed/',
  'https://upscalepm.com.au/feed/atom/',
  'https://upscalepm.com.au/comments/feed/',
]

/**
 * Fetch a URL and return the response text, handling errors gracefully
 */
async function fetchPage(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; UpScalePM-Crawler/1.0; migration)',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)

    if (!response.ok) {
      console.log(`  [${response.status}] ${url}`)
      return { html: null, status: response.status, finalUrl: response.url }
    }

    const html = await response.text()
    return { html, status: response.status, finalUrl: response.url }
  } catch (err) {
    console.log(`  [ERROR] ${url}: ${err.message}`)
    return { html: null, status: 0, finalUrl: url }
  }
}

/**
 * Extract metadata from an HTML page using regex
 * (No external dependency needed -- works with built-in Node.js)
 */
function extractMetadata(html, url) {
  if (!html) return null

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : ''

  // Meta description
  const metaDescMatch = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i,
  )
  const metaDescMatch2 = html.match(
    /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*\/?>/i,
  )
  const metaDescription = (
    metaDescMatch
      ? metaDescMatch[1]
      : metaDescMatch2
        ? metaDescMatch2[1]
        : ''
  )
    .trim()
    .replace(/\s+/g, ' ')

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  const h1 = h1Match
    ? h1Match[1].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' ')
    : ''

  // Canonical
  const canonicalMatch = html.match(
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["'][^>]*\/?>/i,
  )
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : ''

  // Body text preview (strip all HTML tags, get first 500 chars)
  // Try to find main content area
  let bodyText = ''
  const mainContent =
    html.match(
      /<main[^>]*>([\s\S]*?)<\/main>/i,
    )?.[1] ||
    html.match(
      /<article[^>]*>([\s\S]*?)<\/article>/i,
    )?.[1] ||
    html.match(
      /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    )?.[1] ||
    html.match(
      /<div[^>]*class="[^"]*elementor[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    )?.[1] ||
    ''

  if (mainContent) {
    bodyText = mainContent
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 500)
  }

  // Internal links
  const linkRegex =
    /href=["'](https?:\/\/upscalepm\.com\.au[^"']*|\/[^"']*?)["']/gi
  const internalLinks = new Set()
  let linkMatch
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    let link = linkMatch[1]
    // Normalize to path only
    if (link.startsWith('http')) {
      try {
        const parsed = new URL(link)
        if (
          parsed.hostname === 'upscalepm.com.au' ||
          parsed.hostname === 'www.upscalepm.com.au'
        ) {
          link = parsed.pathname + parsed.search + parsed.hash
        } else {
          continue
        }
      } catch {
        continue
      }
    }
    // Skip non-page links
    if (
      link.startsWith('/wp-admin') ||
      link.startsWith('/wp-login') ||
      link.startsWith('/wp-includes') ||
      link.startsWith('/wp-content') ||
      link === '#' ||
      link.startsWith('#')
    ) {
      continue
    }
    internalLinks.add(link)
  }

  // Image URLs (from img src and srcset)
  const imageRegex =
    /(?:src|srcset)=["'](https?:\/\/upscalepm\.com\.au\/wp-content\/uploads\/[^"'\s,]+)/gi
  const images = new Set()
  let imgMatch
  while ((imgMatch = imageRegex.exec(html)) !== null) {
    images.add(imgMatch[1].trim())
  }
  // Also pick up data-src (lazy loaded images)
  const lazyRegex =
    /data-src=["'](https?:\/\/upscalepm\.com\.au\/wp-content\/uploads\/[^"'\s]+)/gi
  while ((imgMatch = lazyRegex.exec(html)) !== null) {
    images.add(imgMatch[1].trim())
  }

  return {
    url,
    title,
    metaDescription,
    h1,
    bodyTextPreview: bodyText,
    internalLinks: [...internalLinks].sort(),
    images: [...images],
    canonical,
  }
}

/**
 * Download an image file using curl (more reliable for various formats)
 */
function downloadImage(imageUrl, destDir) {
  const filename = basename(new URL(imageUrl).pathname)
  const destPath = join(destDir, filename)

  if (existsSync(destPath)) {
    return { filename, status: 'exists' }
  }

  try {
    execSync(
      `curl -sS -L -o "${destPath}" --max-time 30 "${imageUrl}" 2>&1`,
      { timeout: 35000 },
    )
    return { filename, status: 'downloaded' }
  } catch (err) {
    return { filename, status: 'failed', error: err.message }
  }
}

async function main() {
  console.log('=== UpScalePM WordPress Crawl ===\n')

  // Ensure output directories exist
  mkdirSync(OUTPUT_DIR, { recursive: true })
  mkdirSync(IMAGE_DIR, { recursive: true })

  // Combine sitemap URLs + extra URLs to check
  const allUrls = [...new Set([...SITEMAP_URLS, ...EXTRA_URLS_TO_CHECK])]

  console.log(`Found ${allUrls.length} URLs to crawl.\n`)

  const crawlData = []
  const allImages = new Set()
  const failedUrls = []

  // Crawl each page
  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i]
    console.log(`[${i + 1}/${allUrls.length}] Crawling: ${url}`)

    const { html, status, finalUrl } = await fetchPage(url)

    if (!html) {
      failedUrls.push({ url, status })
      continue
    }

    const metadata = extractMetadata(html, url)
    if (metadata) {
      // Also check for any additional links we discovered that are NOT in our URL list
      // (This catches pages linked from the site but not in the sitemap)
      for (const link of metadata.internalLinks) {
        const fullUrl = `${SITE_URL}${link}`
        if (
          !allUrls.includes(fullUrl) &&
          !allUrls.includes(fullUrl.replace(/\/$/, '') + '/') &&
          !link.includes('#') &&
          !link.includes('?')
        ) {
          // Log discovered URLs not in sitemap
          console.log(`  -> Discovered URL not in sitemap: ${link}`)
        }
      }

      // Collect images
      for (const img of metadata.images) {
        allImages.add(img)
      }

      crawlData.push(metadata)
    }

    // Small delay to be respectful
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  console.log(`\nCrawl complete. ${crawlData.length} pages crawled successfully.`)
  console.log(`${failedUrls.length} URLs failed or returned non-200.`)
  console.log(`${allImages.size} unique images found.\n`)

  // Write crawl-data.json
  const crawlDataPath = join(OUTPUT_DIR, 'crawl-data.json')
  writeFileSync(crawlDataPath, JSON.stringify(crawlData, null, 2))
  console.log(`Written: ${crawlDataPath}`)

  // Write url-inventory.md
  const inventoryLines = [
    '# URL Inventory -- upscalepm.com.au',
    '',
    `Crawled on: ${new Date().toISOString()}`,
    `Total pages crawled: ${crawlData.length}`,
    `Total images found: ${allImages.size}`,
    '',
    '## Pages',
    '',
    '| URL | Title | H1 |',
    '|-----|-------|-----|',
  ]

  for (const page of crawlData) {
    const shortUrl = page.url.replace(SITE_URL, '')
    inventoryLines.push(
      `| ${shortUrl || '/'} | ${page.title.substring(0, 60)} | ${page.h1.substring(0, 60)} |`,
    )
  }

  if (failedUrls.length > 0) {
    inventoryLines.push('')
    inventoryLines.push('## Failed / Non-200 URLs')
    inventoryLines.push('')
    for (const f of failedUrls) {
      inventoryLines.push(`- [${f.status}] ${f.url}`)
    }
  }

  inventoryLines.push('')
  inventoryLines.push('## All Image URLs')
  inventoryLines.push('')
  for (const img of [...allImages].sort()) {
    inventoryLines.push(`- ${img}`)
  }

  const inventoryPath = join(OUTPUT_DIR, 'url-inventory.md')
  writeFileSync(inventoryPath, inventoryLines.join('\n'))
  console.log(`Written: ${inventoryPath}`)

  // Download images
  console.log(`\nDownloading ${allImages.size} images...\n`)
  const imageResults = { downloaded: 0, exists: 0, failed: 0 }

  for (const imgUrl of allImages) {
    const result = downloadImage(imgUrl, IMAGE_DIR)
    imageResults[result.status] = (imageResults[result.status] || 0) + 1
    if (result.status === 'downloaded') {
      console.log(`  Downloaded: ${result.filename}`)
    } else if (result.status === 'failed') {
      console.log(`  FAILED: ${result.filename} -- ${result.error}`)
    }
  }

  console.log(`\nImage download results:`)
  console.log(`  Downloaded: ${imageResults.downloaded}`)
  console.log(`  Already existed: ${imageResults.exists}`)
  console.log(`  Failed: ${imageResults.failed}`)

  // Generate redirect map
  console.log('\nGenerating redirect map...')
  const redirects = generateRedirects(crawlData)
  const redirectPath = join(OUTPUT_DIR, 'redirects.json')
  writeFileSync(redirectPath, JSON.stringify(redirects, null, 2))
  console.log(`Written: ${redirectPath} (${redirects.length} redirects)`)

  console.log('\n=== Crawl Complete ===')
}

/**
 * Generate 301 redirect map from crawled data
 */
function generateRedirects(crawlData) {
  const redirects = []
  const seen = new Set()

  for (const page of crawlData) {
    const oldPath = new URL(page.url).pathname

    // Skip admin paths
    if (
      oldPath.startsWith('/wp-admin') ||
      oldPath.startsWith('/wp-login') ||
      oldPath === '/'
    ) {
      continue
    }

    // Skip elementor template pages
    if (oldPath.startsWith('/elementor-hf/')) {
      continue
    }

    // Determine new path based on content type
    let newPath = mapOldPathToNew(oldPath)

    if (newPath && !seen.has(oldPath)) {
      seen.add(oldPath)
      redirects.push({
        source: oldPath,
        destination: newPath,
        statusCode: 301,
      })
    }
  }

  // Add common WordPress paths that should redirect
  const commonRedirects = [
    // RSS feeds
    { source: '/feed/', destination: '/insights', statusCode: 301 },
    { source: '/feed/atom/', destination: '/insights', statusCode: 301 },
    { source: '/comments/feed/', destination: '/insights', statusCode: 301 },

    // WordPress standard paths
    { source: '/wp-json/:path*', destination: '/', statusCode: 301 },
    { source: '/xmlrpc.php', destination: '/', statusCode: 301 },

    // Pagination patterns
    {
      source: '/page/:num(\\d+)/',
      destination: '/insights',
      statusCode: 301,
    },

    // Author pages (WordPress generates these)
    { source: '/author/:slug/', destination: '/about', statusCode: 301 },
    { source: '/author/:slug', destination: '/about', statusCode: 301 },

    // Tag pages
    { source: '/tag/:slug/', destination: '/insights', statusCode: 301 },
    { source: '/tag/:slug', destination: '/insights', statusCode: 301 },
  ]

  for (const r of commonRedirects) {
    if (!seen.has(r.source)) {
      seen.add(r.source)
      redirects.push(r)
    }
  }

  return redirects
}

/**
 * Map old WordPress path to new Next.js path
 */
function mapOldPathToNew(oldPath) {
  // Remove trailing slash for comparison (but keep it in source for redirect)
  const pathNoSlash = oldPath.replace(/\/$/, '')

  // Category pages -> insights
  if (oldPath.startsWith('/category/')) {
    return '/insights'
  }

  // Service pages mapping
  const servicePages = {
    '/feasibility-and-advisory': '/services/feasibility-advisory',
    '/da-approval': '/services/da-approval',
    '/design-management': '/services/design-management',
    '/tender-assessment': '/services/tender-assessment',
    '/construction-superintendent': '/services/construction-superintendent',
  }
  if (servicePages[pathNoSlash]) {
    return servicePages[pathNoSlash]
  }

  // Project/case study pages
  const caseStudyPages = [
    '/crosslife-church-asquith-development',
    '/granville-diggers-club-development',
    '/calibre-cooper-street-residential-apartments-surry-hills',
    '/delivering-modern-government-workspaces-at-231-elizabeth-street',
    '/expanding-government-tenancy-at-glass-house-macquarie-park',
    '/navigating-encumbrance-vibe-hotel-darling-harbour',
    '/health-project-management-in-regional-emergency-infrastructure',
    '/major-laboratory-relocation-future-proofing-sydney-waters-filtration-capabilities',
    '/private-architectural-practice-combining-design-vision-and-construction-project-management',
    '/project-management-delivery-in-the-final-stretch-newcastle-office-fit-out',
    '/strategic-rezoning-planning-proposal-pete-island-and-mooney-mooney',
    '/delivering-complexity-with-clarity',
    '/structured-for-success-delivering-granville-diggers-club-via-as4902-and-separable-portions',
    '/granville-diggers-club-development-origin',
  ]
  if (caseStudyPages.includes(pathNoSlash)) {
    const slug = pathNoSlash.split('/').pop()
    return `/case-studies/${slug}`
  }

  // Insights/blog posts (quick bites and articles)
  const insightsPosts = [
    '/city-of-sydney-da-explained-challenges-delays-and-solutions',
    '/passion-for-delivering-projects',
    '/boutique-residential-development-lessons-from-the-rushcutters-sydney',
    '/beyond-projects-building-for-health-community-and-change',
    '/beyond-balance-finding-meaning-in-the-demands-of-project-delivery',
    '/tender-evaluation-how-we-choose-the-right-contractor',
    '/commercial-tenant-fit-out-who-pays-for-upgrades-and-compliance',
    '/construction-contracts-for-your-refurbishment-project',
    '/construction-variations-and-design-freeze',
    '/insights-into-floor-space-ratio',
    '/from-architect-to-project-manager-first-project',
    '/inside-the-mba-bc3-contract',
    '/ground-anchors-and-license-access-deeds',
    '/client-side-project-management-sydney',
  ]
  if (insightsPosts.includes(pathNoSlash)) {
    const slug = pathNoSlash.split('/').pop()
    return `/insights/${slug}`
  }

  // Feed URLs -> insights
  if (oldPath.startsWith('/feed') || oldPath.startsWith('/comments/feed')) {
    return '/insights'
  }

  // Specific page mappings
  const pageMap = {
    '/about-us': '/about',
    '/contact-us': '/contact',
    '/projects': '/case-studies',
    '/insights': '/insights',
    '/quick-bites-project-management-sydney': '/insights',
    '/thank-you-page': '/thank-you',
    '/privacy-policy': '/privacy-policy',
    '/terms-and-conditions': '/terms-and-conditions',
    '/project-page-template': '/case-studies',
  }
  if (pageMap[pathNoSlash]) {
    return pageMap[pathNoSlash]
  }

  // If trailing slash differs, redirect without trailing slash
  if (oldPath.endsWith('/') && oldPath !== '/') {
    return pathNoSlash
  }

  return null
}

main().catch((err) => {
  console.error('Crawl failed:', err)
  process.exit(1)
})
