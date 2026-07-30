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
    'linebreak-style': 'off',
    'indent': 'off',
    'no-multiple-empty-lines': 'off',
    'semi': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'global-require': 'off',
    'key-spacing': 'off',
    'no-unused-vars': 'warn',
    'import/order': 'off',
    'import/named': 'off',
    'import/no-duplicates': 'off',
    'no-trailing-spaces': 'off',
    'no-console': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
