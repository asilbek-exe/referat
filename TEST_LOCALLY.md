# Test GitHub Pages Build Locally

This guide shows you how to test the GitHub Pages production build on your laptop with your local backend.

## Quick Steps

### 1. Start Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate
python run.py
```
✅ Backend running at: `http://localhost:8000`

### 2. Build & Preview Frontend (Terminal 2)
```bash
cd frontend
npm run preview:github
```
✅ Frontend preview at: `http://localhost:4173/referat/`

### 3. Open in Browser
- Go to: `http://localhost:4173/referat/`
- The app will connect to your local backend automatically
- URLs will use `#` (HashRouter) like: `http://localhost:4173/referat/#/dashboard`

## What This Does

- **Builds** the frontend exactly as it will be on GitHub Pages
- **Uses HashRouter** (URLs with `#`) - same as production
- **Base path** `/referat/` - matches your repository
- **Connects to** `http://localhost:8000` - your local backend

## Important Notes

✅ **Works locally**: The frontend will connect to `localhost:8000` automatically  
⚠️ **For real GitHub Pages**: You'll need to host your backend publicly (Railway, Render, etc.)

## Alternative: Regular Development

If you want normal development (clean URLs, no base path):
```bash
cd frontend
npm run dev
```
- Runs on: `http://localhost:3000`
- Clean URLs (no `#`)
- Still connects to `localhost:8000`

## Troubleshooting

**Backend not connecting:**
- Make sure backend is running on port 8000
- Check backend logs for CORS errors
- Verify CORS_ORIGINS includes `http://localhost:4173`

**404 on refresh:**
- Normal for HashRouter - use navigation links
- Or access with `#`: `http://localhost:4173/referat/#/login`

