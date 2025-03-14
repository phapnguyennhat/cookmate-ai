/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
    fontFamily: {
      outfit:'outfit',
      'outfit-bold': 'outfit-bold'
    }
  },
  plugins: [],
}

