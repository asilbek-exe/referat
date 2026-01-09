# GitHub Pages Setup Instructions

## Why You're Seeing README Instead of Website

GitHub Pages is currently showing your README because:
1. **Pages source is set to "Deploy from a branch"** instead of **"GitHub Actions"**
2. Or the workflow hasn't run successfully yet

## Fix Steps

### 1. Enable GitHub Actions as Source

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select: **"GitHub Actions"** (NOT "Deploy from a branch")
4. Save

### 2. Verify Workflow File Exists

Make sure `.github/workflows/deploy-frontend.yml` exists in your repository.

### 3. Trigger Deployment

**Option A: Push to main branch**
```bash
git add .
git commit -m "Fix GitHub Pages deployment"
git push origin main
```

**Option B: Manual trigger**
1. Go to **Actions** tab
2. Select **"Deploy Frontend to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**

### 4. Wait for Deployment

- Go to **Actions** tab
- Wait for the workflow to complete (green checkmark)
- Your site will be at: `https://yourusername.github.io/referat/`

## Verify It's Working

After deployment completes:
1. Go to **Settings** → **Pages**
2. You should see: **"Your site is live at https://yourusername.github.io/referat/"**
3. Visit that URL - you should see your React app, not the README

## Troubleshooting

**Still seeing README:**
- Make sure Pages source is set to **"GitHub Actions"** (not branch)
- Check Actions tab for workflow errors
- Verify the workflow completed successfully

**404 errors:**
- Make sure you're using HashRouter (configured in workflow)
- URLs should have `#`: `https://yourusername.github.io/referat/#/dashboard`

**Workflow fails:**
- Check the Actions tab for error messages
- Make sure all TypeScript errors are fixed
- Verify `frontend/package.json` has correct scripts

## Repository Name

If your repository is NOT named `referat`, update:
- `.github/workflows/deploy-frontend.yml` - `VITE_BASE_PATH`
- `frontend/package.json` - `build:github` script

Replace `/referat/` with `/{your-repo-name}/`

