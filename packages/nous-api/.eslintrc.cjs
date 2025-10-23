require('@nous/eslint-config/patch');

module.exports = {
  extends: ['@nous/eslint-config'],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },

  env: {
    node: true,
    browser: false
  },

  ignorePatterns: ['.eslintrc.cjs', 'dist/', 'node_modules/'],
};