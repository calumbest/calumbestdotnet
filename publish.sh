#!/bin/bash
# Commit and push any new or edited posts to deploy the site.
# Usage: ./publish.sh ["optional commit message"]

set -e
cd "$(dirname "$0")"

MSG="${1:-Update site}"

# Stage non-post content (about page, etc.)
find content -maxdepth 1 -name "*.md" -exec git add {} \;

# For posts: only stage published ones; remove tracking from drafts
for f in content/posts/*.md; do
  [ -f "$f" ] || continue
  if grep -q "^draft: false" "$f"; then
    git add "$f"
  else
    # If this draft is currently tracked by git, remove it
    if git ls-files --error-unmatch "$f" 2>/dev/null; then
      git rm --cached "$f"
    fi
  fi
done

git diff --cached --quiet && echo "No changes to publish." && exit 0
git commit -m "$MSG"
git push
echo "Published! Cloudflare Pages will deploy in ~1 minute."
