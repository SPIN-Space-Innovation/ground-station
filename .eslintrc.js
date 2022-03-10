module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-undef': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.ts', '.tsx'] }],
    'import/extensions': 'off',
    'no-case-declarations': 'off',
    'no-param-reassign': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }
    }
  },
};