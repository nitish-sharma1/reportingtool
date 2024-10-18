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
      'btn-green': '#1FB973',
      'grey-dark': '#585656'
    }
  },
  plugins: [],
}