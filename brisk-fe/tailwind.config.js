/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.tsx',
    './pages/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
}
