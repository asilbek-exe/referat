# Fix: ngrok Tunnel Expired or Not Responding

## The Problem

Your API is returning an ngrok HTML error page instead of JSON. This means:
- ❌ The ngrok tunnel has expired or stopped
- ❌ The backend is not accessible through the current ngrok URL
- ❌ The frontend can't connect to the backend

## Quick Fix

### Step 1: Check if ngrok is Running

On your laptop, check if ngrok is still running:
```bash
# Check if ngrok process is running
ps aux | grep ngrok
```

### Step 2: Restart ngrok

If ngrok is not running or expired:

1. **Make sure backend is running:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

2. **Start ngrok in a new terminal:**
   ```bash
   ngrok http 8000
   ```

3. **Copy the NEW HTTPS URL:**
   - You'll see something like: `https://abc123.ngrok-free.app`
   - **Note:** Free ngrok URLs change each time you restart!

### Step 3: Update GitHub Secret

1. Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
2. Click on `VITE_API_URL` secret
3. Click "Update"
4. Set new value: `https://YOUR_NEW_NGROK_URL/api/v1`
   - Example: `https://abc123.ngrok-free.app/api/v1`
5. Click "Update secret"

### Step 4: Rebuild Frontend

1. Go to: https://github.com/asilbek-exe/referat/actions
2. Click "Deploy Frontend to GitHub Pages"
3. Click "Run workflow" → "Run workflow"
4. Wait for completion (2-3 minutes)

## Better Solution: Use ngrok with Fixed Domain

To avoid this issue, sign up for ngrok and get a fixed domain:

1. **Sign up at:** https://ngrok.com (free tier available)
2. **Get your authtoken:**
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```
3. **Start ngrok with fixed domain:**
   ```bash
   ngrok http 8000 --domain=your-fixed-domain.ngrok-free.app
   ```
4. **Update GitHub secret** with the fixed domain
5. **Never expires!** (as long as you keep ngrok running)

## Alternative: Deploy Backend Online

For a permanent solution, deploy your backend to:
- **Railway** (https://railway.app) - Free tier
- **Render** (https://render.com) - Free tier
- **Fly.io** (https://fly.io) - Free tier

Then set `VITE_API_URL` to the permanent HTTPS URL.

## What I Fixed

✅ **HTML Response Detection** - Now detects when API returns HTML instead of JSON  
✅ **Better Error Messages** - Shows clear message when ngrok tunnel is down  
✅ **Graceful Handling** - Doesn't crash when backend returns HTML  
✅ **User Data Validation** - Validates user data before storing it

## After Fixing

1. Restart ngrok
2. Update GitHub secret with new URL
3. Rebuild frontend
4. Test login - should work now!

---

**Note:** Free ngrok URLs expire when you close ngrok. For production, either:
- Use ngrok with a fixed domain (requires account)
- Deploy backend to Railway/Render (permanent solution)

