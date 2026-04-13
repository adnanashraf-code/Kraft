/** @type {import('tailwindcss').Config} */
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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        editorial: ['Epilogue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
