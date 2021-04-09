module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],

  env: {
    es6: true,
    node: true,
  },

  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  root: true,

  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    '@vue/airbnb'
  ],

  parserOptions: {
    ecmaVersion: 2020
  }
}
