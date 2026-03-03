# Project TODOs

This file tracks future enhancements and improvements identified during development.

## ✅ Completed (2026-01-18)

### SEO & Social Sharing
- [x] **Add `og:image` meta tag to Layout.astro using `coverImage` frontmatter field**
  - Added optional ogImage, ogImageAlt, and ogType props to Layout.astro
  - Generates absolute URLs for social platforms using Astro.site
  - Reports automatically use coverImage from frontmatter
- [x] **Add Twitter card image support using `coverImage`**
  - Added twitter:image and twitter:image:alt meta tags
  - Works in tandem with existing twitter:card (summary_large_image)
- [x] **Implement fallback og:image for pages without coverImage**
  - Created default brand OG image (1200x630px, 57KB JPEG)
  - Located at `/public/images/fundinvestigator-og-default.jpg`
  - Automatic fallback for homepage, about, and other non-report pages
- [x] **ArticleLayout.astro integration**
  - Passes coverImage and coverImageAlt from frontmatter to Layout
  - Sets ogType="article" for better SEO categorization

## ✅ Completed (2026-01-11)

### Image Optimization
- [x] **Implement Astro's Image component for automatic optimization**
  - [x] Automatic format conversion (WebP, AVIF) - achieving 76% file size reduction
  - [x] Responsive image generation with srcset - 4 variants per image
  - [x] Lazy loading optimization - automatic via Astro
- [x] **Responsive images with srcset for different screen sizes**
  - [x] Mobile-optimized sizes (600w, 640w)
  - [x] Tablet breakpoint images (900w, 1024w)
  - [x] Desktop high-DPI support (1200w, 1400w, 1920w)
- [x] **Optimize image compression pipeline** - configured quality settings per format
- [x] **Update CLAUDE.md with image handling guidelines**
  - [x] Documented simplified markdown approach
  - [x] Clarified coverImage field usage
  - [x] Added folder structure guidelines
- [x] **Created OptimizedImage component** for advanced use cases (captions, custom loading)

---

## 🔜 Remaining TODOs

### High Priority - SEO & Social Sharing
- [ ] Test social media previews (Facebook Debugger, Twitter Card Validator)
  - After deployment, validate with Facebook Sharing Debugger
  - Test Twitter Card previews
  - Verify LinkedIn Post Inspector shows correct images

### Medium Priority - Performance Enhancements
- [x] Eliminate 750ms render-blocking Google Fonts ✅ Completed 2026-01-20
  - Self-hosted Inter font via @fontsource-variable/inter
  - Removed external Google Fonts dependency
  - Font files now bundled with build output
- [ ] Implement image preloading for critical above-fold images
  - First image in articles could use eager loading
  - Consider preload hints in HTML head
- [ ] Fine-tune loading strategies per image position
  - Currently all markdown images use lazy loading
  - Could detect first image and apply eager loading
  - Consider intersection observer for critical images

### Low Priority - Image Features
- [ ] Add image caption support via markdown
  - OptimizedImage component already supports captions
  - Need markdown syntax extension or use component directly
- [ ] Add lightbox/gallery functionality for images
  - Click to expand images
  - Keyboard navigation
  - Mobile-friendly zoom
- [ ] Add image CDN integration (Cloudflare Images)
  - Only needed if traffic scales significantly
- [ ] Add build-time image validation (size, format, dimensions)
  - Verify all images have alt text
  - Check minimum dimensions
  - Warn on oversized source images

### Documentation & Guidelines
- [ ] Create README.md contributor guidelines (if needed)
  - Image sizing recommendations (already in _TEMPLATE.md)
  - File naming conventions (already documented)
  - Alt text best practices

### Analytics & Monitoring
- [ ] Track article engagement metrics
- [ ] Monitor image load performance
- [ ] Add error tracking for broken images

### High Priority - Reports UI Enhancements
- [ ] **Key Findings Box component**
  - Summary callout at article top (executive brief style)
  - Cream/gold styling to match brand
  - Bullet points for 3-4 key takeaways
  - Reinforces investigation arc structure
- [ ] **Verdict Box component**
  - Distinct conclusion component for article end
  - Visual weight to signal final assessment
  - Optional "confidence level" indicator
  - Matches Premise → Evidence → Analysis → Verdict arc
- [ ] **Evidence Callouts component**
  - Styled blockquotes for data citations
  - Source attribution styling
  - Gold left border, cream background (extend existing blockquote)
  - Differentiates data quotes from regular blockquotes

### Medium Priority - Reports UI Enhancements
- [ ] **Table of Contents (auto-generated)**
  - Extract h2/h3 headings from article content
  - Sticky sidebar on desktop, collapsible on mobile
  - Scroll spy to highlight current section
  - Fits "investigation dossier" aesthetic
- [ ] **Anchor links on headings**
  - Clickable # icon on hover for h2/h3
  - Enables sharing specific report sections
  - rehype-autolink-headings plugin or custom component
- [ ] **Glossary tooltips for financial terms**
  - Hover definitions for terms (expense ratio, alpha, Sharpe ratio)
  - Could use data attribute + CSS or lightweight JS
  - Establishes expertise without condescension

### Low Priority - Reports UI Enhancements
- [ ] **Stat Highlights component**
  - Pull-quote style for key numbers
  - Large typography, centered, branded styling
  - Use sparingly for maximum impact
- [ ] **Related Investigations section**
  - Display 2-3 related reports at article end
  - Based on shared tags or category
  - Increases time on site, reinforces expertise
- [ ] **Methodology Sidebar component**
  - Collapsible aside explaining data sources
  - Benchmark info, date ranges, metrics used
  - Builds credibility for investigation claims
- [ ] **Print/Export functionality**
  - Print-friendly stylesheet
  - Optional PDF download
  - Fits professional advisory context

### Existing UI Refinements
- [ ] **Progress bar browser fallback**
  - Current `animation-timeline: scroll()` has ~70% browser support
  - Add JS fallback or graceful degradation for unsupported browsers
  - Location: `src/layouts/ArticleLayout.astro`
- [ ] **Filter URL state persistence**
  - Category filter buttons don't update URL
  - Users can't share filtered views or use back/forward
  - Consider query params (`?category=fund-analysis`)
- [ ] **Review report card information density**
  - Cards show: image, badge, title, description, date, read time, tags
  - Consider if all metadata is needed on listing cards
  - Test reducing gap-8 to gap-6 for tighter grid
- [ ] **Article header mobile spacing**
  - Currently `pt-32 pb-20` - quite tall on mobile
  - Consider reducing padding on smaller screens
  - `pt-24 pb-12 md:pt-32 md:pb-20`
- [ ] **Differentiate tag badges from category badges**
  - Both use similar Badge styling on report cards
  - Tags could use outline variant or different size
  - Helps visual hierarchy
- [ ] **Ensure all reports have cover images**
  - Fallback placeholder works but inconsistent
  - Stronger visual consistency with real images
  - Check: `src/content/reports/` for missing coverImage fields

---

## 📊 OG Image Implementation Results (Completed)

**Implementation Details:**
- Modified: `src/layouts/Layout.astro` - Added OG image meta tags with fallback
- Modified: `src/layouts/ArticleLayout.astro` - Pass coverImage from frontmatter
- Created: `public/images/fundinvestigator-og-default.jpg` - Default brand image

**Meta Tags Added:**
- `og:image` - Absolute URL to image (article-specific or default)
- `og:image:width` - 1200px (optimal for social platforms)
- `og:image:height` - 630px (1.91:1 aspect ratio)
- `og:image:alt` - Descriptive alt text
- `og:type` - "article" for reports, "website" for other pages
- `twitter:image` - Same image for Twitter Card previews
- `twitter:image:alt` - Same alt text for Twitter

**Coverage:**
- ✅ Report pages use specific coverImage from frontmatter
- ✅ Homepage/About/Other pages use default brand image
- ✅ Automatic absolute URL generation for social platforms
- ✅ Proper fallback logic when coverImage not defined

**Testing URLs (post-deployment):**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

---

## 📊 Image Optimization Results (Completed)

**HDFC Flexi Cap Article:**
- Original: 253KB total
- Optimized: 61KB WebP
- **Reduction: 76%**

**Individual images:**
- sip.png: 42KB → 16KB (62% reduction)
- drawdown.png: 138KB → 25KB (82% reduction)
- annual-returns.png: 31KB → 8KB (74% reduction)
- scatter.png: 42KB → 12KB (71% reduction)

**Technical improvements:**
- ✅ WebP/AVIF format conversion with fallbacks
- ✅ 4 responsive variants per image (mobile/tablet/desktop/2x)
- ✅ Zero Cumulative Layout Shift (dimensions preserved)
- ✅ Simple markdown authoring workflow maintained

---

**Last Updated:** 2026-01-20 (Added Reports UI Enhancements + Existing UI Refinements)
