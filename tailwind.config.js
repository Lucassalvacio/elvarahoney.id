/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Elvara Honey brand tokens — sourced from the official logo lockup.
        cream: {
          DEFAULT: "#ECE0C5", // primary background
          light: "#F7F1DE",   // card / surface tone
          dark: "#D8C9A0",    // hairlines, dividers
        },
        brown: {
          DEFAULT: "#592A0D", // primary brand color — headings, wordmark
          deep: "#2E1608",    // near-black, high-contrast body text
        },
        gold: {
          DEFAULT: "#D9A441", // honey amber — the bee's body color, used as accent
          light: "#F0C877",
        },
        forest: {
          DEFAULT: "#3F4A34", // NTT forest green — secondary accent for sourcing story
        },
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "serif"],
        body: ["\"Jost\"", "sans-serif"],
      },
      backgroundImage: {
        honeycomb:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z' fill='none' stroke='%23592A0D' stroke-opacity='0.08' stroke-width='1'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
