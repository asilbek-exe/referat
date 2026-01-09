# Fix GitHub Pages Showing README

## The Problem
GitHub Pages is showing your README file instead of your React app.

## Solution

### Step 1: Check Pages Source Setting ⚠️ CRITICAL

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **"Source"**, you MUST see: **"Deploy from a branch"** or **"GitHub Actions"**

**If it says "Deploy from a branch":**
- Change it to: **"GitHub Actions"**
- If "GitHub Actions" is not available, you need to:
  1. Go to **Settings** → **Actions** → **General**
  2. Under **"Workflow permissions"**, select: **"Read and write permissions"**
  3. Save
  4. Go back to **Pages** settings
  5. Now select **"GitHub Actions"**

### Step 2: Verify Workflow File Exists

Make sure this file exists:
```
.github/workflows/deploy-frontend.yml
```

### Step 3: Trigger the Workflow

**Option A: Push to main**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

**Option B: Manual trigger**
1. Go to **Actions** tab
2. Click **"Deploy Frontend to GitHub Pages"** (left sidebar)
3. Click **"Run workflow"** button (top right)
4. Select branch: **main**
5. Click **"Run workflow"**

### Step 4: Wait for Deployment

1. Go to **Actions** tab
2. Click on the running workflow
3. Wait for it to complete (green checkmark ✅)
4. This takes 1-3 minutes

### Step 5: Verify

1. Go to **Settings** → **Pages**
2. You should see: **"Your site is live at https://yourusername.github.io/referat/"**
3. Click the link or wait 1-2 minutes
4. You should see your React app (not README)

## If Still Not Working

### Check Workflow Logs
1. Go to **Actions** tab
2. Click on the latest workflow run
3. Check for red ❌ errors
4. Click on the failed step to see error details

### Common Errors

**"Workflow permissions" error:**
- Go to: Settings → Actions → General
- Set: "Read and write permissions"
- Save and retry

**"No such file or directory" error:**
- Make sure `frontend/package.json` exists
- Verify workflow file path is correct

**Build errors:**
- Check TypeScript errors are fixed
- Verify all dependencies are in `package.json`

### Clear Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or use incognito/private window

## Your Site URL

After successful deployment:
- **URL:** `https://yourusername.github.io/referat/`
- **Login:** `https://yourusername.github.io/referat/#/login`
- **Dashboard:** `https://yourusername.github.io/referat/#/dashboard`

Note: URLs use `#` because of HashRouter (required for GitHub Pages).

