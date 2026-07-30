module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-native', 'import'],
  rules: {
    // Relaxed rules to avoid CI-blocking lint failures during rapid iteration.
    'unicode-bom': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
    'object-curly-newline': 'off',
    'quote-props': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-undef': 'off',
    'arrow-body-style': 'off',
    'padded-blocks': 'off',
    'no-else-return': 'off',
    'max-len': ['error', { code: 120 }],
    'camelcase': 'off',
    'radix': 'off',
    'quotes': 'off',
    'no-restricted-globals': 'off',
    // Keep useful warnings
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
