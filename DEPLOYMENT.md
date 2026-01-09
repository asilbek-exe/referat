# GitHub Pages Deployment Guide

This guide explains how to deploy the frontend to GitHub Pages.

## Prerequisites

1. A GitHub repository
2. GitHub Actions enabled
3. GitHub Pages enabled in repository settings

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Configure Repository Name

If your repository name is different from `Nasiba-holajon`, update the base path:

1. Edit `.github/workflows/deploy-frontend.yml`
2. Change `VITE_BASE_PATH: /Nasiba-holajon/` to match your repository name
3. Update `frontend/package.json` script `build:github` with the same path

### 3. Set API URL (Optional)

If your backend API is hosted elsewhere:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add a new secret named `VITE_API_URL`
3. Set the value to your API URL (e.g., `https://your-api.com/api/v1`)

### 4. Deploy

#### Automatic Deployment (Recommended)

The frontend will automatically deploy when you push to the `main` branch:

```bash
git add .
git commit -m "Deploy frontend"
git push origin main
```

The GitHub Actions workflow will:
- Build the frontend
- Deploy to GitHub Pages
- Make it available at `https://yourusername.github.io/Nasiba-holajon/`

#### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select **Deploy Frontend to GitHub Pages**
3. Click **Run workflow**

## Configuration

### Base Path

The base path is configured in:
- `.github/workflows/deploy-frontend.yml` (for GitHub Actions)
- `frontend/package.json` (for manual builds)
- `frontend/vite.config.ts` (default fallback)

### Router Mode

The app uses **HashRouter** for GitHub Pages to avoid 404 errors. This means URLs will look like:
- `https://yourusername.github.io/Nasiba-holajon/#/dashboard`
- `https://yourusername.github.io/Nasiba-holajon/#/login`

If you want to use BrowserRouter (cleaner URLs), you need:
1. A custom domain with proper server configuration
2. Or use a service like Netlify/Vercel that supports SPA routing

### API Configuration

The frontend needs to know where your backend API is located:

- **Development**: Uses `http://localhost:8000/api/v1` (default)
- **Production**: Set via `VITE_API_URL` environment variable or GitHub secret

**Important**: Make sure your backend API:
- Has CORS enabled for your GitHub Pages domain
- Is accessible from the internet (not just localhost)
- Uses HTTPS in production

## Troubleshooting

### 404 Errors on Refresh

If you see 404 errors when refreshing pages, ensure:
- HashRouter is enabled (`VITE_USE_HASH_ROUTER=true`)
- Base path is correctly set

### API Connection Issues

1. Check browser console for CORS errors
2. Verify `VITE_API_URL` is set correctly
3. Ensure backend CORS allows your GitHub Pages domain
4. Check backend is running and accessible

### Build Failures

1. Check GitHub Actions logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

## Local Testing

Test the production build locally:

```bash
cd frontend
npm run build:github
npm run preview
```

Visit `http://localhost:4173` to see the production build.

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in `frontend/public/` with your domain
2. Configure DNS settings as per GitHub Pages instructions
3. Update base path if needed

