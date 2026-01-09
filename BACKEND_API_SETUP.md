# Backend API Setup for GitHub Pages

## The Problem

When someone visits your GitHub Pages site (https://asilbek-exe.github.io/referat/), the frontend tries to connect to `localhost:8000` to reach the backend API. This only works on **your laptop** where the backend is running.

On other people's computers, they get:
```
ERR_CONNECTION_REFUSED
Failed to load resource: net::ERR_CONNECTION_REFUSED
```

## Solutions

### Option 1: Host the Backend Online (Recommended for Production)

Deploy your FastAPI backend to a cloud service so it's accessible from anywhere:

**Free Options:**
- **Railway** (https://railway.app) - Free tier available
- **Render** (https://render.com) - Free tier available
- **Fly.io** (https://fly.io) - Free tier available
- **PythonAnywhere** (https://www.pythonanywhere.com) - Free tier available

**Steps:**
1. Deploy your backend to one of these services
2. Get your backend URL (e.g., `https://your-app.railway.app`)
3. Set GitHub secret:
   - Go to: https://github.com/asilbek-exe/referat/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.com/api/v1`
   - Click **"Add secret"**
4. Re-run the GitHub Actions workflow to rebuild with the new API URL

### Option 2: Use Your Laptop as Backend Server (For Testing)

If you want others to test the app and you're okay running the backend on your laptop:

1. **Find your local IP address:**
   ```bash
   # Mac/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```
   You'll get something like: `192.168.1.100`

2. **Start backend with public access:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

3. **Update CORS in backend:**
   - Edit `backend/app/core/config.py`
   - Add your GitHub Pages URL to `CORS_ORIGINS`:
     ```python
     CORS_ORIGINS: List[str] = [
         "https://asilbek-exe.github.io",
         "http://localhost:3000",
         "http://localhost:4173",
     ]
     ```

4. **Set GitHub secret:**
   - Name: `VITE_API_URL`
   - Value: `http://YOUR_IP:8000/api/v1` (e.g., `http://192.168.1.100:8000/api/v1`)
   - **Note:** This only works if your friend is on the same network

5. **Re-run GitHub Actions workflow**

**⚠️ WARNING:** This only works if:
- Your laptop and your friend's PC are on the same network
- Your firewall allows incoming connections on port 8000
- Your laptop stays on and connected

### Option 3: Local Development Only

If you only want to use this locally:

1. Clone the repo on your friend's PC
2. Start the backend: `cd backend && uvicorn app.main:app --reload`
3. Start the frontend: `cd frontend && npm run dev`
4. Access: `http://localhost:3000`

## Current Configuration

The frontend is configured to:
- **Production (GitHub Pages):** Use `VITE_API_URL` from GitHub secrets (or empty if not set)
- **Local Development:** Default to `http://localhost:8000/api/v1`

## Quick Fix for Testing

If you just want to test quickly with your friend:

1. Make sure backend is running on your laptop
2. Find your IP: `ifconfig | grep "inet " | grep -v 127.0.0.1`
3. Share your IP with your friend
4. Your friend can temporarily modify the API URL in browser console:
   ```javascript
   localStorage.setItem('api_url', 'http://YOUR_IP:8000/api/v1')
   ```
   (This is a temporary workaround, not recommended for production)

## Recommended: Deploy Backend to Railway/Render

**Railway Example:**
1. Sign up at https://railway.app
2. Create new project → Deploy from GitHub repo
3. Select your backend folder
4. Add environment variables (DATABASE_URL, SECRET_KEY, etc.)
5. Railway gives you a URL like: `https://your-app.railway.app`
6. Set `VITE_API_URL` secret to: `https://your-app.railway.app/api/v1`

This way, anyone can use your app without needing the backend running locally!

