# ⚠️ URGENT: Restart ngrok Tunnel

## The Problem

Your ngrok tunnel is not responding (ERR_NGROK_6024). This means:
- ❌ The ngrok process stopped or expired
- ❌ The backend is not accessible through ngrok
- ❌ The frontend can't connect to the backend

## Quick Fix (Do This Now)

### Step 1: Check if Backend is Running

On your laptop, make sure backend is running:
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Keep this terminal open!**

### Step 2: Start ngrok in NEW Terminal

Open a **NEW terminal window** and run:
```bash
ngrok http 8000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:8000
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

**⚠️ IMPORTANT:** Keep this terminal open! If you close it, the tunnel stops.

### Step 3: Update GitHub Secret

1. Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
2. Click on `VITE_API_URL`
3. Click **"Update"**
4. Set value to: `https://YOUR_NEW_NGROK_URL/api/v1`
   - Example: `https://abc123.ngrok-free.app/api/v1`
5. Click **"Update secret"**

### Step 4: Rebuild Frontend

1. Go to: https://github.com/asilbek-exe/referat/actions
2. Click **"Deploy Frontend to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 2-3 minutes for completion

### Step 5: Test

1. Visit: https://asilbek-exe.github.io/referat/#/login
2. Try logging in
3. Should work now! ✅

## Important Notes

⚠️ **Free ngrok URLs change every time you restart ngrok!**

- Each time you run `ngrok http 8000`, you get a NEW URL
- You MUST update the GitHub secret with the new URL
- You MUST rebuild the frontend after updating the secret

## Keep ngrok Running

- **Don't close the ngrok terminal** - if you do, the tunnel stops
- **Keep backend running** - if it stops, ngrok can't forward requests
- **Both must run simultaneously**

## If ngrok Keeps Expiring

For a permanent solution:

1. **Sign up for ngrok account** (free): https://ngrok.com
2. **Get authtoken:**
   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```
3. **Use fixed domain** (if available on your plan)
4. **Or deploy backend to Railway/Render** for permanent HTTPS

## Troubleshooting

**"ngrok: command not found"**
- Install: `brew install ngrok/ngrok/ngrok`
- Or download from: https://ngrok.com/download

**"Port 8000 already in use"**
- Stop the existing backend: `Ctrl+C` in backend terminal
- Or use different port: `ngrok http 8001` (and update backend port)

**"Tunnel still not working"**
- Check backend is running: `curl http://localhost:8000/health`
- Check ngrok is running: Look at ngrok terminal
- Verify URL in GitHub secret matches ngrok URL

---

**After restarting ngrok and updating the secret, everything should work!** 🚀

