import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { CaseStudyFrontmatter, InsightFrontmatter, ContentItem } from './content.types'

const CONTENT_DIR = path.join(process.cwd(), 'content')

function getMDXFiles(directory: string): string[] {
  const dir = path.join(CONTENT_DIR, directory)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

function parseMDXFile<T>(directory: string, filename: string): ContentItem<T> {
  const filePath = path.join(CONTENT_DIR, directory, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const slug = filename.replace('.mdx', '')

  return {
    slug,
    frontmatter: data as T,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
  }
}

// Case studies
export function getAllCaseStudies(): ContentItem<CaseStudyFrontmatter>[] {
  return getMDXFiles('case-studies')
    .map((file) => parseMDXFile<CaseStudyFrontmatter>('case-studies', file))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99))
}

export function getCaseStudyBySlug(slug: string): ContentItem<CaseStudyFrontmatter> | null {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, 'case-studies', filename)
  if (!fs.existsSync(filePath)) return null
  return parseMDXFile<CaseStudyFrontmatter>('case-studies', filename)
}

export function getCaseStudySlugs(): string[] {
  return getMDXFiles('case-studies').map((file) => file.replace('.mdx', ''))
}

// Insights
export function getAllInsights(): ContentItem<InsightFrontmatter>[] {
  return getMDXFiles('insights')
    .map((file) => parseMDXFile<InsightFrontmatter>('insights', file))
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function getInsightBySlug(slug: string): ContentItem<InsightFrontmatter> | null {
  const filename = `${slug}.mdx`
  const filePath = path.join(CONTENT_DIR, 'insights', filename)
  if (!fs.existsSync(filePath)) return null
  return parseMDXFile<InsightFrontmatter>('insights', filename)
}

export function getInsightSlugs(): string[] {
  return getMDXFiles('insights').map((file) => file.replace('.mdx', ''))
}
