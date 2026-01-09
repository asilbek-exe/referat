# Local Testing Guide

This guide explains how to test the GitHub Pages build locally on your laptop.

## Quick Start

1. **Start your backend** (in one terminal):
   ```bash
   cd backend
   source venv/bin/activate
   python run.py
   ```
   Backend will run on: `http://localhost:8000`

2. **Build and preview the production frontend** (in another terminal):
   ```bash
   cd frontend
   npm run preview:github
   ```
   This will:
   - Build the frontend with GitHub Pages configuration
   - Start a preview server
   - Open at: `http://localhost:4173/referat/`

3. **Access the app**:
   - Open: `http://localhost:4173/referat/`
   - The app will connect to your local backend at `http://localhost:8000`

## Available Scripts

### Development Mode (Normal)
```bash
npm run dev
```
- Runs on: `http://localhost:3000`
- Uses BrowserRouter (clean URLs)
- Connects to: `http://localhost:8000/api/v1`

### Production Preview (GitHub Pages Build)
```bash
npm run preview:github
```
- Builds with GitHub Pages settings
- Runs on: `http://localhost:4173/referat/`
- Uses HashRouter (URLs with `#`)
- Connects to: `http://localhost:8000/api/v1`

### Manual Build
```bash
npm run build:github
npm run preview
```
- Build first, then preview
- Preview will use the built files

## Important Notes

### API Connection
- The frontend will **always connect to `http://localhost:8000`** when testing locally
- This is set in `src/api/client.ts` as the default
- For actual GitHub Pages deployment, you'll need to:
  1. Host your backend publicly (Railway, Render, etc.)
  2. Set `VITE_API_URL` secret in GitHub Actions

### URL Structure
When testing the GitHub Pages build locally:
- URLs will have `#` in them: `http://localhost:4173/referat/#/dashboard`
- This matches how GitHub Pages will work
- The base path `/referat/` matches your repository name

### Backend CORS
Make sure your backend allows requests from the preview server:
```python
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:4173",  # Vite preview server
    "http://localhost:5173",  # Alternative Vite port
]
```

## Troubleshooting

**Can't connect to backend:**
- Make sure backend is running on port 8000
- Check backend CORS settings
- Verify no firewall blocking localhost connections

**404 errors on refresh:**
- This is normal for HashRouter - use the navigation links
- Or access URLs directly with `#`: `http://localhost:4173/referat/#/login`

**Build errors:**
- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run build` (without github flag first)

