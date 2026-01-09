# Troubleshooting White Screen

## If you see a white screen at http://localhost:4173/referat/

### Step 1: Check Browser Console
Open browser DevTools (F12) and check the Console tab for errors.

### Step 2: Verify Build
```bash
cd frontend
npm run build:github
```

### Step 3: Check Preview Server
The preview server should serve from the base path. Try:
```bash
npm run preview:github
```

Then access: `http://localhost:4173/referat/`

### Step 4: Common Issues

**Assets not loading:**
- Check if paths in `dist/index.html` start with `/referat/`
- Verify `.nojekyll` exists in `dist/` folder

**JavaScript errors:**
- Check browser console
- Look for CORS errors
- Verify backend is running on port 8000

**Routing issues:**
- With HashRouter, URLs should have `#`: `http://localhost:4173/referat/#/login`
- Try accessing: `http://localhost:4173/referat/#/login` directly

### Step 5: Test with Simple Build
```bash
cd frontend
npm run build
npm run preview
```
Access: `http://localhost:4173/` (no base path)

If this works, the issue is with the base path configuration.

## GitHub Pages Still Showing README

### Check These:

1. **Pages Source Setting:**
   - Go to: Settings → Pages
   - Source must be: **"GitHub Actions"** (NOT "Deploy from a branch")

2. **Workflow Status:**
   - Go to: Actions tab
   - Check if "Deploy Frontend to GitHub Pages" workflow ran
   - Look for green checkmark (success) or red X (error)

3. **Manual Trigger:**
   - Go to: Actions → "Deploy Frontend to GitHub Pages"
   - Click: "Run workflow" → "Run workflow"
   - Wait for it to complete

4. **Verify Deployment:**
   - After workflow completes, go to: Settings → Pages
   - Should show: "Your site is live at https://yourusername.github.io/referat/"
   - Wait 1-2 minutes for DNS propagation

5. **Clear Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito/private window

### If Workflow Fails:

Check the error in Actions tab:
- **TypeScript errors:** Fix all TS errors
- **Build errors:** Check `npm ci` and build logs
- **Permission errors:** Verify Pages permissions in Settings

