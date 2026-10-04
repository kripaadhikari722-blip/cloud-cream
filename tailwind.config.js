/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandDark: "#0A0B0E",
        brandCard: "#12141A",
        vanillaCream: "#FFF8E7",
        vanillaGold: "#F59E0B",
        cocoaBrown: "#8B4513",
        cocoaAmber: "#D97706",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};