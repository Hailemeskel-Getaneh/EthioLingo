import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactNative from "eslint-plugin-react-native";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact,
      "react-native": pluginReactNative,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals["react-native"],
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
        ...js.configs.recommended.rules,
        ...pluginReact.configs.recommended.rules,
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "no-undef": ["error", { typeof: true }],
        "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }], // Already warn, tweak if needed
        "react-native/no-unused-styles": "warn",
        "react-native/no-inline-styles": "warn",
        "react/display-name": "warn",
        "react/no-unescaped-entities": "warn",
        "no-dupe-keys": "error",
        "no-empty": "warn"
      },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["EthioLingoFront/**/*.{js,jsx}"],
    rules: {
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "warn",
    },
  },
]);