#!/bin/bash
# Auto-publish: runs daily at 4am via launchd.
# Commits and pushes any changes to the website repo.

set -e
cd "$(dirname "$0")"

# Only proceed if there are actual changes
git add -A
git diff --cached --quiet && exit 0

# Build a commit message from changed files
CHANGED=$(git diff --cached --name-only | sed 's|content/posts/||' | sed 's|\.md$||' | tr '\n' ', ' | sed 's/, $//')
git commit -m "Update posts: ${CHANGED}"
git push
