/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,js,jsx,ts,tsx}",],
  theme: {
    extend: { fontFamily: {
      zain: ['Zain', 'sans-serif'],
    },},
  },
  plugins: [
      require('tailwind-scrollbar-hide')
  ],
}

