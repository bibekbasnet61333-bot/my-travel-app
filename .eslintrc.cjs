module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: '18.3' } },
  plugins: ['react'],
  rules: {
    'react/jsx-no-target-blank': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
};

