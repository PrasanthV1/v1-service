#!/usr/bin/env bash
set -euo pipefail

# deploy.sh
# Sync current project into the frontend/ folder of the target repository
# Usage:
#   GITHUB_TOKEN=ghp_xxx ./deploy.sh [branch]
# Default branch: main

BRANCH=${1:-main}
TARGET_REPO="https://github.com/PrasanthV1/v1-service.git"
TMPDIR=$(mktemp -d)

echo "Cloning ${TARGET_REPO} (branch: ${BRANCH}) into ${TMPDIR}..."
# shallow clone target branch
git clone --depth 1 --branch "${BRANCH}" "${TARGET_REPO}" "${TMPDIR}"

# Remove old frontend folder and copy new files
rm -rf "${TMPDIR}/frontend"
mkdir -p "${TMPDIR}/frontend"

# Use rsync to copy current project into target frontend folder
# Exclude .git to avoid nesting repos
rsync -av --delete --exclude='.git' ./ "${TMPDIR}/frontend/"

cd "${TMPDIR}"

git add frontend
if git diff --cached --quiet; then
  echo "No changes to deploy. Exiting."
else
  git commit -m "chore(frontend): sync frontend from local"
  if [ -z "${GITHUB_TOKEN:-}" ]; then
    echo "ERROR: GITHUB_TOKEN environment variable is not set. Cannot push to remote."
    exit 1
  fi
  echo "Pushing changes to ${BRANCH}..."
  # Push using token
  git push "https://${GITHUB_TOKEN}@github.com/PrasanthV1/v1-service.git" "HEAD:${BRANCH}"
  echo "Push complete."
fi

# Cleanup
cd - >/dev/null
rm -rf "${TMPDIR}"

echo "Done."
