# Fix GitHub Pages - Show React App Instead of README

Your site at https://asilbek-exe.github.io/referat/ is showing the README instead of your React app.

## The Problem
GitHub Pages is currently set to "Deploy from a branch" which shows your README.md file. You need to change it to use "GitHub Actions" to deploy your built React app.

## Solution (Step by Step)

### Step 1: Commit and Push the Workflow File

First, make sure the workflow file is committed:

```bash
git add .github/workflows/deploy-frontend.yml
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### Step 2: Enable GitHub Actions for Pages ⚠️ CRITICAL

1. Go to your GitHub repository: https://github.com/asilbek-exe/referat
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **"Source"**, you'll see it's currently set to **"Deploy from a branch"**
5. **Change it to: "GitHub Actions"**
   - If "GitHub Actions" is grayed out or not available:
     - Go to **Settings** → **Actions** → **General**
     - Scroll to **"Workflow permissions"**
     - Select: **"Read and write permissions"**
     - Click **Save**
     - Go back to **Pages** settings
     - Now select **"GitHub Actions"**

### Step 3: Trigger the Workflow

**Option A: Manual Trigger (Recommended)**
1. Go to **Actions** tab in your repository
2. Click **"Deploy Frontend to GitHub Pages"** in the left sidebar
3. Click **"Run workflow"** button (top right)
4. Select branch: **main**
5. Click **"Run workflow"** (green button)
6. Wait 1-3 minutes for it to complete

**Option B: Push a Change**
```bash
# Make any small change to trigger the workflow
echo "# Updated" >> README.md
git add README.md
git commit -m "Trigger GitHub Pages deployment"
git push origin main
```

### Step 4: Verify Deployment

1. Go to **Actions** tab
2. Wait for the workflow to show a green checkmark ✅
3. Go to **Settings** → **Pages**
4. You should see: **"Your site is live at https://asilbek-exe.github.io/referat/"**
5. Wait 1-2 minutes, then visit: https://asilbek-exe.github.io/referat/#/login

### Step 5: Clear Browser Cache

If you still see the README:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or use incognito/private window
- Or wait 5-10 minutes for DNS cache to clear

## Expected Result

After successful deployment, visiting https://asilbek-exe.github.io/referat/ should:
- Show your React app (not README)
- Redirect to login page: https://asilbek-exe.github.io/referat/#/login
- Have working navigation with hash routes (#)

## If Workflow Fails

Check the **Actions** tab for errors:
- **TypeScript errors**: Fix all TS errors in frontend
- **Build errors**: Check `npm ci` and build logs
- **Permission errors**: Verify Pages permissions in Settings → Actions → General

## Quick Checklist

- [ ] Workflow file is committed and pushed
- [ ] Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- [ ] Workflow permissions are set to "Read and write"
- [ ] Workflow has run successfully (green checkmark)
- [ ] Waited 1-2 minutes after deployment
- [ ] Cleared browser cache or used incognito

## Your Site URLs

After deployment:
- **Home:** https://asilbek-exe.github.io/referat/
- **Login:** https://asilbek-exe.github.io/referat/#/login
- **Register:** https://asilbek-exe.github.io/referat/#/register
- **Dashboard:** https://asilbek-exe.github.io/referat/#/dashboard

Note: All URLs use `#` because of HashRouter (required for GitHub Pages).

