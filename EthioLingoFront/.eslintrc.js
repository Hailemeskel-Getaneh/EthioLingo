// /EthioLingoFront/.eslintrc.js
module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: 'setSelectedLanguage' }], // Ignore unused warning for setSelectedLanguage
    },
  };