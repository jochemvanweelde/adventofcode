import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'object-shorthand': ['warn', 'properties'],
      'arrow-body-style': ['error', 'as-needed'],
      'no-extra-semi': 'error',
      eqeqeq: 'error',
    },
  },
  {
    // Note: there should be no other properties in this object
    ignores: ['node_modules/**', 'dist/**', 'src/template/**'],
  },
];
