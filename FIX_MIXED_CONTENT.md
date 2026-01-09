# 🔒 Fix: Mixed Content Blocked (HTTP/HTTPS Issue)

## The Problem

Your GitHub Pages site is served over **HTTPS** (`https://asilbek-exe.github.io`), but your backend is on **HTTP** (`http://192.168.0.171:8000`).

Modern browsers **block** HTTP requests from HTTPS pages for security. This is called "Mixed Content" blocking.

## Solutions

### Option 1: Use ngrok (Easiest - Recommended) ⭐

ngrok creates an HTTPS tunnel to your local backend.

**Steps:**

1. **Install ngrok:**
   ```bash
   # Mac (using Homebrew)
   brew install ngrok/ngrok/ngrok
   
   # Or download from: https://ngrok.com/download
   ```

2. **Start your backend:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

3. **In another terminal, start ngrok:**
   ```bash
   ngrok http 8000
   ```

4. **Copy the HTTPS URL:**
   - You'll see something like: `https://abc123.ngrok-free.app`
   - Copy this URL

5. **Set GitHub Secret:**
   - Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
   - Update `VITE_API_URL` to: `https://abc123.ngrok-free.app/api/v1`
   - (Replace `abc123.ngrok-free.app` with your actual ngrok URL)

6. **Rebuild frontend:**
   - Go to: https://github.com/asilbek-exe/referat/actions
   - Run "Deploy Frontend to GitHub Pages" workflow

**Note:** Free ngrok URLs change each time you restart. For a permanent URL, sign up for ngrok account (free tier available).

### Option 2: Deploy Backend to Railway/Render (Best for Production)

These services provide HTTPS automatically.

**Railway:**
1. Deploy backend to Railway
2. Get HTTPS URL: `https://your-app.railway.app`
3. Set `VITE_API_URL` = `https://your-app.railway.app/api/v1`

**Render:**
1. Deploy backend to Render
2. Get HTTPS URL: `https://your-app.onrender.com`
3. Set `VITE_API_URL` = `https://your-app.onrender.com/api/v1`

### Option 3: Use Cloudflare Tunnel (Free, Permanent)

1. Sign up at: https://cloudflare.com
2. Install `cloudflared`: `brew install cloudflare/cloudflare/cloudflared`
3. Run: `cloudflared tunnel --url http://localhost:8000`
4. Get HTTPS URL and set as `VITE_API_URL`

### Option 4: Use localtunnel (Free, Simple)

```bash
# Install
npm install -g localtunnel

# Start backend
uvicorn app.main:app --host 0.0.0.0 --port 8000

# In another terminal
lt --port 8000
# Copy the HTTPS URL and set as VITE_API_URL
```

## Quick Fix: Use ngrok Now

**Right now, do this:**

1. **Install ngrok:**
   ```bash
   brew install ngrok/ngrok/ngrok
   ```

2. **Start ngrok (while backend is running):**
   ```bash
   ngrok http 8000
   ```

3. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

4. **Update GitHub Secret:**
   - Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
   - Edit `VITE_API_URL`
   - Set to: `https://YOUR_NGROK_URL/api/v1`
   - Save

5. **Rebuild frontend:**
   - Go to: https://github.com/asilbek-exe/referat/actions
   - Run workflow

## Why This Happens

- GitHub Pages = HTTPS (secure)
- Your laptop backend = HTTP (not secure)
- Browsers block HTTP from HTTPS pages = Mixed Content Block

## After Fixing

✅ Frontend (HTTPS) → Backend (HTTPS via ngrok) = Works!  
✅ No more mixed content errors  
✅ Your friend can use the app!

## Important Notes

- **ngrok free tier:** URL changes each restart (sign up for permanent URL)
- **Keep ngrok running:** If you close it, the URL stops working
- **For production:** Deploy backend to Railway/Render for permanent HTTPS

---

**Use ngrok now - it's the fastest solution!** 🚀

