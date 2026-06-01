import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8ef",
          100: "#ffedd3",
          200: "#ffd5a3",
          300: "#ffb66d",
          400: "#fc8f3d",
          500: "#f97316",
          600: "#e45d0f",
          700: "#bb440d",
          800: "#953712",
          900: "#782f12",
        },
        spice: {
          50: "#fff4eb",
          100: "#ffe6d0",
          200: "#ffc89f",
          300: "#ffa66d",
          400: "#f98741",
          500: "#ec6d21",
          600: "#d35714",
          700: "#a64413",
          800: "#843813",
          900: "#6c3114",
        },
        sand: {
          50: "#fffdf9",
          100: "#fff8ef",
          200: "#ffeecd",
          300: "#ffe3b3",
          400: "#ffd58f",
          500: "#f9c767",
          600: "#e9ab3d",
          700: "#c5861d",
          800: "#9f6a1a",
          900: "#7d5318",
        },
      },
      fontFamily: {
        sans: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        brand: ['"Bricolage Grotesque"', '"Sora"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        warm: "0 1.25rem 3rem rgba(120, 47, 18, 0.14)",
      },
      backgroundImage: {
        "warm-radial":
          "radial-gradient(circle at 20% 15%, rgba(251, 191, 36, 0.45) 0%, rgba(251, 191, 36, 0) 40%), radial-gradient(circle at 85% 5%, rgba(249, 115, 22, 0.32) 0%, rgba(249, 115, 22, 0) 38%)",
      },
    },
  },
  plugins: [
    // Plugin para reutilizar estilos como classes
    function ({ addComponents }) {
      addComponents({
        '.box': {
          'background-color': 'rgba(255, 255, 255, 0.84)',
          'border': '1px solid',
          'border-color': 'rgba(249, 115, 22, 0.24)',
        },
        '.card': {
          'background-color': 'rgba(255, 255, 255, 0.86)',
          'border': '1px solid',
          'border-color': 'rgba(234, 88, 12, 0.18)',
          'padding': '1rem',
          'border-radius': '0.5rem',
        },
        '.btn-primary': {
          'background-color': '#f97316',
          'color': 'white',
          'padding': '0.75rem 1rem',
          'border-radius': '0.375rem',
          'font-weight': '500',
          '&:hover': {
            'background-color': '#ea580c',
          },
        },
      });
    },
    tailwindScrollbar,
  ],
}

