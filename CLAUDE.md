# calumbest.net

Personal blog built with Hugo, hosted on Cloudflare Pages.

## Quick Reference

| What | Where |
|---|---|
| Site config | `hugo.toml` |
| Layouts | `layouts/_default/` |
| CSS | `static/css/style.css` |
| Sidenotes JS | `static/js/sidenotes.js` |
| Copy-as-Markdown JS | `static/js/copy-markdown.js` |
| Blog posts | `content/posts/` (symlink to `~/Documents/Notes/Blog/`) |
| About page | `content/about.md` |
| New post template | `archetypes/default.md` |
| Deploy config | `.github/workflows/deploy.yml` |

## How Posts Work

Posts are Markdown files in `~/Documents/Notes/Blog/` (symlinked to `content/posts/`). They are written and edited in Obsidian.

### Frontmatter

Every post needs this frontmatter:

```yaml
---
title: "Post Title"
date: 2026-04-12
draft: true       # true = hidden from site, false = published
description: "Brief description for homepage and meta tags"
slug: "url-slug"  # optional, defaults to filename
---
```

- Set `draft: false` to publish
- Hugo auto-detects "last edited" date from git commit history (`enableGitInfo = true` in hugo.toml)
- Posts are sorted by `date` (newest first) on the homepage

### Footnotes → Sidenotes

Write standard Markdown footnotes in posts:

```markdown
Some text.[^1]

[^1]: This becomes a sidenote on wide screens.
```

The `sidenotes.js` script converts these to right-margin sidenotes on viewports >= 1040px. On narrow screens they remain as standard footnotes at the bottom.

## How to Change Things

### Change the font
1. Edit the Google Fonts `<link>` in `layouts/_default/baseof.html`
2. Update `--font-body` in `static/css/style.css` (`:root` block, line ~15)

### Change colors
Edit the CSS custom properties in `:root` in `static/css/style.css`. Key variables:
- `--color-text`: Main text color
- `--color-link`: Link color
- `--color-bg`: Background color
- `--color-border`: Border/separator color

### Add a new standalone page
1. Create `content/pagename.md` with frontmatter `layout: "page"`
2. Add a nav link in `layouts/_default/baseof.html` inside the `<nav>` element

### Change the homepage layout
Edit `layouts/_default/home.html`. It lists posts from the `posts` section sorted by date.

### Change post layout
Edit `layouts/_default/single.html`. This controls individual post pages — title, date, content, copy button, and prev/next nav.

## How Sidenotes Work (Technical)

`static/js/sidenotes.js` runs on post pages:
1. Finds all `<a class="footnote-ref">` elements (Hugo's footnote output)
2. Finds the matching `<li>` in the `<section class="footnotes">` at page bottom
3. Creates `.sidenote` `<span>` elements absolutely positioned in the right margin
4. Adds `has-sidenotes` class to `.post-content` (hides original footnotes, enables positioning)
5. Handles vertical stacking to prevent overlap between adjacent sidenotes
6. Recalculates on window resize; removes sidenotes below 1040px breakpoint

## Copy as Markdown

Hugo generates a companion `index.md` file for each post (configured via `outputFormats.markdown` in hugo.toml). The "Copy as Markdown" button in `single.html` fetches this file and copies it to the clipboard.

## Local Development

```bash
# Start dev server (includes draft posts)
hugo server -D

# Build for production
hugo --minify
```

The dev server runs at http://localhost:1313 with live reload.

## Deployment

Push to `main` on GitHub → Cloudflare Pages auto-builds with `hugo --minify` and deploys to calumbest.net.

The GitHub Actions workflow is in `.github/workflows/deploy.yml`.

## File Structure

```
├── archetypes/default.md          # New post template
├── content/
│   ├── posts/ → ~/Documents/Notes/Blog/
│   └── about.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html            # HTML skeleton, head, nav, footer
│   │   ├── home.html              # Homepage post list
│   │   ├── list.html              # Section list pages
│   │   ├── single.html            # Individual post page
│   │   └── single.markdown.md     # Raw markdown output template
│   └── page/
│       └── single.html            # Standalone pages (about, etc.)
├── static/
│   ├── css/style.css
│   └── js/
│       ├── sidenotes.js
│       └── copy-markdown.js
├── hugo.toml                      # Site configuration
└── CLAUDE.md                      # This file
```
