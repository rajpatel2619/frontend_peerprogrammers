// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#cde6ff',
          DEFAULT: '#3b82f6', // custom base blue
          dark: '#1e40af',
        },
        background: {
          light: '#f9fbfc',
          dark: '#0f172a', // slate-ish dark background
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        funnel: ["'Funnel Display'", "sans-serif"],
        lexend: ["'Lexend Deca'", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
