#!/usr/bin/env python3
"""
Restore original WordPress blog content into existing MDX files.
Preserves frontmatter, replaces body with original wording converted to Markdown.
Reinstates YouTube and Instagram embeds as MDX components.
Inserts inline images at their original positions using local paths.
"""

import json
import os
import re
import glob
import html


# WordPress filename → local public path mapping (built from file-size matching)
WP_TO_LOCAL = {
    "06_231_Elizabeth_St_Awning-1536x1043-1.webp": "/images/case-studies/231-elizabeth-street/gallery-04.webp",
    "231-Elizabeth-Street-Sydney-1.jpg": "/images/case-studies/231-elizabeth-street/gallery-05.jpg",
    "231-Elizabeth-Street.jpg": "/images/case-studies/231-elizabeth-street/gallery-02.jpg",
    "231-elizabeth-street-sydney-fitout-nsw-sydney-shape-australia_1-1.jpg": "/images/case-studies/231-elizabeth-street/hero.jpg",
    "231-elizabeth-street-sydney-fitout-nsw-sydney-shape-australia_3.jpg": "/images/case-studies/231-elizabeth-street/gallery-01.jpg",
    "231-elizabeth-street-sydney-fitout-nsw-sydney-shape-australia_7.jpg": "/images/case-studies/231-elizabeth-street/gallery-03.jpg",
    "Boutique-Residential-Development-Feasibility.jpg": "/images/insights/boutique-residential/hero.jpg",
    "Calibre-3d.jpg": "/images/case-studies/calibre-cooper/gallery-03.jpg",
    "Calibre-Cooper-St-Upscale-02.jpg": "/images/case-studies/calibre-cooper/gallery-04.jpg",
    "Calibre-Cooper-St-Upscale-05.jpg": "/images/case-studies/calibre-cooper/gallery-02.jpg",
    "Calibre-Cooper-St-Upscale-07.jpg": "/images/case-studies/calibre-cooper/gallery-01.jpg",
    "Calibre-Cooper-St-Upscale-11.jpg": "/images/case-studies/calibre-cooper/hero.jpg",
    "Construction-Project-Management-01.jpg": "/images/case-studies/construction-pm/gallery-02.jpg",
    "Construction-Project-Management-02.jpg": "/images/case-studies/construction-pm/gallery-11.jpg",
    "Construction-Project-Management-03.jpg": "/images/case-studies/construction-pm/gallery-05.jpg",
    "Construction-Project-Management-04.jpg": "/images/case-studies/construction-pm/gallery-10.jpg",
    "Construction-Project-Management-05.jpg": "/images/case-studies/construction-pm/gallery-14.jpg",
    "Construction-Project-Management-06.jpg": "/images/case-studies/construction-pm/gallery-06.jpg",
    "Construction-Project-Management-07.jpg": "/images/case-studies/construction-pm/gallery-15.jpg",
    "Construction-Project-Management-08.jpg": "/images/case-studies/construction-pm/gallery-07.jpg",
    "Construction-Project-Management-09.jpg": "/images/case-studies/construction-pm/gallery-12.jpg",
    "Construction-Project-Management-10.jpg": "/images/case-studies/construction-pm/gallery-01.jpg",
    "Construction-Project-Management-11.jpg": "/images/case-studies/construction-pm/gallery-08.jpg",
    "Construction-Project-Management-12.jpg": "/images/case-studies/construction-pm/gallery-16.jpg",
    "Construction-Project-Management-13.jpg": "/images/case-studies/construction-pm/gallery-17.jpg",
    "Construction-Project-Management-14.jpg": "/images/case-studies/construction-pm/gallery-09.jpg",
    "Construction-Project-Management-15.jpg": "/images/case-studies/construction-pm/hero.jpg",
    "Construction-Project-Management-16.jpg": "/images/case-studies/construction-pm/gallery-04.jpg",
    "Construction-Project-Management-17.jpg": "/images/case-studies/construction-pm/gallery-03.jpg",
    "Construction-Project-Management-18.jpg": "/images/case-studies/construction-pm/gallery-13.jpg",
    "GP_DIGEERS_View02_Bar.jpg": "/images/case-studies/granville-diggers/hero.jpg",
    "Granville-Diggers-Commencement.jpg": "/images/insights/granville-diggers-commencement/hero.jpg",
    "Ground-anchors-and-license-access-deeds-e1758490591160.jpg": "/images/insights/ground-anchors/hero.jpg",
    "Health-Project-Management-01.jpg": "/images/case-studies/health-infrastructure/gallery-02.jpg",
    "Health-Project-Management-02.jpg": "/images/case-studies/health-infrastructure/gallery-01.jpg",
    "Health-Project-Management-03.jpg": "/images/case-studies/health-infrastructure/hero.jpg",
    "Mac-Park-01.jpg": "/images/case-studies/glass-house-macquarie-park/hero.jpg",
    "Mac-Park-02.jpg": "/images/case-studies/glass-house-macquarie-park/gallery-01.jpg",
    "Mac-Park-03.jpg": "/images/case-studies/glass-house-macquarie-park/gallery-02.jpg",
    "Mac-Park-09.jpg": "/images/case-studies/glass-house-macquarie-park/gallery-04.jpg",
    "Mac-Park-10.jpg": "/images/case-studies/glass-house-macquarie-park/gallery-03.jpg",
    "Mac-Park-12.jpg": "/images/case-studies/glass-house-macquarie-park/gallery-05.jpg",
    "Passion-for-Delivering-Projects.jpg": "/images/insights/passion-for-delivering/hero.jpg",
    "Project-Management-Delivery-Newcastle-01.jpg": "/images/case-studies/newcastle-fit-out/gallery-01.jpg",
    "Project-Management-Delivery-Newcastle-02.jpg": "/images/case-studies/newcastle-fit-out/hero.jpg",
    "Project-Management-Delivery-Newcastle-03.jpg": "/images/case-studies/newcastle-fit-out/gallery-02.jpg",
    "Resi-Const-04.jpg": "/images/case-studies/glass-house-macquarie-park/gallery-06.jpg",
    "Strategic-Rezoning-Planning-Proposal-Pete-Island-and-Mooney-Mooney-01.jpg": "/images/case-studies/pete-island/gallery-01.jpg",
    "Strategic-Rezoning-Planning-Proposal-Pete-Island-and-Mooney-Mooney-02-1.jpg": "/images/case-studies/pete-island/gallery-02.jpg",
    "Strategic-Rezoning-Planning-Proposal-Pete-Island-and-Mooney-Mooney-03.jpg": "/images/case-studies/pete-island/hero.jpg",
    "Vibe-01.jpg": "/images/case-studies/vibe-hotel/hero.jpg",
    "Vibe-02.jpg": "/images/case-studies/vibe-hotel/gallery-06.jpg",
    "Vibe-03-1.jpg": "/images/case-studies/vibe-hotel/gallery-05.jpg",
    "Vibe-06.jpg": "/images/case-studies/vibe-hotel/gallery-03.jpg",
    "Vibe-07.jpg": "/images/case-studies/vibe-hotel/gallery-02.jpg",
    "Vibe-08.jpg": "/images/case-studies/vibe-hotel/gallery-01.jpg",
    "Vibe-Encumbrance-10.jpg": "/images/case-studies/vibe-hotel/gallery-07.jpg",
    "Vibe-Encumbrance-11.jpg": "/images/case-studies/vibe-hotel/gallery-04.jpg",
    "Vibe-Encumbrance-13.jpg": "/images/case-studies/vibe-hotel/gallery-08.jpg",
    "balance-vs-purpose.jpg": "/images/insights/beyond-balance/hero.jpg",
    "inside-mba-bc3-contract-e1758198746665.jpg": "/images/insights/mba-bc3-contract/hero.jpg",
    "sydney-water-filtration-01-1.jpg": "/images/case-studies/sydney-water/gallery-01.jpg",
    "sydney-water-filtration-02-1.jpg": "/images/case-studies/sydney-water/gallery-04.jpg",
    "sydney-water-filtration-03-1.jpg": "/images/case-studies/sydney-water/hero.jpg",
    "sydney-water-filtration-04-1.jpg": "/images/case-studies/sydney-water/gallery-03.jpg",
}


def fix_newlines(content: str) -> str:
    """
    The JSON export replaced real newlines with literal 'n' characters.
    Restore them by replacing 'n' between HTML tags/comments with actual newlines.
    """
    text = re.sub(r'>(n+)<', lambda m: '>' + '\n' * len(m.group(1)) + '<', content)
    text = re.sub(r'^(n+)<', lambda m: '\n' * len(m.group(1)) + '<', text)
    text = re.sub(r'>(n+)$', lambda m: '>' + '\n' * len(m.group(1)), text)
    return text


def extract_embeds(content: str) -> dict:
    """Extract YouTube and Instagram embed URLs from WordPress content."""
    embeds = {'youtube': [], 'instagram': []}

    for m in re.finditer(r'wp:embed\s*\{[^}]*"url"\s*:\s*"([^"]*youtube[^"]*)"', content):
        embeds['youtube'].append(html.unescape(m.group(1)))
    for m in re.finditer(r'wp:embed\s*\{[^}]*"url"\s*:\s*"([^"]*youtu\.be[^"]*)"', content):
        embeds['youtube'].append(html.unescape(m.group(1)))

    reel_ids = set()
    for m in re.finditer(r'instagram\.com/reel/([^/?&"]+)', content):
        reel_ids.add(m.group(1))
    for reel_id in reel_ids:
        embeds['instagram'].append(f'https://www.instagram.com/reel/{reel_id}/')

    return embeds


def wp_filename_from_url(url: str) -> str:
    """Extract WordPress filename from a full wp-content URL."""
    # Handle both http and https, with or without www
    # URL pattern: .../wp-content/uploads/YYYY/MM/filename.jpg
    match = re.search(r'/([^/]+\.\w+)$', url)
    return match.group(1) if match else ''


def resolve_image_path(wp_url: str, hero_image: str) -> str | None:
    """
    Resolve a WordPress image URL to a local path.
    Returns None if image should be skipped (e.g., hero duplicate).
    """
    filename = wp_filename_from_url(wp_url)
    if not filename:
        return None

    local_path = WP_TO_LOCAL.get(filename)
    if not local_path:
        return None

    # Skip if this image is the hero (already rendered by the page template)
    if local_path == hero_image:
        return None

    return local_path


def wp_html_to_markdown(content: str, embeds: dict, hero_image: str) -> str:
    """Convert WordPress HTML content to clean Markdown with embed components and inline images."""

    # Step 0: Fix newlines
    content = fix_newlines(content)

    # Step 0.5: Remove Instagram blockquote embeds
    content = re.sub(
        r'<!-- wp:quote -->\s*<blockquote[^>]*>.*?</blockquote>\s*<!-- /wp:quote -->',
        '', content, flags=re.DOTALL
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
        youtube_placeholder, content, flags=re.DOTALL
    )

    # Step 0.7: Convert image figures to placeholders BEFORE stripping WP comments
    # Match: <!-- wp:image ... --><figure...><img src="URL" alt="ALT" .../></figure><!-- /wp:image -->
    # Also handle <!-- wp:gallery --> containing images
    def image_placeholder(m):
        figure_html = m.group(0)
        # Extract img src and alt
        img_match = re.search(r'<img\s+[^>]*src="([^"]*)"[^>]*>', figure_html)
        if not img_match:
            return ''
        src = img_match.group(1)
        alt_match = re.search(r'alt="([^"]*)"', img_match.group(0))
        alt = alt_match.group(1) if alt_match else ''

        local_path = resolve_image_path(src, hero_image)
        if local_path is None:
            return ''  # Skip (hero or unmapped)

        return f'\n\n![{alt}]({local_path})\n\n'

    # Handle individual image blocks
    content = re.sub(
        r'<!-- wp:image[^>]*-->\s*<figure[^>]*>.*?</figure>\s*<!-- /wp:image -->',
        image_placeholder, content, flags=re.DOTALL
    )

    # Handle gallery blocks — extract individual images from within
    def gallery_placeholder(m):
        gallery_html = m.group(0)
        result = ''
        for img_m in re.finditer(r'<figure[^>]*>\s*<img\s+[^>]*src="([^"]*)"[^>]*>\s*</figure>', gallery_html, re.DOTALL):
            src = img_m.group(1)
            alt_match = re.search(r'alt="([^"]*)"', img_m.group(0))
            alt = alt_match.group(1) if alt_match else ''
            local_path = resolve_image_path(src, hero_image)
            if local_path:
                result += f'\n\n![{alt}]({local_path})\n\n'
        return result

    content = re.sub(
        r'<!-- wp:gallery[^>]*-->\s*<figure[^>]*>.*?</figure>\s*<!-- /wp:gallery -->',
        gallery_placeholder, content, flags=re.DOTALL
    )

    # Step 1: Strip all WordPress block comments
    text = re.sub(r'<!--\s*/?wp:\w[^>]*?-->\s*', '', content)

    # Step 2: Strip any remaining <figure> blocks (unmapped images)
    text = re.sub(r'<figure[^>]*>.*?</figure>', '', text, flags=re.DOTALL)

    # Step 3: Handle separators / horizontal rules
    text = re.sub(r'<hr[^>]*/?\s*>', '\n---\n', text)

    # Step 4: Headings
    for level in range(6, 0, -1):
        prefix = '#' * level
        def heading_replace(m, p=prefix):
            inner = m.group(1)
            inner = re.sub(r'</?strong>', '', inner)
            inner = inner.strip()
            return f'\n{p} {inner}\n'
        text = re.sub(
            rf'<h{level}[^>]*>(.*?)</h{level}>',
            heading_replace, text, flags=re.DOTALL
        )

    # Step 5: Lists
    def convert_list(match):
        list_html = match.group(0)
        is_ordered = list_html.strip().startswith('<ol')
        items = re.findall(r'<li[^>]*>(.*?)</li>', list_html, flags=re.DOTALL)
        result = '\n'
        for i, item in enumerate(items):
            item = item.strip()
            item = inline_html_to_md(item)
            if is_ordered:
                result += f'{i+1}. {item}\n'
            else:
                result += f'- {item}\n'
        return result + '\n'
    text = re.sub(r'<[ou]l[^>]*>.*?</[ou]l>', convert_list, text, flags=re.DOTALL)

    # Step 6: Paragraphs
    def para_replace(m):
        inner = m.group(1).strip()
        if not inner:
            return ''
        return f'\n{inner}\n'
    text = re.sub(r'<p[^>]*>(.*?)</p>', para_replace, text, flags=re.DOTALL)

    # Step 7: Inline HTML to Markdown
    text = inline_html_to_md(text)

    # Step 8: Replace YouTube placeholders
    for i, url in enumerate(embeds['youtube']):
        text = text.replace(f'__YOUTUBE_EMBED_{i}__', f'<YouTubeEmbed url="{url}" />')

    # Step 9: Insert Instagram embeds after first paragraph
    if embeds['instagram']:
        instagram_components = '\n\n'.join(
            f'<InstagramEmbed url="{url}" />' for url in embeds['instagram']
        )
        first_para_match = re.search(r'^(## .+\n\n.+?\n)', text, re.MULTILINE | re.DOTALL)
        if first_para_match:
            insert_pos = first_para_match.end()
            text = text[:insert_pos] + '\n' + instagram_components + '\n' + text[insert_pos:]
        else:
            text = instagram_components + '\n\n' + text

    # Step 10: Clean up whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = text.strip()

    return text


def inline_html_to_md(text: str) -> str:
    """Convert inline HTML elements to Markdown equivalents."""
    text = re.sub(r'<(?:strong|b)>(.*?)</(?:strong|b)>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<(?:em|i)>(.*?)</(?:em|i)>', r'*\1*', text, flags=re.DOTALL)

    def link_replace(m):
        attrs = m.group(1)
        link_text = m.group(2)
        href_match = re.search(r'href="([^"]*)"', attrs)
        if href_match and href_match.group(1):
            return f'[{link_text}]({href_match.group(1)})'
        return link_text
    text = re.sub(r'<a\s+([^>]*)>(.*?)</a>', link_replace, text, flags=re.DOTALL)

    text = re.sub(r'<br\s*/?>', '\n', text)
    text = html.unescape(text)
    text = re.sub(r'<[^>]+>', '', text)
    return text


def extract_frontmatter(mdx_content: str) -> tuple[str, str]:
    """Extract frontmatter and body from MDX file."""
    match = re.match(r'^---\n(.*?)\n---\n?(.*)', mdx_content, flags=re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return '', mdx_content


def get_hero_image(frontmatter: str) -> str:
    """Extract heroImage path from frontmatter string."""
    match = re.search(r'heroImage:\s*"?([^\n"]+)"?', frontmatter)
    return match.group(1).strip() if match else ''


def main():
    json_path = '/Users/noelyaxley/Downloads/mnt/blog_posts.json'
    project_root = '/Users/noelyaxley/upscalepm'

    with open(json_path) as f:
        posts = json.load(f)

    mdx_files = {}
    for pattern in ['content/case-studies/*.mdx', 'content/insights/*.mdx']:
        for path in glob.glob(os.path.join(project_root, pattern)):
            slug = os.path.basename(path).replace('.mdx', '')
            mdx_files[slug] = path

    skip_slugs = {'terms-and-conditions', 'privacy-policy'}

    updated = 0
    skipped = []
    stats = {'youtube': 0, 'instagram': 0, 'images': 0}

    for post in posts:
        slug = post['slug']

        if slug in skip_slugs:
            continue

        if slug not in mdx_files:
            skipped.append(slug)
            continue

        mdx_path = mdx_files[slug]

        with open(mdx_path) as f:
            mdx_content = f.read()

        frontmatter, _ = extract_frontmatter(mdx_content)

        if not frontmatter:
            print(f"  WARN: No frontmatter found in {mdx_path}")
            skipped.append(slug)
            continue

        hero_image = get_hero_image(frontmatter)
        original_content = post['content_full']
        embeds = extract_embeds(original_content)

        if embeds['youtube']:
            stats['youtube'] += len(embeds['youtube'])
        if embeds['instagram']:
            stats['instagram'] += len(embeds['instagram'])

        # Convert with image support
        markdown_body = wp_html_to_markdown(original_content, embeds, hero_image)

        # Count images inserted
        img_count = len(re.findall(r'!\[', markdown_body))
        if img_count:
            stats['images'] += img_count
            print(f"  Images: {slug} ({img_count} inline)")

        if embeds['youtube']:
            print(f"  YouTube: {slug} ({len(embeds['youtube'])})")
        if embeds['instagram']:
            print(f"  Instagram: {slug} ({len(embeds['instagram'])})")

        new_mdx = f"---\n{frontmatter}\n---\n\n{markdown_body}\n"

        with open(mdx_path, 'w') as f:
            f.write(new_mdx)

        print(f"  OK: {slug}")
        updated += 1

    print(f"\nDone: {updated} files updated")
    print(f"Stats: {stats['images']} inline images, {stats['youtube']} YouTube, {stats['instagram']} Instagram")
    if skipped:
        print(f"Skipped: {skipped}")


if __name__ == '__main__':
    main()
