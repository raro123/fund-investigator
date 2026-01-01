/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
