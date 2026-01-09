# Solution: Backend Not Working on Friend's PC

## The Problem

Your friend can't use the app because:
- The frontend on GitHub Pages tries to connect to `localhost:8000`
- But the backend only runs on **your laptop**
- On your friend's PC, there's no backend running, so everything fails

## The Real Solution: Deploy Backend Online

You have **3 options**:

### Option 1: Deploy Backend to Railway (Easiest - Recommended)

**Steps:**
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will detect it's a Python app
6. Add environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `SECRET_KEY` - A random secret key (generate one)
   - `CORS_ORIGINS` - `["https://asilbek-exe.github.io"]`
7. Railway gives you a URL like: `https://your-app.railway.app`
8. Set GitHub secret:
   - Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
   - New secret: `VITE_API_URL` = `https://your-app.railway.app/api/v1`
9. Re-run GitHub Actions workflow

**Result:** Anyone can use your app from anywhere! ✅

### Option 2: Deploy Backend to Render

**Steps:**
1. Go to https://render.com
2. Sign up
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment: Python 3
6. Add environment variables (same as Railway)
7. Get your URL and set `VITE_API_URL` secret

### Option 3: Use Your Laptop as Server (Temporary Only)

**⚠️ Only works if:**
- You and your friend are on the same WiFi network
- Your laptop stays on
- Firewall allows port 8000

**Steps:**
1. Find your IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```
   Example: `192.168.1.100`

2. Start backend publicly:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

3. Update CORS in `backend/app/core/config.py`:
   ```python
   CORS_ORIGINS: List[str] = [
       "https://asilbek-exe.github.io",
       "http://localhost:3000",
   ]
   ```

4. Set GitHub secret `VITE_API_URL` = `http://YOUR_IP:8000/api/v1`

5. Re-run GitHub Actions

## What I Just Added

✅ **Backend Status Banner** - Shows a warning when backend is unavailable  
✅ **Better Error Messages** - Clear messages on login/register pages  
✅ **Health Check** - Automatically detects if backend is running

## Quick Test

After deploying backend online:
1. Set `VITE_API_URL` secret in GitHub
2. Re-run GitHub Actions workflow
3. Visit: https://asilbek-exe.github.io/referat/#/login
4. The backend status banner should disappear
5. Login should work!

## Recommended: Use Railway

Railway is the easiest:
- Free tier available
- Automatic deployments
- Easy environment variables
- Works immediately

**Time to set up:** ~10 minutes

See `BACKEND_API_SETUP.md` for detailed instructions.

