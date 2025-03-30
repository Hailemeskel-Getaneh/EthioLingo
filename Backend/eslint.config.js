import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],  // ✅ Only lint backend files
    languageOptions: {
      globals: { 
        ...globals.node,  // ✅ Enables 'process', 'require', 'module', etc.
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
  }
]);
