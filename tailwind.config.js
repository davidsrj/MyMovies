/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        theme: {
          background: '#131217',
          white: '#FAFEFD',
          primary: '#D90B4C',
          secondary: '#26262E',
          grayDark: '#777586',
          gray: '#D9D9D9',
          red: '#9c3239',
          green: '#13D453',
          yellow: '#ffb234',
        },
      },
    },
  },
  plugins: [],
};
