module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv", // Use "module:" prefix and options
        {
          moduleName: "@env", // How you'll import env variables (e.g., import { API_URL } from '@env')
          path: ".env",       // Path to your .env file
          safe: false,        // Set to true if you want to enforce defined variables
          allowUndefined: true, // Allow undefined variables
        },
      ],
      "react-native-reanimated/plugin", // Required for expo-router, keep this last
    ],
  };
};