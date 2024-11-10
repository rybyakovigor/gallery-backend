import typescriptEslint from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['src/**/*.test.ts'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      sonarjs,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/unbound-method': 'off',
      "@typescript-eslint/no-empty-object-type": "off",
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],

      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['info', 'warn', 'error'],
        },
      ],

      'no-nested-ternary': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      'sonarjs/no-duplicate-string': [
        'error',
        {
          threshold: 2,
        },
      ],

      'prettier/prettier': 'off',
    },
  },
];
