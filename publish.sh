#!/bin/bash
# Commit and push any new or edited posts to deploy the site.
# Usage: ./publish.sh ["optional commit message"]

set -e
cd "$(dirname "$0")"

MSG="${1:-Update site}"

git add content/
git diff --cached --quiet && echo "No changes to publish." && exit 0
git commit -m "$MSG"
git push
echo "Published! Cloudflare Pages will deploy in ~1 minute."
