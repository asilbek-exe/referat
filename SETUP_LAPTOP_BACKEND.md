# Setup: Backend on Your Laptop (Like Your Other Project)

This guide will help you set up the backend to run on your laptop so others can access it, just like your other project.

## Quick Setup

### Step 1: Start Backend on Your Laptop

**Option A: Use the helper script (easiest)**
```bash
cd backend
./start_server.sh
```

**Option B: Manual start**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The `--host 0.0.0.0` makes it accessible from other devices on your network.

### Step 2: Find Your IP Address

The script will show your IP, or find it manually:

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Linux:**
```bash
hostname -I
```

**Windows:**
```bash
ipconfig
```

You'll get something like: `192.168.1.100`

### Step 3: Set GitHub Secret

1. Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `VITE_API_URL`
4. Value: `http://YOUR_IP:8000/api/v1`
   - Example: `http://192.168.1.100:8000/api/v1`
5. Click **"Add secret"**

### Step 4: Re-run GitHub Actions

1. Go to: https://github.com/asilbek-exe/referat/actions
2. Click **"Deploy Frontend to GitHub Pages"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait for it to complete

### Step 5: Test

1. Visit: https://asilbek-exe.github.io/referat/#/login
2. The app should now connect to your laptop's backend!
3. Your friend can use it too (if on same network)

## Important Notes

✅ **CORS is configured** - Already allows all origins (like your other project)  
✅ **Backend accessible** - Using `--host 0.0.0.0` makes it reachable from network  
✅ **Auto-reload** - `--reload` flag for development

⚠️ **Requirements:**
- You and your friend must be on the same WiFi network
- Your laptop must stay on and connected
- Firewall must allow port 8000 (usually fine for local network)

## If IP Changes

If your IP address changes (e.g., you reconnect to WiFi):
1. Find your new IP
2. Update the `VITE_API_URL` secret in GitHub
3. Re-run GitHub Actions workflow

## Troubleshooting

**Friend can't connect:**
- Make sure you're on the same network
- Check firewall settings (allow port 8000)
- Verify backend is running: `curl http://YOUR_IP:8000/health`

**CORS errors:**
- Already configured to allow all origins
- If issues persist, check backend logs

**Connection refused:**
- Make sure backend is running with `--host 0.0.0.0`
- Check if port 8000 is in use: `lsof -i :8000`

## Alternative: Use ngrok (Works from Anywhere)

If you want it to work even when not on the same network:

1. Install ngrok: https://ngrok.com
2. Start backend: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
3. In another terminal: `ngrok http 8000`
4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. Set `VITE_API_URL` secret to: `https://abc123.ngrok.io/api/v1`
6. Re-run GitHub Actions

**Note:** Free ngrok URLs change each time you restart, so you'll need to update the secret.

## That's It!

Your backend now works just like your other project - running on your laptop, accessible to others! 🎉

