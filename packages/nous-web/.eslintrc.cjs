
require('@nous/eslint-config/patch');

module.exports = {
  extends: ['@nous/eslint-config'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },

  env: {
    browser: true,
    node: true
  },

  ignorePatterns: ['.eslintrc.cjs', 'dist/', 'node_modules/'],
};