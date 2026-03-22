#!/usr/bin/env node
/**
 * LinkedIn Drip Poster — posts one club redevelopment blog every 18 hours.
 * Uses the LinkedIn Posts API (v2, current) instead of the deprecated UGC API.
 *
 * Usage:
 *   node scripts/linkedin-drip.mjs              # Post next unposted blog
 *   node scripts/linkedin-drip.mjs --preview    # Preview next post without publishing
 *   node scripts/linkedin-drip.mjs --preview-all # Preview all unposted blogs
 *   node scripts/linkedin-drip.mjs --status     # Show what's been posted and what's queued
 *   node scripts/linkedin-drip.mjs --force      # Skip cooldown and post now
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INSIGHTS_DIR = path.join(ROOT, "content", "insights");
const STATE_FILE = path.join(ROOT, "scripts", ".linkedin-drip-state.json");
const LOG_FILE = path.join(ROOT, "scripts", "linkedin-drip.log");
const SITE_URL = "https://upscalepm.com.au";
const COOLDOWN_HOURS = 18;

// Load .env.local
const envPath = path.join(ROOT, ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([A-Z_]+)="?([^"]*)"?$/);
  if (match) env[match[1]] = match[2];
}

const LINKEDIN_TOKEN = env.LINKEDIN_ACCESS_TOKEN;
const ANTHROPIC_KEY = env.ANTHROPIC_API_KEY;
const ORG_URN = env.LINKEDIN_ORG_URN;
const PERSON_URN = env.LINKEDIN_PERSON_URN;

if (!LINKEDIN_TOKEN || !ANTHROPIC_KEY || !ORG_URN || !PERSON_URN) {
  console.error("Missing required env vars in .env.local: LINKEDIN_ACCESS_TOKEN, ANTHROPIC_API_KEY, LINKEDIN_ORG_URN, LINKEDIN_PERSON_URN");
  process.exit(1);
}

// ─── Logging ───

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, line + "\n");
}

// ─── Blog discovery ───

function getClubRedevelopmentBlogs() {
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
  const blogs = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf-8");
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;

    const fm = frontmatterMatch[1];
    if (!fm.includes('category: "Club Redevelopment"')) continue;
    if (fm.includes("draft: true")) continue;

    const title = fm.match(/title:\s*"([^"]+)"/)?.[1] || file;
    const excerpt = fm.match(/excerpt:\s*"([^"]+)"/)?.[1] || "";
    const date = fm.match(/date:\s*"([^"]+)"/)?.[1] || "";
    const slug = file.replace(".mdx", "");
    const body = content.replace(/^---\n[\s\S]*?\n---\n*/, "");

    blogs.push({ file, slug, title, excerpt, date, body });
  }

  // Sort by date ascending (oldest first)
  blogs.sort((a, b) => a.date.localeCompare(b.date));
  return blogs;
}

// ─── State management ───

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  }
  return { posted: [], lastPostedAt: null };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Claude: generate LinkedIn post text ───

async function generateLinkedInPost(blog) {
  const truncatedBody = blog.body.slice(0, 4000);

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      messages: [
        {
          role: "user",
          content: `You are Noel Yaxley, founder of Upscale Project Management — a client-side project management firm that provides independent, client-side project advice for NSW clubs (RSLs, leagues clubs, community clubs) undertaking redevelopments. Upscale is currently delivering the Granville Diggers club redevelopment. Your voice is bold, direct, no-BS, founder-led.

Write a short LinkedIn post (150-200 words) to accompany sharing this blog article. The post should:
- Open with a hook that grabs attention (not "I wrote a blog about...")
- Share a genuine insight or opinion from the article content
- Sound like a real person sharing their professional perspective, not a marketing team
- End with a reason to click through and read the full article
- Do NOT fabricate experience — do NOT claim to have worked on "dozens" of projects or reference specific clubs unless it is Granville Diggers
- Do NOT use hashtags
- Do NOT use emojis
- Do NOT start with "I'm excited to share" or similar generic openers
- Write in first person as Noel

Blog title: ${blog.title}
Blog excerpt: ${blog.excerpt}
Blog content (truncated):
${truncatedBody}

Return ONLY the LinkedIn post text, nothing else.`,
        },
      ],
    }),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`Claude API error: ${JSON.stringify(data.error)}`);
  }
  return data.content[0].text.trim();
}

// ─── Claude: generate personal reshare comment ───

async function generateReshareComment(blog) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `You are Noel Yaxley, founder of Upscale Project Management. You're resharing a post from your company page to your personal LinkedIn profile.

Write ONE sentence (max 20 words) as a personal comment to accompany the reshare. It should:
- Sound casual and authentic, like a founder proud of their team's work
- Create curiosity that makes people want to click through
- Do NOT use hashtags or emojis
- Do NOT say "check out" or "take a look"

Blog title: ${blog.title}
Blog excerpt: ${blog.excerpt}

Return ONLY the single sentence, nothing else.`,
        },
      ],
    }),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`Claude API error: ${JSON.stringify(data.error)}`);
  }
  return data.content[0].text.trim();
}

// ─── LinkedIn Posts API: create a post with article link ───

async function postToLinkedIn(text, articleUrl, authorUrn, blog = {}) {
  const postBody = {
    author: authorUrn,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    content: {
      article: {
        source: articleUrl,
        title: blog.title,
        description: blog.excerpt,
      },
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINKEDIN_TOKEN}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202603",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  if (!res.ok) {
    const responseText = await res.text();
    throw new Error(`LinkedIn Posts API error (${res.status}): ${responseText}`);
  }

  // Post URN is returned in x-restli-id header
  const postUrn = res.headers.get("x-restli-id");
  return postUrn;
}

// ─── LinkedIn Posts API: reshare company post from personal profile ───

async function reshareToPersonal(comment, companyPostUrn) {
  const postBody = {
    author: PERSON_URN,
    commentary: comment,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    reshareContext: {
      parent: companyPostUrn,
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  const res = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINKEDIN_TOKEN}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202603",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  if (!res.ok) {
    const responseText = await res.text();
    throw new Error(`LinkedIn reshare error (${res.status}): ${responseText}`);
  }

  const reshareUrn = res.headers.get("x-restli-id");
  return reshareUrn;
}

// ─── Main ───

async function main() {
  const args = process.argv.slice(2);
  const isPreview = args.includes("--preview");
  const isPreviewAll = args.includes("--preview-all");
  const isStatus = args.includes("--status");
  const isForce = args.includes("--force");

  const blogs = getClubRedevelopmentBlogs();
  const state = loadState();

  // Filter out already-posted blogs
  const queued = blogs.filter((b) => !state.posted.includes(b.slug));

  if (isStatus) {
    console.log(`\nLinkedIn Drip Status`);
    console.log(`${"─".repeat(25)}`);
    console.log(`Total club redevelopment blogs: ${blogs.length}`);
    console.log(`Posted: ${state.posted.length}`);
    console.log(`Queued: ${queued.length}`);
    console.log(`Cooldown: ${COOLDOWN_HOURS}h`);
    if (state.lastPostedAt) {
      const last = new Date(state.lastPostedAt);
      const nextDue = new Date(last.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000);
      const now = new Date();
      console.log(`Last posted: ${last.toLocaleString()}`);
      if (now < nextDue) {
        const remaining = Math.round((nextDue.getTime() - now.getTime()) / (60 * 60 * 1000) * 10) / 10;
        console.log(`Next due: ${nextDue.toLocaleString()} (${remaining}h remaining)`);
      } else {
        console.log(`Next due: NOW (cooldown elapsed)`);
      }
    }
    console.log(`\nPosted:`);
    for (const slug of state.posted) {
      const blog = blogs.find((b) => b.slug === slug);
      console.log(`  [done] ${blog?.title || slug}`);
    }
    console.log(`\nQueued:`);
    for (const blog of queued) {
      console.log(`  [next] ${blog.title}`);
    }
    return;
  }

  if (queued.length === 0) {
    console.log("All club redevelopment blogs have been posted!");
    return;
  }

  // Check cooldown
  if (!isPreview && !isPreviewAll && !isForce && state.lastPostedAt) {
    const elapsed = Date.now() - new Date(state.lastPostedAt).getTime();
    const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
    if (elapsed < cooldownMs) {
      const remaining = Math.round((cooldownMs - elapsed) / (60 * 60 * 1000) * 10) / 10;
      console.log(`Cooldown active. Next post in ${remaining} hours. Use --force to skip.`);
      return;
    }
  }

  if (isPreviewAll) {
    for (const blog of queued) {
      const articleUrl = `${SITE_URL}/insights/${blog.slug}`;
      console.log(`\n${"=".repeat(60)}`);
      console.log(`${blog.title}`);
      console.log(`${articleUrl}`);
      console.log(`${"─".repeat(60)}`);
      const postText = await generateLinkedInPost(blog);
      console.log(postText);
    }
    return;
  }

  // Take the next blog in the queue
  const blog = queued[0];
  const articleUrl = `${SITE_URL}/insights/${blog.slug}`;

  log(`Generating LinkedIn post for: ${blog.title}`);
  log(`Article URL: ${articleUrl}`);

  const postText = await generateLinkedInPost(blog);
  const reshareComment = await generateReshareComment(blog);

  console.log("\n" + "─".repeat(50));
  console.log("COMPANY PAGE POST:");
  console.log(postText);
  console.log("─".repeat(50));
  console.log("PERSONAL RESHARE:");
  console.log(reshareComment);
  console.log("─".repeat(50));

  if (isPreview) {
    console.log("\n[Preview mode — not posted]");
    return;
  }

  // Post to company page
  log("Posting to company page...");
  const postUrn = await postToLinkedIn(postText, articleUrl, ORG_URN, blog);
  log(`Company post: ${postUrn}`);

  // Reshare to personal profile
  log("Resharing to personal profile...");
  try {
    const reshareUrn = await reshareToPersonal(reshareComment, postUrn);
    log(`Personal reshare: ${reshareUrn}`);
  } catch (err) {
    log(`Personal reshare failed: ${err.message}`);
    console.error("Reshare failed but company post succeeded. Continuing.");
  }

  // Update state
  state.posted.push(blog.slug);
  state.lastPostedAt = new Date().toISOString();
  saveState(state);

  log(`Done. ${queued.length - 1} blogs remaining in queue.`);
}

main().catch((err) => {
  log(`Error: ${err.message}`);
  process.exit(1);
});
