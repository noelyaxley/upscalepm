#!/bin/bash
# ============================================================
# UpScale PM — Draft Admin System Setup Script
# ============================================================
# This script:
# 1. Installs new dependencies (jose, next-mdx-remote, @uiw/react-md-editor)
# 2. Stages all new draft admin files
# 3. Commits and pushes to GitHub
# 4. Reminds you to set environment variables
# ============================================================

set -e

echo "============================================"
echo "  UpScale PM — Draft Admin Setup"
echo "============================================"
echo ""

# Step 1: Install dependencies
echo "📦 Installing new dependencies..."
npm install jose next-mdx-remote @uiw/react-md-editor
echo "✅ Dependencies installed"
echo ""

# Step 2: Remove test file (created during development)
if [ -f "test.txt" ]; then
  rm test.txt
  echo "🧹 Cleaned up test.txt"
fi

# Step 3: Stage new files
echo "📝 Staging new draft admin files..."
git add \
  src/lib/github.ts \
  src/lib/draft-auth.ts \
  src/middleware.ts \
  src/app/api/draft/login/route.ts \
  src/app/api/draft/logout/route.ts \
  src/app/api/draft/posts/route.ts \
  "src/app/api/draft/posts/[slug]/route.ts" \
  "src/app/api/draft/posts/[slug]/update/route.ts" \
  "src/app/api/draft/posts/[slug]/publish/route.ts" \
  src/components/draft/draft-nav.tsx \
  src/components/draft/draft-preview-banner.tsx \
  src/components/draft/draft-mdx-renderer.tsx \
  src/app/insights/draft/layout.tsx \
  src/app/insights/draft/login/page.tsx \
  src/app/insights/draft/page.tsx \
  "src/app/insights/draft/[slug]/page.tsx" \
  "src/app/insights/draft/[slug]/edit/page.tsx" \
  package.json \
  package-lock.json

echo "✅ Files staged"
echo ""

# Step 4: Commit
echo "💾 Committing..."
git commit -m "feat: add draft admin system for blog post preview, editing, and publishing

- JWT-based auth with middleware route protection
- Dashboard listing open PRs from content pipeline
- Preview page rendering MDX identically to live site
- Live MDX editor with save/publish workflow
- One-click publish (merges PR → Vercel rebuild → live)
- API routes for CRUD + auth

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
echo "✅ Committed"
echo ""

# Step 5: Push
echo "🚀 Pushing to GitHub..."
git push origin main
echo "✅ Pushed to GitHub"
echo ""

# Step 6: Environment variable reminders
echo "============================================"
echo "  ⚠️  ENVIRONMENT VARIABLES NEEDED"
echo "============================================"
echo ""
echo "Add these to your .env.local AND Vercel dashboard:"
echo ""
echo "  DRAFT_ADMIN_USER=admin"
echo "  DRAFT_ADMIN_PASS=<choose a strong password>"
echo "  DRAFT_ADMIN_SECRET=<random 32+ char string for JWT signing>"
echo "  GITHUB_PAT=<your GitHub personal access token>"
echo ""
echo "To generate a random secret:"
echo "  openssl rand -base64 32"
echo ""
echo "============================================"
echo "  🎉 Setup Complete!"
echo "============================================"
echo ""
echo "Once deployed, visit:"
echo "  https://upscalepm.com.au/insights/draft/login"
echo ""
echo "Or locally:"
echo "  http://localhost:3000/insights/draft/login"
echo ""
