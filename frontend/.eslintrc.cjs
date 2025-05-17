module.exports = {
  extends: [
    'eslint:recommended',            // Default ESLint recommended rules
    'plugin:react/recommended',      // React specific rules
    'plugin:react-hooks/recommended' // React hooks rules
  ],
  plugins: ['react', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off'
  },
};
