module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12, // ECMAScript 2021
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'error',
    // 'no-console': 'warn',
    // 'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
