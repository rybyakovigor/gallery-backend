import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    plugins: { '@typescript-eslint': typescriptEslint, sonarjs, prettier },

    rules: {
      // TypeScript
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // SonarJS
      'sonarjs/no-duplicate-string': ['error', { threshold: 2 }],

      // ESLint общие правила
      'no-else-return': ['error', { allowElseIf: false }],
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      'no-nested-ternary': 'error',

      'prettier/prettier': 'off',
    },
  },
];
