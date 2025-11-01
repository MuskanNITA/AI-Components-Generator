/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',         // <--- required
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#8b5cf6',   // purple accent
        siteDark: '#141319',// dark card background
        siteCard: '#17171C',
        siteBlack: '#09090B'
      },
    },
  },
  plugins: [],
}
