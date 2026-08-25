/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        array: {
          navy: {
            deep: '#0A1128',
            DEFAULT: '#0D1B3E',
            steel: '#1B3B6F',
            light: '#244D8E',
          },
          cyan: {
            DEFAULT: '#00C2CB',
            light: '#7FE4EA',
            dark: '#032B2E',
            glow: 'rgba(0, 194, 203, 0.25)',
          },
          slate: {
            subtext: '#C7CDDA',
            muted: '#8A99B5',
            card: '#F8FAFC',
            border: 'rgba(255, 255, 255, 0.08)',
          },
          charcoal: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}
