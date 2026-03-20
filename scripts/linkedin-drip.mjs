#!/usr/bin/env node
/**
 * LinkedIn Drip Poster — posts one club redevelopment blog every 36 hours.
 *
 * Usage:
 *   node scripts/linkedin-drip.mjs              # Post next unposted blog
 *   node scripts/linkedin-drip.mjs --preview    # Preview next post without publishing
 *   node scripts/linkedin-drip.mjs --preview-all # Preview all unposted blogs
 *   node scripts/linkedin-drip.mjs --status     # Show what's been posted and what's queued
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INSIGHTS_DIR = path.join(ROOT, "content", "insights");
const STATE_FILE = path.join(ROOT, "scripts", ".linkedin-drip-state.json");
const SITE_URL = "https://upscalepm.com.au";

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
  const truncatedBody = blog.body.slice(0, 4000); // Keep context reasonable

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

// ─── LinkedIn: create a post with article link ───

async function postToLinkedIn(text, articleUrl) {
  const postBody = {
    author: ORG_URN,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text },
        shareMediaCategory: "ARTICLE",
        media: [
          {
            status: "READY",
            originalUrl: articleUrl,
          },
        ],
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINKEDIN_TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  const responseText = await res.text();

  if (!res.ok) {
    throw new Error(`LinkedIn API error (${res.status}): ${responseText}`);
  }

  // LinkedIn returns the post URN in the id header or response
  const postId = res.headers.get("x-restli-id") || responseText;
  return postId;
}

// ─── LinkedIn: reshare company post from personal profile ───

async function reshareToPersonal(comment, companyPostUrn) {
  const postBody = {
    author: PERSON_URN,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: comment },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
    resharedPost: companyPostUrn,
  };

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LINKEDIN_TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  const responseText = await res.text();

  if (!res.ok) {
    throw new Error(`LinkedIn reshare error (${res.status}): ${responseText}`);
  }

  const reshareId = res.headers.get("x-restli-id") || responseText;
  return reshareId;
}

// ─── Main ───

async function main() {
  const args = process.argv.slice(2);
  const isPreview = args.includes("--preview");
  const isPreviewAll = args.includes("--preview-all");
  const isStatus = args.includes("--status");

  const blogs = getClubRedevelopmentBlogs();
  const state = loadState();

  // Filter out already-posted blogs
  const queued = blogs.filter((b) => !state.posted.includes(b.slug));

  if (isStatus) {
    console.log(`\n📊 LinkedIn Drip Status`);
    console.log(`─────────────────────────`);
    console.log(`Total club redevelopment blogs: ${blogs.length}`);
    console.log(`Posted: ${state.posted.length}`);
    console.log(`Queued: ${queued.length}`);
    if (state.lastPostedAt) {
      const last = new Date(state.lastPostedAt);
      const nextDue = new Date(last.getTime() + 36 * 60 * 60 * 1000);
      console.log(`Last posted: ${last.toLocaleString()}`);
      console.log(`Next due: ${nextDue.toLocaleString()}`);
    }
    console.log(`\nPosted:`);
    for (const slug of state.posted) {
      const blog = blogs.find((b) => b.slug === slug);
      console.log(`  ✅ ${blog?.title || slug}`);
    }
    console.log(`\nQueued:`);
    for (const blog of queued) {
      console.log(`  ⏳ ${blog.title}`);
    }
    return;
  }

  if (queued.length === 0) {
    console.log("All club redevelopment blogs have been posted!");
    return;
  }

  // Check 36-hour cooldown
  if (!isPreview && !isPreviewAll && state.lastPostedAt) {
    const elapsed = Date.now() - new Date(state.lastPostedAt).getTime();
    const cooldownMs = 36 * 60 * 60 * 1000;
    if (elapsed < cooldownMs) {
      const remaining = Math.round((cooldownMs - elapsed) / (60 * 60 * 1000) * 10) / 10;
      console.log(`⏰ Cooldown active. Next post in ${remaining} hours.`);
      return;
    }
  }

  if (isPreviewAll) {
    for (const blog of queued) {
      const articleUrl = `${SITE_URL}/insights/${blog.slug}`;
      console.log(`\n${"═".repeat(60)}`);
      console.log(`📝 ${blog.title}`);
      console.log(`🔗 ${articleUrl}`);
      console.log(`${"─".repeat(60)}`);
      const postText = await generateLinkedInPost(blog);
      console.log(postText);
    }
    return;
  }

  // Take the next blog in the queue
  const blog = queued[0];
  const articleUrl = `${SITE_URL}/insights/${blog.slug}`;

  console.log(`\nGenerating LinkedIn post for: ${blog.title}`);
  console.log(`Article URL: ${articleUrl}\n`);

  const postText = await generateLinkedInPost(blog);
  const reshareComment = await generateReshareComment(blog);

  console.log("─".repeat(50));
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

  console.log("\nPosting to company page...");
  const postId = await postToLinkedIn(postText, articleUrl);
  console.log(`✅ Company post: ${postId}`);

  console.log("Resharing to personal profile...");
  const reshareId = await reshareToPersonal(reshareComment, postId);
  console.log(`✅ Personal reshare: ${reshareId}`);

  // Update state
  state.posted.push(blog.slug);
  state.lastPostedAt = new Date().toISOString();
  saveState(state);

  console.log(`\n${queued.length - 1} blogs remaining in queue.`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
