# Vercel Deployment Guide

## Step-by-Step Instructions

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ATLA KNOTS EVENTIVE"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Log In"
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Wait for Deployment**
   - Build will start automatically
   - Takes 2-5 minutes
   - You'll get a live URL like: `your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **For Production**
   ```bash
   vercel --prod
   ```

## Build Configuration

- **Framework:** Next.js (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install`

## Environment Variables

No environment variables required for basic deployment.

## Custom Domain

1. Go to your project on Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Important Notes

- ✅ Build is configured and ready
- ✅ All dependencies are installed
- ✅ Next.js config is optimized
- ⚠️ ESLint warnings won't prevent deployment (they're just style warnings)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify `next.config.mjs` is correct

### Images Not Loading
- Check `next.config.mjs` for image domain whitelist
- Ensure external image URLs are in `remotePatterns`

### PR Preview is Private / Requires Login
If your PR preview deployments are private and require Vercel login:

1. **Disable Password Protection:**
   - Go to Vercel Dashboard → Your Project
   - Click "Settings" → "General"
   - Scroll to "Password Protection" section
   - Make sure it's **disabled** or remove any password

2. **Check Preview Deployment Settings:**
   - Go to "Settings" → "Git"
   - Under "Preview Deployments", ensure they are set to **public**
   - Check "Deployment Protection" settings

3. **Team/Organization Settings:**
   - If using a Vercel Team, check Team Settings
   - Go to Team Settings → "Security"
   - Ensure "Require Authentication for Preview Deployments" is **disabled**

4. **Alternative: Share Preview URL:**
   - Even if private, you can share the preview URL
   - Anyone with the link can access if password protection is off
   - The URL format: `your-pr-preview.vercel.app`

### Performance Issues
- Enable Vercel Analytics
- Check bundle size
- Optimize images

## Support

For issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

