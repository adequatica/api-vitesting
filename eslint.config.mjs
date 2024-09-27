import eslint from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/node_modules/*'],
    files: ['**/*.js', '**/*.ts'],
    plugins: {
      '@stylistic/ts': stylisticTs,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'script',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/no-floating-promises': ['error'],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
