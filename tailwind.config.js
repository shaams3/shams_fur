/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          beige: '#F5F2EB', // Warm beige
          lightBeige: '#FAF8F5',
          gold: '#C5A880', // Matte gold
          accentGold: '#D4AF37', // Shiny gold
        },
        darkWood: {
          DEFAULT: '#1E1611', // Very dark wood brown
          light: '#2E221A',
          dark: '#140E0A',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
          dark: '#1A1A1A',
        }
      },
      fontFamily: {
        serifEn: ['"Cormorant Garamond"', 'serif'],
        sansEn: ['"Montserrat"', 'sans-serif'],
        serifAr: ['"Amiri"', 'serif'],
        sansAr: ['"Cairo"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
