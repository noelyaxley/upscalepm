#!/usr/bin/env python3
"""
Restore original WordPress blog content into existing MDX files.
Preserves frontmatter, replaces body with original wording converted to Markdown.
Reinstates YouTube and Instagram embeds as MDX components.
"""

import json
import os
import re
import glob
import html


def fix_newlines(content: str) -> str:
    """
    The JSON export replaced real newlines with literal 'n' characters.
    Restore them by replacing 'n' between HTML tags/comments with actual newlines.
    """
    # Replace sequences of 'n' that appear between > and < (tag boundaries)
    text = re.sub(r'>(n+)<', lambda m: '>' + '\n' * len(m.group(1)) + '<', content)
    # Handle 'n' at the very start of content before first tag
    text = re.sub(r'^(n+)<', lambda m: '\n' * len(m.group(1)) + '<', text)
    # Handle 'n' at the very end after last tag
    text = re.sub(r'>(n+)$', lambda m: '>' + '\n' * len(m.group(1)), text)
    return text


def extract_embeds(content: str) -> dict:
    """
    Extract YouTube and Instagram embed URLs from WordPress content
    before HTML-to-Markdown conversion.
    """
    embeds = {'youtube': [], 'instagram': []}

    # YouTube: wp:embed blocks with YouTube URLs
    for m in re.finditer(r'wp:embed\s*\{[^}]*"url"\s*:\s*"([^"]*youtube[^"]*)"', content):
        url = html.unescape(m.group(1))
        embeds['youtube'].append(url)
    for m in re.finditer(r'wp:embed\s*\{[^}]*"url"\s*:\s*"([^"]*youtu\.be[^"]*)"', content):
        url = html.unescape(m.group(1))
        embeds['youtube'].append(url)

    # Instagram: reel URLs inside blockquote/anchor structures
    # Extract unique reel IDs to avoid duplicates from the repeated link pattern
    reel_ids = set()
    for m in re.finditer(r'instagram\.com/reel/([^/?&"]+)', content):
        reel_ids.add(m.group(1))
    for reel_id in reel_ids:
        embeds['instagram'].append(f'https://www.instagram.com/reel/{reel_id}/')

    return embeds


def find_embed_positions(content: str) -> list:
    """
    Find where embeds appear in the content relative to the text,
    so we can insert them in the right position in the Markdown output.

    Returns a list of (position_marker, embed_type, url) tuples.
    The position_marker is the text that appears just before the embed.
    """
    positions = []

    # Fix newlines first for accurate text extraction
    fixed = fix_newlines(content)

    # Find YouTube embeds and the paragraph before them
    for m in re.finditer(
        r'(<!-- wp:paragraph -->\s*<p[^>]*>(.*?)</p>\s*<!-- /wp:paragraph -->\s*)'
        r'(?=<!-- wp:embed\s*\{[^}]*"providerNameSlug"\s*:\s*"youtube")',
        fixed, re.DOTALL
    ):
        before_text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        positions.append(('after_text', before_text, 'youtube'))

    # Find Instagram blockquotes and the paragraph before them
    for m in re.finditer(
        r'(<!-- wp:paragraph -->\s*<p[^>]*>(.*?)</p>\s*<!-- /wp:paragraph -->\s*)'
        r'(?=<!-- wp:quote -->)',
        fixed, re.DOTALL
    ):
        before_text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        positions.append(('after_text', before_text, 'instagram'))

    return positions


def wp_html_to_markdown(content: str, embeds: dict) -> str:
    """Convert WordPress HTML content to clean Markdown with embed components."""

    # Step 0: Fix newlines (JSON export replaced \n with literal 'n')
    content = fix_newlines(content)

    # Step 0.5: Remove Instagram blockquote embeds (they produce broken empty links)
    # These are <blockquote> blocks containing Instagram links
    content = re.sub(
        r'<!-- wp:quote -->\s*<blockquote[^>]*>.*?</blockquote>\s*<!-- /wp:quote -->',
        '',
        content,
        flags=re.DOTALL
    )

    # Step 0.6: Replace YouTube wp:embed blocks with placeholders
    youtube_idx = [0]
    def youtube_placeholder(m):
        idx = youtube_idx[0]
        youtube_idx[0] += 1
        if idx < len(embeds['youtube']):
            return f'\n\n__YOUTUBE_EMBED_{idx}__\n\n'
        return ''

    content = re.sub(
        r'<!-- wp:embed\s*\{[^}]*"providerNameSlug"\s*:\s*"youtube"[^>]*-->\s*'
        r'<figure[^>]*>.*?</figure>\s*'
        r'<!-- /wp:embed -->',
        youtube_placeholder,
        content,
        flags=re.DOTALL
    )

    # Step 1: Strip all WordPress block comments
    text = re.sub(r'<!--\s*/?wp:\w[^>]*?-->\s*', '', content)

    # Step 2: Handle <figure> and <img> blocks — strip images entirely
    # (images are managed via MDX frontmatter)
    text = re.sub(r'<figure[^>]*>.*?</figure>', '', text, flags=re.DOTALL)

    # Step 3: Handle separators / horizontal rules
    text = re.sub(r'<hr[^>]*/?\s*>', '\n---\n', text)

    # Step 4: Headings
    for level in range(6, 0, -1):
        prefix = '#' * level
        # Handle headings with nested <strong> tags
        def heading_replace(m, p=prefix):
            inner = m.group(1)
            # Strip <strong> tags inside headings
            inner = re.sub(r'</?strong>', '', inner)
            inner = inner.strip()
            return f'\n{p} {inner}\n'
        text = re.sub(
            rf'<h{level}[^>]*>(.*?)</h{level}>',
            heading_replace,
            text,
            flags=re.DOTALL
        )

    # Step 5: Lists — convert <ul>/<ol> + <li> to Markdown
    def convert_list(match):
        list_html = match.group(0)
        is_ordered = list_html.strip().startswith('<ol')
        items = re.findall(r'<li[^>]*>(.*?)</li>', list_html, flags=re.DOTALL)
        result = '\n'
        for i, item in enumerate(items):
            item = item.strip()
            # Clean any remaining HTML in list items
            item = inline_html_to_md(item)
            if is_ordered:
                result += f'{i+1}. {item}\n'
            else:
                result += f'- {item}\n'
        return result + '\n'

    text = re.sub(r'<[ou]l[^>]*>.*?</[ou]l>', convert_list, text, flags=re.DOTALL)

    # Step 6: Paragraphs — unwrap <p> tags
    def para_replace(m):
        inner = m.group(1).strip()
        if not inner:
            return ''
        return f'\n{inner}\n'
    text = re.sub(r'<p[^>]*>(.*?)</p>', para_replace, text, flags=re.DOTALL)

    # Step 7: Inline HTML to Markdown
    text = inline_html_to_md(text)

    # Step 8: Replace YouTube placeholders with MDX components
    for i, url in enumerate(embeds['youtube']):
        text = text.replace(f'__YOUTUBE_EMBED_{i}__', f'<YouTubeEmbed url="{url}" />')

    # Step 9: Insert Instagram embeds
    # Place them after the first heading or first paragraph
    if embeds['instagram']:
        instagram_components = '\n\n'.join(
            f'<InstagramEmbed url="{url}" />' for url in embeds['instagram']
        )
        # Insert after the first paragraph following the first heading
        # Find the end of the first paragraph block
        first_para_match = re.search(r'^(## .+\n\n.+?\n)', text, re.MULTILINE | re.DOTALL)
        if first_para_match:
            insert_pos = first_para_match.end()
            text = text[:insert_pos] + '\n' + instagram_components + '\n' + text[insert_pos:]
        else:
            # Fallback: prepend
            text = instagram_components + '\n\n' + text

    # Step 10: Clean up whitespace
    # Remove excessive blank lines (more than 2 newlines → 2)
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()

    return text


def inline_html_to_md(text: str) -> str:
    """Convert inline HTML elements to Markdown equivalents."""

    # <strong> and <b> → **...**
    text = re.sub(r'<(?:strong|b)>(.*?)</(?:strong|b)>', r'**\1**', text, flags=re.DOTALL)

    # <em> and <i> → *...*
    text = re.sub(r'<(?:em|i)>(.*?)</(?:em|i)>', r'*\1*', text, flags=re.DOTALL)

    # <a href="url" ...>text</a> → [text](url)
    def link_replace(m):
        attrs = m.group(1)
        link_text = m.group(2)
        href_match = re.search(r'href="([^"]*)"', attrs)
        if href_match and href_match.group(1):
            return f'[{link_text}]({href_match.group(1)})'
        return link_text
    text = re.sub(r'<a\s+([^>]*)>(.*?)</a>', link_replace, text, flags=re.DOTALL)

    # <br> / <br/> → newline
    text = re.sub(r'<br\s*/?>', '\n', text)

    # Decode HTML entities
    text = html.unescape(text)

    # Strip any remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)

    return text


def extract_frontmatter(mdx_content: str) -> tuple[str, str]:
    """Extract frontmatter and body from MDX file."""
    match = re.match(r'^---\n(.*?)\n---\n?(.*)', mdx_content, flags=re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return '', mdx_content


def main():
    json_path = '/Users/noelyaxley/Downloads/mnt/blog_posts.json'
    project_root = '/Users/noelyaxley/upscalepm'

    # Load JSON
    with open(json_path) as f:
        posts = json.load(f)

    # Build slug → MDX path map
    mdx_files = {}
    for pattern in ['content/case-studies/*.mdx', 'content/insights/*.mdx']:
        for path in glob.glob(os.path.join(project_root, pattern)):
            slug = os.path.basename(path).replace('.mdx', '')
            mdx_files[slug] = path

    # Skip legal pages
    skip_slugs = {'terms-and-conditions', 'privacy-policy'}

    updated = 0
    skipped = []
    embed_stats = {'youtube': 0, 'instagram': 0}

    for post in posts:
        slug = post['slug']

        if slug in skip_slugs:
            continue

        if slug not in mdx_files:
            skipped.append(slug)
            continue

        mdx_path = mdx_files[slug]

        # Read existing MDX
        with open(mdx_path) as f:
            mdx_content = f.read()

        # Extract frontmatter
        frontmatter, _ = extract_frontmatter(mdx_content)

        if not frontmatter:
            print(f"  WARN: No frontmatter found in {mdx_path}")
            skipped.append(slug)
            continue

        # Extract embeds before conversion
        original_content = post['content_full']
        embeds = extract_embeds(original_content)

        if embeds['youtube']:
            embed_stats['youtube'] += len(embeds['youtube'])
            print(f"  YouTube: {slug} ({len(embeds['youtube'])} video(s))")
        if embeds['instagram']:
            embed_stats['instagram'] += len(embeds['instagram'])
            print(f"  Instagram: {slug} ({len(embeds['instagram'])} reel(s))")

        # Convert WordPress HTML to Markdown with embeds
        markdown_body = wp_html_to_markdown(original_content, embeds)

        # Reconstruct MDX file
        new_mdx = f"---\n{frontmatter}\n---\n\n{markdown_body}\n"

        # Write
        with open(mdx_path, 'w') as f:
            f.write(new_mdx)

        print(f"  OK: {slug}")
        updated += 1

    print(f"\nDone: {updated} files updated")
    print(f"Embeds: {embed_stats['youtube']} YouTube, {embed_stats['instagram']} Instagram")
    if skipped:
        print(f"Skipped (no MDX match): {skipped}")


if __name__ == '__main__':
    main()
