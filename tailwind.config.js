/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian Black & Graphite Surfaces
        dark: {
          950: '#09090b', // Obsidian Black ground
          900: '#121215', // Elevated cards / graphite surface
          850: '#18181b', // Elevated container
          800: '#27272a', // Subtle borders
          700: '#3f3f46',
        },
        // Modern Athletic Lime / Neon Volt Brand Palette
        brand: {
          DEFAULT: '#D4FF00', // Athletic Lime Primary Accent
          hover: '#BCE600',   // Hover State
          tint: 'rgba(212, 255, 0, 0.1)', // Subtle tint for pills and borders
          glow: 'rgba(212, 255, 0, 0.25)',
          50: '#f9ffe5',
          100: '#f2ffcc',
          200: '#e5ff99',
          300: '#d9ff66',
          400: '#cdff33',
          500: '#D4FF00', // Primary Accent
          600: '#D4FF00',
          700: '#BCE600',
          800: '#99c200',
          900: '#759900',
        },
        lime: {
          DEFAULT: '#D4FF00',
          hover: '#BCE600',
          tint: 'rgba(212, 255, 0, 0.1)',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        tight: '-0.015em',
      },
      boxShadow: {
        'lime-glow': '0 0 30px -4px rgba(212, 255, 0, 0.35)',
        'lime-glow-sm': '0 0 15px -2px rgba(212, 255, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
