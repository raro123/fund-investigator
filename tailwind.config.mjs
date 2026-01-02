/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Existing brand colors
        navy: {
          DEFAULT: '#1E3A5F',
          light: '#2d5278',
          dark: '#152a45',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#e0c160',
          dark: '#b8962e',
        },
        cream: {
          DEFAULT: '#fefce8',
          dark: '#fef9c3',
        },
        // Neutral colors
        'light-gray': '#94A3B8',
        'secondary-gray': '#64748B',
        // New semantic colors
        success: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        info: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        // Heading sizes
        'heading-xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        // Caption
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        // Component-specific spacing
        'section-y': '8rem',
        'section-y-sm': '5rem',
        'section-gap': '4rem',
        'card-padding': '1.5rem',
        'card-gap': '2rem',
        'element-gap': '1rem',
        'tight-gap': '0.5rem',
      },
      boxShadow: {
        // Standard shadows
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
        // Brand-specific shadows
        'gold': '0 10px 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 20px 40px -10px rgba(212, 175, 55, 0.4)',
        'navy': '0 10px 25px -5px rgba(30, 58, 95, 0.3)',
        'navy-lg': '0 20px 40px -10px rgba(30, 58, 95, 0.4)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'full': '9999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'DEFAULT': '200ms',
        'normal': '300ms',
        'slow': '400ms',
        'slower': '600ms',
        // Keep existing
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'emphasized': 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      animation: {
        // Existing animations
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        // New animations
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        // Existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // New keyframes
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
