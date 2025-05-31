/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0078D7', // Blue from the Sureintel logo
          dark: '#005a9e',
          light: '#3a96e3',
        },
        secondary: {
          DEFAULT: '#00A36C', // Green for legal/justice theme
          dark: '#007a50',
          light: '#33b589',
        },
        accent: {
          DEFAULT: '#F5A623', // Warm accent color
          dark: '#d48a0f',
          light: '#f7b84d',
        },
        neutral: {
          DEFAULT: '#4A4A4A',
          dark: '#333333',
          light: '#717171',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
