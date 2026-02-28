const GITHUB_API = 'https://api.github.com'
const REPO_OWNER = 'noelyaxley'
const REPO_NAME = 'upscalepm'

function getHeaders() {
  const token = process.env.GITHUB_PAT
  if (!token) throw new Error('GITHUB_PAT environment variable is not set')
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
}

export interface DraftPR {
  prNumber: number
  title: string
  slug: string
  branch: string
  createdAt: string
  updatedAt: string
  prUrl: string
  author: string
}

export interface DraftContent {
  slug: string
  content: string
  frontmatter: Record<string, unknown>
  fileSha: string
  branch: string
  prNumber: number
  imageFiles: string[]
}

/**
 * List open PRs that contain draft blog posts (content/insights/*.mdx)
 */
export async function listDraftPRs(): Promise<DraftPR[]> {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open&per_page=50`,
    { headers: getHeaders(), next: { revalidate: 0 } }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)

  const pulls = await res.json()
  const drafts: DraftPR[] = []

  for (const pr of pulls) {
    // Check if this PR contains an MDX file in content/insights/
    const filesRes = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${pr.number}/files`,
      { headers: getHeaders() }
    )
    if (!filesRes.ok) continue

    const files = await filesRes.json()
    const mdxFile = files.find(
      (f: { filename: string }) =>
        f.filename.startsWith('content/insights/') && f.filename.endsWith('.mdx')
    )

    if (mdxFile) {
      const slug = mdxFile.filename
        .replace('content/insights/', '')
        .replace('.mdx', '')

      drafts.push({
        prNumber: pr.number,
        title: pr.title,
        slug,
        branch: pr.head.ref,
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        prUrl: pr.html_url,
        author: pr.user?.login || 'unknown',
      })
    }
  }

  return drafts
}

/**
 * Get the list of files in a PR
 */
export async function getPRFiles(prNumber: number): Promise<Array<{ filename: string; sha: string }>> {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${prNumber}/files`,
    { headers: getHeaders() }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  return res.json()
}

/**
 * Fetch raw file content + SHA from a specific branch
 */
export async function getFileFromBranch(
  branch: string,
  filePath: string
): Promise<{ content: string; sha: string }> {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${branch}`,
    { headers: getHeaders(), next: { revalidate: 0 } }
  )
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} — could not fetch ${filePath} from ${branch}`)

  const data = await res.json()
  const content = Buffer.from(data.content, 'base64').toString('utf-8')
  return { content, sha: data.sha }
}

/**
 * Commit an updated file to a branch
 */
export async function updateFile(
  branch: string,
  filePath: string,
  content: string,
  sha: string,
  message: string
): Promise<{ sha: string }> {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
      }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`GitHub API error: ${res.status} — ${err}`)
  }

  const data = await res.json()
  return { sha: data.content.sha }
}

/**
 * Squash-merge a PR
 */
export async function mergePR(
  prNumber: number,
  commitTitle?: string
): Promise<{ merged: boolean; message: string }> {
  const res = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${prNumber}/merge`,
    {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        merge_method: 'squash',
        commit_title: commitTitle || `Publish blog post (PR #${prNumber})`,
      }),
    }
  )

  const data = await res.json()
  if (!res.ok) {
    throw new Error(`Merge failed: ${data.message || res.statusText}`)
  }

  return { merged: true, message: data.message }
}

/**
 * Find a draft PR by slug
 */
export async function findPRBySlug(slug: string): Promise<DraftPR | null> {
  const drafts = await listDraftPRs()
  return drafts.find((d) => d.slug === slug) || null
}

/**
 * Get the full draft content (MDX + metadata) for a slug
 */
export async function getDraftContent(slug: string): Promise<DraftContent | null> {
  const pr = await findPRBySlug(slug)
  if (!pr) return null

  const filePath = `content/insights/${slug}.mdx`
  const { content, sha } = await getFileFromBranch(pr.branch, filePath)

  // Get image files from the PR
  const files = await getPRFiles(pr.prNumber)
  const imageFiles = files
    .filter((f: { filename: string }) =>
      f.filename.startsWith(`public/images/insights/${slug}/`)
    )
    .map((f: { filename: string }) => f.filename)

  // Parse frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  let frontmatter: Record<string, unknown> = {}
  if (fmMatch) {
    const fmLines = fmMatch[1].split('\n')
    for (const line of fmLines) {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) continue
      const key = line.slice(0, colonIdx).trim()
      let value: unknown = line.slice(colonIdx + 1).trim()
      // Handle quoted strings
      if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }
      // Handle booleans
      if (value === 'true') value = true
      if (value === 'false') value = false
      // Handle arrays (simple YAML inline)
      if (typeof value === 'string' && value.startsWith('[')) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'))
        } catch {
          // leave as string
        }
      }
      frontmatter[key] = value
    }
  }

  return {
    slug,
    content,
    frontmatter,
    fileSha: sha,
    branch: pr.branch,
    prNumber: pr.prNumber,
    imageFiles,
  }
}

/**
 * Build a raw.githubusercontent.com URL for an image on a PR branch
 */
export function buildRawImageUrl(branch: string, imagePath: string): string {
  // imagePath like "public/images/insights/my-slug/hero.jpg"
  // raw URL doesn't include "public/" prefix since it serves from repo root
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${branch}/${imagePath}`
}
