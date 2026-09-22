/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F59E0B',
          hover: '#ea840f',
          light: '#FFFBEB',
        },
      },
      boxShadow: {
        gold: '0 4px 18px 0 rgba(241, 155, 8, 0.74)',
      },
    },
  },
  plugins: [],
};
