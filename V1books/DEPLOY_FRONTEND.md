Deploy the Frontend to GitHub repository

Target repo: https://github.com/PrasanthV1/v1-service.git

This document explains how to add or update the frontend (this project) into the `v1-service` repository.

1) Prepare local repo (run from project root where this README is):

```bash
# initialize git if not already
git init
git remote add origin https://github.com/PrasanthV1/v1-service.git

# add all frontend files
git add .

# commit
git commit -m "chore(frontend): add/update V1Books frontend"

# push to main (or create branch first)
git branch -M main
git push -u origin main
```

2) If you already have the remote and need to add frontend into a subfolder `frontend/` in the repo:

```bash
# create a folder and copy files there, or from outside the existing repo
mkdir -p ../v1-service/frontend
cp -r . ../v1-service/frontend/
cd ../v1-service

git add frontend
git commit -m "feat(frontend): add frontend files"
git push
```

3) If you prefer using a separate branch:

```bash
git checkout -b feature/add-frontend
git add .
git commit -m "feat(frontend): add frontend"
git push -u origin feature/add-frontend
# open a PR on GitHub to merge into main
```

4) Notes on authentication
- Use a Personal Access Token (PAT) if pushing from CI or an environment without interactive login.
- PAT requires `repo` scope for private repos, or `public_repo` for public repos.

5) Optional: use the small backup mechanism in `register.html`
- The page can save user JSON files directly to the configured repo via the GitHub API if you store `github_owner`, `github_repo`, and `github_token` in browser `localStorage` (not secure for production).
- For production, create a backend endpoint to store users safely and perform GitHub commits server-side with a secure secret.

If you want I can:
- Add a `deploy.sh` script to automate push. (Added)
- Create a CI workflow (GitHub Actions) to deploy the `frontend/` folder automatically. (Added: `.github/workflows/deploy_frontend.yml`)

Local deploy using `deploy.sh`:

```bash
# from project root
GITHUB_TOKEN=ghp_xxx ./deploy.sh main
```

Notes for GitHub Actions workflow:
- Add a repository secret named `PERSONAL_ACCESS_TOKEN` with a PAT that has `repo` scope.
- Trigger the workflow manually from the Actions tab or push to `main` in this repo.

Build/minify behavior
- The workflow will attempt to build your frontend before syncing:
	- If `source/package.json` exists, the workflow runs `npm ci` and will run `npm run build` if a `build` script is available. It then copies `build/` or `dist/` into `target/frontend/`.
	- If no `package.json` is present, the workflow performs a best-effort minify using `npx html-minifier-terser` and copies the `source/` files into `target/frontend/`.

Recommendations
- If your frontend uses a build step, add a `build` script in `package.json` that outputs to `build/` or `dist/` for best results.
- Ensure the `PERSONAL_ACCESS_TOKEN` secret has `repo` scope when pushing to the target repository.
