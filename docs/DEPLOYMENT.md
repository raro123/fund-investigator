# Deployment Guide - Fund Investigator

## Pre-Deployment Checklist

### 1. Content Updates
- [ ] Add your actual contact email in `src/pages/index.astro`
- [ ] Update LinkedIn URL (currently: `linkedin.com/in/ishpreetmodi`)
- [ ] Update Twitter handle (currently: `@fundinvestigat`)
- [ ] Create and add sample tearsheet image to `public/sample-tearsheet.png`

### 2. Railway App Configuration
- [ ] Note your Railway app URL (e.g., `your-app.up.railway.app`)
- [ ] Update `public/_redirects` with your Railway URL:
  ```
  /app/* https://your-app.up.railway.app/:splat 200
  ```

### 3. Testing Locally
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test build
npm run build
npm run preview
```

## Cloudflare Pages Deployment

### Step 1: Push to Git Repository

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Fund Investigator landing page"
   ```

2. Create repository on GitHub/GitLab
3. Push code:
   ```bash
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

### Step 2: Connect to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Navigate to Pages section
   - Click "Create a project"

2. **Connect Git Provider**
   - Choose GitHub or GitLab
   - Authorize Cloudflare to access repositories
   - Select your `fund-investigator` repository

3. **Configure Build Settings**
   ```
   Project name: fund-investigator
   Production branch: main
   
   Build settings:
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   
   Environment variables:
   NODE_VERSION = 18
   ```

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - Your site will be live at `fund-investigator.pages.dev`

### Step 3: Configure Custom Domain

1. **Add Custom Domain**
   - In Cloudflare Pages, go to your project
   - Navigate to "Custom domains"
   - Click "Set up a custom domain"
   - Enter `fundinvestigator.com`

2. **DNS Configuration**
   
   If domain is already on Cloudflare:
   - Cloudflare will automatically configure DNS
   - CNAME record will be created

   If domain is elsewhere:
   - Update nameservers to Cloudflare's
   - Or add CNAME record: `fundinvestigator.com` → `fund-investigator.pages.dev`

3. **SSL/TLS**
   - Cloudflare automatically provisions SSL certificate
   - Usually takes 1-5 minutes
   - Ensure SSL/TLS mode is set to "Full" or "Full (strict)"

### Step 4: Verify Routing

Test that routes work correctly:

1. **Main site:** `https://fundinvestigator.com`
   - Should show landing page

2. **Analysis tool:** `https://fundinvestigator.com/app`
   - Should redirect to Railway app
   - Verify `_redirects` file is in `public/` folder

3. **Reports page:** `https://fundinvestigator.com/reports`
   - Should show reports listing

## Railway App Integration

Your Railway app needs to accept requests from the custom domain:

1. **Configure CORS (if needed)**
   - Allow origin: `https://fundinvestigator.com`

2. **Session/Cookie Settings**
   - Ensure cookies work across the redirect
   - Set appropriate `SameSite` attributes

3. **Test the Integration**
   - Navigate to `/app` from the landing page
   - Verify user experience is seamless
   - Check that branding is consistent

## Automatic Deployments

Once connected, Cloudflare Pages will automatically:
- Build and deploy on every push to `main` branch
- Create preview deployments for pull requests
- Invalidate CDN cache for new deployments

## Performance Optimization

### 1. Image Optimization
- Compress `sample-tearsheet.png` before uploading
- Use WebP format for better compression
- Recommended tool: Squoosh or TinyPNG

### 2. Font Loading
- Inter font is loaded from Google Fonts
- Uses `preconnect` for faster loading
- Consider self-hosting for even better performance

### 3. Caching
- Static assets cached automatically by Cloudflare
- Configure cache rules if needed in Cloudflare dashboard

## Monitoring

### Analytics (Optional)
Add analytics to track visitors:

1. **Cloudflare Web Analytics (Free)**
   - No cookies, privacy-friendly
   - Add beacon script to `Layout.astro`

2. **Google Analytics**
   - Add tracking code to `Layout.astro`
   - Update privacy policy accordingly

### Uptime Monitoring
- Use Cloudflare's built-in analytics
- Or external service like UptimeRobot

## Troubleshooting

### Build Fails
- Check Node version is 18+
- Verify all dependencies in `package.json`
- Review build logs in Cloudflare dashboard

### `/app` Redirect Not Working
- Verify `_redirects` file is in `public/` folder
- Check Railway URL is correct
- Test Railway app is accessible directly

### Styles Not Loading
- Clear browser cache
- Check build output includes CSS files
- Verify Tailwind config is correct

### SEO Issues
- Check meta tags in `Layout.astro`
- Submit sitemap to Google Search Console
- Verify robots.txt allows crawling

## Post-Deployment Tasks

- [ ] Test all navigation links
- [ ] Verify mobile responsiveness
- [ ] Check page load speed (PageSpeed Insights)
- [ ] Test contact form/links work
- [ ] Submit to Google Search Console
- [ ] Set up monitoring/analytics
- [ ] Create sitemap.xml (optional)

## Updating Content

To update the site:

1. Edit files locally
2. Test changes: `npm run dev`
3. Commit changes: `git commit -am "Update content"`
4. Push: `git push`
5. Cloudflare auto-deploys in 2-3 minutes

## Support

For deployment issues:
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages
- Astro Docs: https://docs.astro.build
- Contact: contact@fundinvestigator.com

---

Last updated: January 2025
