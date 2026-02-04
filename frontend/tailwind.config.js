/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        carbon: {
          dark: '#000000', // Deep black for Apple OLED look
          gray: '#1C1C1E', // System Gray 6
          light: '#2C2C2E', // System Gray 5
          green: '#30D158', // iOS System Green
          mist: 'rgba(255, 255, 255, 0.05)', // Subtle overlay
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

