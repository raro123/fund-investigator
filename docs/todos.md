# Project TODOs

This file tracks future enhancements and improvements identified during development.

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
- [ ] Add `og:image` meta tag to Layout.astro using `coverImage` frontmatter field
- [ ] Add Twitter card image support using `coverImage`
- [ ] Implement fallback og:image for pages without coverImage
- [ ] Test social media previews (Facebook Debugger, Twitter Card Validator)

### Medium Priority - Performance Enhancements
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

**Last Updated:** 2026-01-11
