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
      },  },
    plugins: [],
  }