import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],  
    languageOptions: {
      globals: { 
        ...globals.node,  
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
  }
]);
