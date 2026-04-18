/** @type {import('tailwindcss').Config} */
import tailwindAnimate from 'tailwindcss-animate';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F2',
        surface: '#FBFBFA',
        black: '#1A1A1A',
        orange: '#F05D23',
        teal: '#0E606B',
        mustard: '#F2B705',
        coral: '#E23E57',
        border: '#E5E5E5',
        cyan: {
          50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
          800: '#155e75', 900: '#164e63',
        },
        magenta: {
          50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
          400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
          800: '#9d174d', 900: '#831843',
        },
        gray: {
          50: '#f9fafb', 100: '#f3f4f6', 150: '#eaecf0',
          200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
          500: '#6b7280', 600: '#4b5563', 700: '#374151',
          800: '#1f2937', 900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        editorial: ['Epilogue', 'sans-serif'],
      }
    },
  },
  plugins: [tailwindAnimate],
}
