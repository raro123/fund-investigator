# Project TODOs

This file tracks future enhancements and improvements identified during development.

## Image & Media Enhancements

### SEO & Social Sharing
- [ ] Add `og:image` meta tag to Layout.astro using `coverImage` frontmatter field
- [ ] Add Twitter card image support using `coverImage`
- [ ] Implement fallback og:image for pages without coverImage

### Image Optimization
- [ ] Implement Astro's Image component for automatic optimization
  - Automatic format conversion (WebP, AVIF)
  - Responsive image generation with srcset
  - Lazy loading optimization
- [ ] Fine-tune loading strategies per image position
  - First image: eager loading
  - Below-fold images: lazy loading
  - Consider intersection observer for critical images

### Image Features
- [ ] Add image caption support via figure/figcaption
  - Update prose classes to style captions
  - Consider markdown extension for easier authoring
- [ ] Add lightbox/gallery functionality for images
  - Click to expand images
  - Keyboard navigation
  - Mobile-friendly zoom
- [ ] Responsive images with srcset for different screen sizes
  - Mobile-optimized sizes
  - Tablet breakpoint images
  - Desktop high-DPI support

## Content & Documentation
- [ ] Update CLAUDE.md with image handling guidelines
  - Document that images are controlled via markdown
  - Clarify coverImage field is for thumbnails only
  - Provide best practices for image placement
- [ ] Create README.md contributor guidelines (if needed)
  - Image sizing recommendations
  - File naming conventions
  - Alt text best practices

## Performance
- [ ] Implement image preloading for critical above-fold images
- [ ] Add image CDN integration (Cloudflare Images)
- [ ] Optimize image compression pipeline
- [ ] Add build-time image validation (size, format, dimensions)

## Analytics & Monitoring
- [ ] Track article engagement metrics
- [ ] Monitor image load performance
- [ ] Add error tracking for broken images

---

**Last Updated:** 2026-01-10
