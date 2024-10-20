/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'bg-grey': '#D9D9D9',
      'white': '#ffffff',
      'off-white': '#FFF8F8',
      'input': '#F1EEEE',
      'btn-purple': '#5e17eb',
      'grey-dark': '#585656'
    }
  },
  plugins: [],
}