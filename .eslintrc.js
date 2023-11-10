module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // Правила относящиеся к react
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-curly-newline': 'error',
    'react/jsx-curly-spacing': [
      'error',
      { when: 'always', children: true, spacing: { objectLiterals: 'never' } },
    ],
    'react/jsx-props-no-spreading': 'off',

    // Правила относящиеся к TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Правила относящиеся к стилю кода
    'arrow-body-style': ['error', 'as-needed'],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'consistent-return': 'off',
  },
}
