export default {
  root: true,
  plugins: ['unused-imports'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [...'plugin:prettier/recommended'],
      rules: {
        'unused-imports/no-unused-imports': 'error',
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error', { parser: 'angular' }],
      },
    },
  ],
};
