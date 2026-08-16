/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        array: {
          indigo: {
            deep: '#2D1B54',
          },
          violet: {
            royal: '#6C4AB6',
            logo: '#6C3FC5',
          },
          purple: {
            heading: '#3F2A85',
          },
          pink: {
            hot: '#EC1557',
            logo: '#E91E63',
          },
          magenta: {
            logo: '#B23FA0',
          },
          gray: {
            light: '#F5F5F7',
          },
          charcoal: '#1A1A1A',
        },
      },
    },
  },
  plugins: [],
}
