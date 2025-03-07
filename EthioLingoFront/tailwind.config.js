/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Include all files in all directories
    "./**/*.{js,jsx,ts,tsx}",
    // Explicitly exclude node_modules
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
        screenBackground: '#fafafb',
        screenText: '#222469',
        listBarBackground: '#ffffff',
        listBarText: '#131313',
        accent1: '#fbfaff',
        accent2: '#70a595',
        accent3: '#959163',
        accent4: '#d4ac9a',
        accent5: '#e0c4aa',
      },
    },
  },
  plugins: [],
};