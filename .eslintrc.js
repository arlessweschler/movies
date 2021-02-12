module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: './configs/webpack-helpers/resolve-alias'
      }
    },
    'react': {
      'version': 'detect'
    }
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    '__tests__',
    '__reports__',
    'src/locales',
    'src/assets',
    '**/*.scss',
    '**/*.json',
    '**/*.md',
    'LICENSE'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint-config-airbnb-base',
    './configs/eslint-rules/airbnb-base-customs',
    './configs/eslint-rules/import-customs',
    './configs/eslint-rules/react-customs',
    './configs/eslint-rules/warnings'
  ]
};