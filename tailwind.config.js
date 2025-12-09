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

          50: '#FAFEFD',
          100: '#D9D9D9',
          110: '#657673',
          120: '#232629',
          200: '#D90B4C',
          210: '#EA0C51',
          250: '#302728',
          300: '#13D453',
          150: '#27302D',
          400: '#ffb234',
          450: '#303028',
          500: '#5e5ce3',
          600: '#fff680',
          700: '#26262E',
          750: '#1C1B21',
          800: '#131217',
        },
      },
    },
  },
  plugins: [],
};
