# Quick Fix: Backend API Connection Issue

## The Problem

Your friend sees this error when trying to use your GitHub Pages site:
```
ERR_CONNECTION_REFUSED
Failed to load resource: net::ERR_CONNECTION_REFUSED
localhost:8000/api/v1/auth/login
```

**Why?** The frontend is trying to connect to `localhost:8000`, but the backend only runs on **your laptop**.

## Quick Solutions

### Option 1: Deploy Backend Online (Best for Production)

**Recommended Services (Free):**
1. **Railway** - https://railway.app
2. **Render** - https://render.com
3. **Fly.io** - https://fly.io

**Steps:**
1. Deploy backend to one of these services
2. Get your backend URL (e.g., `https://your-app.railway.app`)
3. Set GitHub secret:
   - Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.com/api/v1`
   - Save
4. Re-run GitHub Actions workflow

### Option 2: Temporary Testing (Same Network Only)

If you and your friend are on the same WiFi:

1. **Find your IP:**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows  
   ipconfig
   ```
   Example: `192.168.1.100`

2. **Start backend publicly:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

3. **Update CORS** in `backend/app/core/config.py`:
   ```python
   CORS_ORIGINS: List[str] = [
       "https://asilbek-exe.github.io",
       "http://localhost:3000",
       "http://localhost:4173",
   ]
   ```

4. **Set GitHub secret:**
   - Name: `VITE_API_URL`
   - Value: `http://YOUR_IP:8000/api/v1`
   - Example: `http://192.168.1.100:8000/api/v1`

5. **Re-run GitHub Actions**

**⚠️ Note:** Only works if:
- Same network
- Firewall allows port 8000
- Your laptop stays on

### Option 3: Local Development

For local testing, your friend should:
1. Clone the repo
2. Start backend: `cd backend && uvicorn app.main:app --reload`
3. Start frontend: `cd frontend && npm run dev`
4. Access: `http://localhost:3000`

## What I Fixed

✅ Better error messages when API is unavailable  
✅ Updated workflow to not use localhost as fallback  
✅ Fixed vite.svg 404 error  
✅ Added connection error handling in Login/Register pages

## Next Steps

1. **For production:** Deploy backend to Railway/Render (see BACKEND_API_SETUP.md)
2. **For testing:** Use Option 2 if on same network
3. **For development:** Use Option 3 for local setup

See `BACKEND_API_SETUP.md` for detailed instructions.

