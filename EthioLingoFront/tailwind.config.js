/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        MainFont: ["MainFont"],
      },
      colors: {
        primaryBackground: '#313574',
        primaryText: '#f0f2f5',
        secondaryText:'#212121',
        screenBackground: '#fafafb',
        screenText: '#222469',
        listBarBackground: '#ffffff',
        listBarText: '#131313',
        accent1: '#fbfaff',
        accent2: '#70a595',
        accent3: '#959163',
        accent4: '#d4ac9a',
        accent5: '#e0c4aa',
        accent6:'#e1e2f0',
        accent7:'#f1f2c2',
        lightBlue: '#ADD8E6',
        lightRed: '#FF6666',
        screenText1:"#4B5563",
        homeBackground:"#8257fe",
        error:"red"
      },
    },
  },
  plugins: [],
};