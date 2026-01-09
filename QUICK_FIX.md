# Quick Fix Guide

## Issue 1: White Screen at http://localhost:4173/referat/

### Solution:

**The problem:** With HashRouter, you need to access URLs with `#` in them.

**Try these URLs:**
1. `http://localhost:4173/referat/#/login` ← **Try this first!**
2. `http://localhost:4173/referat/#/register`
3. `http://localhost:4173/referat/#/dashboard`

**Steps:**
```bash
cd frontend
npm run preview:github
```

Then open: `http://localhost:4173/referat/#/login`

**If still white screen:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - are assets loading? (should see 200 status)
4. Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

---

## Issue 2: GitHub Pages Still Showing README

### Solution:

**CRITICAL:** You must change Pages source to "GitHub Actions"

1. Go to: **Settings** → **Pages**
2. Under **"Source"**, change from **"Deploy from a branch"** to **"GitHub Actions"**
3. If "GitHub Actions" is not available:
   - Go to: **Settings** → **Actions** → **General**
   - Under **"Workflow permissions"**, select: **"Read and write permissions"**
   - Save
   - Go back to **Pages** and select **"GitHub Actions"**

4. **Trigger the workflow:**
   - Go to: **Actions** tab
   - Click: **"Deploy Frontend to GitHub Pages"**
   - Click: **"Run workflow"** → **"Run workflow"**
   - Wait for green checkmark ✅ (1-3 minutes)

5. **Verify:**
   - Go to: **Settings** → **Pages**
   - Should show: **"Your site is live at https://yourusername.github.io/referat/"**
   - Wait 1-2 minutes, then visit the URL

**Your site URL will be:**
- `https://yourusername.github.io/referat/#/login`
- `https://yourusername.github.io/referat/#/dashboard`

Note: URLs use `#` because of HashRouter (required for GitHub Pages).

---

## Still Having Issues?

### For White Screen:
- Check browser console for errors
- Verify backend is running: `cd backend && uvicorn app.main:app --reload`
- Check CORS settings in `backend/app/core/config.py`

### For GitHub Pages:
- Check Actions tab for workflow errors
- Make sure workflow file exists: `.github/workflows/deploy-frontend.yml`
- Verify Pages source is set to "GitHub Actions" (not "Deploy from a branch")

