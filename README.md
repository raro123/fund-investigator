# Fund Investigator - Landing Page

Clean, professional landing page for Fund Investigator — a platform providing comprehensive mutual fund analysis for Indian investors.

## Design Philosophy

This site embodies a "knowledgeable colleague" tone:
- **Informative, not instructional** — explains what's available, not why you should learn it
- **Helpful, not pushy** — provides options, not directives
- **Professional restraint** — clean design without sales tactics
- **Balanced emphasis** — equal weight to analysis tool and reports

## Tech Stack

- **Astro** - Static site generator
- **Tailwind CSS** - Styling with custom brand colors
- **Cloudflare Pages** - Deployment platform

## Brand Identity

- **Colors:**
  - Navy Blue (#1E3A5F) - Primary
  - Gold (#D4AF37) - Accent
  - Cream (#fefce8) - Light backgrounds

- **Typography:**
  - Inter font family
  - Line height: 1.7 for readability
  - Clean hierarchy with generous whitespace

- **Logo:**
  - "FIN" in magnifying glass lens
  - Navy primary with gold accent on "I"
  - Short handle design

## Project Structure

```
fund-investigator/
├── src/
│   ├── components/
│   │   ├── Header.astro        # Navigation header
│   │   ├── Footer.astro        # Site footer
│   │   └── Logo.astro          # Brand logo component
│   ├── layouts/
│   │   └── Layout.astro        # Main page layout
│   └── pages/
│       ├── index.astro         # Landing page
│       └── reports.astro       # Reports listing page
├── public/
│   ├── _redirects              # Cloudflare routing config
│   └── sample-tearsheet.png    # Sample analysis image
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add sample tearsheet:**
   - Place a high-quality screenshot of your fund analysis at `public/sample-tearsheet.png`
   - Recommended: 850px × 1100px (letter size aspect ratio)

3. **Update contact information:**
   - Edit `src/pages/index.astro`
   - Update email, LinkedIn, and Twitter links in the Contact section

4. **Configure Railway redirect:**
   - Edit `public/_redirects`
   - Replace `https://your-railway-app.railway.app/` with your actual Railway app URL

## Development

```bash
npm run dev
```

Site will be available at `http://localhost:4321`

## Build

```bash
npm run build
```

Output will be in `dist/` directory

## Deployment to Cloudflare Pages

1. **Connect repository:**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your Git repository

2. **Configure build settings:**
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18 or higher

3. **Deploy:**
   - Cloudflare will automatically build and deploy
   - Updates push automatically on git commits

4. **Custom domain:**
   - Add `fundinvestigator.com` in Cloudflare Pages settings
   - Configure DNS records as instructed

## Routing Configuration

The `public/_redirects` file routes `/app/*` requests to your Railway application:

```
/app/* https://your-railway-app.railway.app/:splat 200
```

This allows:
- Main site: `fundinvestigator.com` (Cloudflare Pages)
- Analysis tool: `fundinvestigator.com/app` (Railway app)

## Content Guidelines

When updating content, maintain the established tone:

### ✅ Do:
- Use complete sentences and paragraphs
- State facts and capabilities clearly
- Write in an informative, matter-of-fact style
- Assume readers are intelligent and capable

### ❌ Avoid:
- Exclamation marks (max 1 per page)
- Superlatives ("best", "ultimate", "revolutionary")
- Sales-y language ("Get instant access!", "Join thousands!")
- Teacher-like tone ("Learn how to...", "Master the...")
- Bullet point lists (except in code/technical contexts)

## SEO Optimization

- Clean semantic HTML structure
- Descriptive meta tags
- Fast loading (static generation)
- Mobile responsive design
- Proper heading hierarchy

## License

© 2025 Ishpreet Singh Modi

---

For questions or support, contact: contact@fundinvestigator.com
