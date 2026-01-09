# FINAL FIX: Frontend Still Using localhost:8000

## The Problem

The frontend on GitHub Pages is still trying to connect to `localhost:8000` instead of `http://192.168.0.171:8000` because:
1. The GitHub secret `VITE_API_URL` was not set when the frontend was built
2. The built JavaScript files have `localhost:8000` hardcoded
3. You need to rebuild the frontend with the correct API URL

## Solution (3 Steps)

### Step 1: Set GitHub Secret (CRITICAL)

1. Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
2. Click **"New repository secret"** (or edit if it exists)
3. Name: `VITE_API_URL`
4. Value: `http://192.168.0.171:8000/api/v1` ⚠️ **EXACTLY THIS**
5. Click **"Add secret"** (or **"Update secret"**)

**Important:** 
- Use `http://` not `https://`
- Include `/api/v1` at the end
- Use your actual IP: `192.168.0.171`

### Step 2: Re-run GitHub Actions Workflow

1. Go to: https://github.com/asilbek-exe/referat/actions
2. Click **"Deploy Frontend to GitHub Pages"** (left sidebar)
3. Click **"Run workflow"** button (top right)
4. Select branch: **main**
5. Click **"Run workflow"** (green button)
6. **Wait for it to complete** (2-3 minutes)
7. Look for green checkmark ✅

### Step 3: Verify

1. Wait 1-2 minutes after workflow completes
2. Visit: https://asilbek-exe.github.io/referat/#/login
3. Open browser DevTools (F12) → Console tab
4. You should see:
   - ✅ `GET http://192.168.0.171:8000/health` (200 OK)
   - ✅ No more `localhost:8000` errors
   - ✅ Login should work!

## If It Still Doesn't Work

### Check 1: Verify Secret is Set
- Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
- Make sure `VITE_API_URL` exists and value is: `http://192.168.0.171:8000/api/v1`

### Check 2: Verify Backend is Running
```bash
# On your laptop, make sure backend is running:
cd backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Check 3: Test Backend Directly
- Visit: http://192.168.0.171:8000/health
- Should return: `{"status":"healthy"}`

### Check 4: Check Workflow Logs
- Go to: https://github.com/asilbek-exe/referat/actions
- Click on the latest workflow run
- Click on "Build" step
- Look for: `✅ Using API URL: http://192.168.0.171:8000/api/v1`
- If you see warning about VITE_API_URL not set, the secret wasn't set correctly

### Check 5: Clear Browser Cache
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Or use incognito/private window

## If Your IP Changes

If your laptop gets a new IP address:
1. Find new IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
2. Update GitHub secret `VITE_API_URL` with new IP
3. Re-run GitHub Actions workflow

## Quick Checklist

- [ ] GitHub secret `VITE_API_URL` is set to `http://192.168.0.171:8000/api/v1`
- [ ] Backend is running on your laptop with `--host 0.0.0.0`
- [ ] GitHub Actions workflow completed successfully (green ✅)
- [ ] Waited 1-2 minutes after deployment
- [ ] Cleared browser cache or used incognito
- [ ] Console shows `192.168.0.171:8000` not `localhost:8000`

## That's It!

After these steps, your friend should be able to use the app! 🎉

The frontend will connect to your laptop's backend at `192.168.0.171:8000` instead of `localhost:8000`.

