# ⚠️ URGENT: Fix Frontend Using localhost Instead of Your IP

## The Problem

Your frontend on GitHub Pages is hardcoded to use `localhost:8000` because it was built **before** you set the GitHub secret. The built JavaScript files have `localhost` baked in.

## The Fix (Do This Now)

### Step 1: Set GitHub Secret (MUST DO FIRST)

1. **Go to:** https://github.com/asilbek-exe/referat/settings/secrets/actions
2. **Click:** "New repository secret" (or edit existing)
3. **Name:** `VITE_API_URL`
4. **Value:** `http://192.168.0.171:8000/api/v1`
   - ⚠️ **EXACTLY** this format
   - Use `http://` not `https://`
   - Include `/api/v1` at the end
5. **Click:** "Add secret" (or "Update secret")

### Step 2: Rebuild Frontend

1. **Go to:** https://github.com/asilbek-exe/referat/actions
2. **Click:** "Deploy Frontend to GitHub Pages"
3. **Click:** "Run workflow" → "Run workflow"
4. **Wait:** 2-3 minutes for green ✅

### Step 3: Test

1. **Wait** 1-2 minutes after workflow completes
2. **Visit:** https://asilbek-exe.github.io/referat/#/login
3. **Open Console** (F12) → Should see `192.168.0.171:8000` NOT `localhost:8000`
4. **Login** should work!

## Why This Happens

- Vite builds environment variables **into** the JavaScript files at build time
- If `VITE_API_URL` wasn't set when you built, it defaults to `localhost:8000`
- You MUST rebuild after setting the secret

## Verification

After rebuilding, check the built files:
1. Go to Actions → Latest workflow run
2. Click "Build" step
3. Look for: `✅ Using API URL: http://192.168.0.171:8000/api/v1`
4. If you see a warning, the secret wasn't set correctly

## Quick Checklist

- [ ] Secret `VITE_API_URL` = `http://192.168.0.171:8000/api/v1`
- [ ] Backend running: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
- [ ] Workflow completed (green ✅)
- [ ] Waited 2 minutes after deployment
- [ ] Cleared browser cache (Cmd+Shift+R)
- [ ] Console shows `192.168.0.171` not `localhost`

## If Still Not Working

**Check backend is accessible:**
```bash
# From your friend's PC, test:
curl http://192.168.0.171:8000/health
# Should return: {"status":"healthy"}
```

**Check firewall:**
- Make sure port 8000 is open on your laptop
- Try disabling firewall temporarily to test

**Check network:**
- You and friend must be on same WiFi
- Try pinging: `ping 192.168.0.171` (from friend's PC)

---

**After setting the secret and rebuilding, it WILL work!** ✅

