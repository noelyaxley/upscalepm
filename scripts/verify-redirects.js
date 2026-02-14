#!/usr/bin/env node

/**
 * Redirect Verification Script
 *
 * Reads the redirect map from content/migration/redirects.json
 * and verifies each redirect returns the expected 301/308 status
 * with the correct Location header.
 *
 * Usage:
 *   node scripts/verify-redirects.js
 *   node scripts/verify-redirects.js --base-url http://localhost:3000
 *   node scripts/verify-redirects.js --base-url https://upscalepm.vercel.app
 *
 * Prerequisites:
 *   - Next.js dev server running on localhost:3000 (or specify --base-url)
 *   - Redirects implemented in next.config.mjs or vercel.json
 */

const { readFileSync } = require('fs')
const { join } = require('path')
const http = require('http')
const https = require('https')

// Parse CLI args
const args = process.argv.slice(2)
const baseUrlIdx = args.indexOf('--base-url')
const BASE_URL =
  baseUrlIdx !== -1 && args[baseUrlIdx + 1]
    ? args[baseUrlIdx + 1]
    : 'http://localhost:3000'

const REDIRECT_FILE = join(
  process.cwd(),
  'content',
  'migration',
  'redirects.json',
)

/**
 * Make an HTTP request that does NOT follow redirects.
 * Returns { statusCode, location }.
 */
function checkRedirect(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http

    const req = client.get(
      url,
      {
        // Do not follow redirects
        maxRedirects: 0,
        headers: {
          'User-Agent': 'UpScalePM-Redirect-Verifier/1.0',
        },
      },
      (res) => {
        // Consume the response body to free up the socket
        res.resume()
        resolve({
          statusCode: res.statusCode,
          location: res.headers['location'] || null,
        })
      },
    )

    req.on('error', (err) => {
      reject(err)
    })

    req.setTimeout(10000, () => {
      req.destroy(new Error('Request timeout'))
    })
  })
}

/**
 * Normalize a URL path for comparison.
 * Handles Next.js dynamic route patterns (e.g., :slug, :path*) by skipping those.
 */
function isStaticRedirect(source) {
  return !source.includes(':') && !source.includes('*')
}

async function main() {
  console.log('=== Redirect Verification ===\n')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Redirect file: ${REDIRECT_FILE}\n`)

  // Load redirects
  let redirects
  try {
    const raw = readFileSync(REDIRECT_FILE, 'utf-8')
    redirects = JSON.parse(raw)
  } catch (err) {
    console.error(`Failed to read redirect file: ${err.message}`)
    process.exit(1)
  }

  console.log(`Total redirects: ${redirects.length}`)

  // Filter to only static redirects (skip dynamic route patterns)
  const staticRedirects = redirects.filter((r) => isStaticRedirect(r.source))
  const dynamicRedirects = redirects.filter((r) => !isStaticRedirect(r.source))

  console.log(`Static (testable): ${staticRedirects.length}`)
  console.log(`Dynamic (skipped): ${dynamicRedirects.length}`)
  console.log()

  if (dynamicRedirects.length > 0) {
    console.log('Skipped dynamic redirects:')
    for (const r of dynamicRedirects) {
      console.log(`  ${r.source} -> ${r.destination}`)
    }
    console.log()
  }

  // Test each static redirect
  const results = { passed: 0, failed: 0, error: 0 }
  const failures = []

  for (const redirect of staticRedirects) {
    const url = `${BASE_URL}${redirect.source}`
    const expectedStatus = redirect.statusCode
    const expectedLocation = redirect.destination

    try {
      const { statusCode, location } = await checkRedirect(url)

      // Accept both 301 and 308 as valid permanent redirects
      const statusOk =
        statusCode === expectedStatus ||
        (expectedStatus === 301 && statusCode === 308) ||
        (expectedStatus === 301 && statusCode === 307)

      // Normalize location for comparison
      let locationOk = false
      if (location) {
        // Location might be absolute or relative
        const normalizedLocation = location
          .replace(BASE_URL, '')
          .replace(/\/$/, '')
        const normalizedExpected = expectedLocation.replace(/\/$/, '')
        locationOk =
          normalizedLocation === normalizedExpected ||
          location === expectedLocation ||
          location === `${BASE_URL}${expectedLocation}`
      }

      if (statusOk && locationOk) {
        results.passed++
        console.log(`  PASS: ${redirect.source} -> ${location} [${statusCode}]`)
      } else {
        results.failed++
        const reason = !statusOk
          ? `Expected ${expectedStatus}, got ${statusCode}`
          : `Expected location ${expectedLocation}, got ${location}`
        failures.push({ redirect, statusCode, location, reason })
        console.log(
          `  FAIL: ${redirect.source} -> ${location || '(none)'} [${statusCode}] -- ${reason}`,
        )
      }
    } catch (err) {
      results.error++
      failures.push({
        redirect,
        statusCode: 0,
        location: null,
        reason: err.message,
      })
      console.log(`  ERROR: ${redirect.source} -- ${err.message}`)
    }
  }

  // Summary
  console.log('\n=== Results ===')
  console.log(`Passed: ${results.passed}`)
  console.log(`Failed: ${results.failed}`)
  console.log(`Errors: ${results.error}`)
  console.log(
    `Total:  ${results.passed + results.failed + results.error}/${staticRedirects.length}`,
  )

  if (failures.length > 0) {
    console.log('\n=== Failures ===')
    for (const f of failures) {
      console.log(`  ${f.redirect.source}`)
      console.log(`    Expected: ${f.redirect.statusCode} -> ${f.redirect.destination}`)
      console.log(`    Actual:   ${f.statusCode} -> ${f.location || '(none)'}`)
      console.log(`    Reason:   ${f.reason}`)
      console.log()
    }
    process.exit(1)
  } else {
    console.log('\nAll static redirects verified successfully.')
    process.exit(0)
  }
}

main().catch((err) => {
  console.error('Verification failed:', err)
  process.exit(1)
})
