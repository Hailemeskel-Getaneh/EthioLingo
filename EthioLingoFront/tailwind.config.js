/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**"
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class", // Enables dark mode based on class
  theme: {
    extend: {
      fontFamily: {
        MainFont: ["MainFont"],
      },
      colors: {
        // Light Mode Colors
        primaryBackground: '#313574',
        primaryText: '#ffffff',
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
        error:"red",

        // Dark Mode Colors
        dark: {
          primaryBackground: '#ddd',
          primaryText: '#e3e3e3',
          secondaryText: '#f5f5f5',
          screenBackground: '#121212',
          screenText: '#ffffff',
          listBarBackground: '#1e1e1e',
          listBarText: '#f5f5f5',
          accent1: '#1f4068',
          accent2: '#16213e',
          accent3: '#0f3460',
          accent4: '#e94560',
          accent5: '#a5a5a5',
          accent6: '#2b2b2b',
          accent7: '#404040',
          homeBackground: '#25274d',
          error: '#ff4f4f'
        }
      },
    },
  },
  plugins: [],
};
