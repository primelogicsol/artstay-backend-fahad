// eslint.config.mjs (or .js if using CommonJS syntax)
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

export default [
  // Global ignores
  {
    ignores: ['node_modules/**', 'dist/**']
  },
  // Apply JS recommended rules to all files
  js.configs.recommended,
  // TypeScript specific configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      // Add globals to recognize console and other browser/node globals
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
      // This enables proper TypeScript type checking
      ecmaVersion: 2022,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Disable no-undef for TypeScript files since TypeScript handles type checking
      'no-undef': 'off',
      // Function parameter validation rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      // '@typescript-eslint/explicit-function-return-type': 'error', // Require return types
      // '@typescript-eslint/explicit-module-boundary-types': 'error', // Require types for exported functions
      '@typescript-eslint/no-explicit-any': 'error', // Don't allow 'any' type
      // Parameters checking
      '@typescript-eslint/no-inferrable-types': 'off', // Allow explicit types even when inferrable
      '@typescript-eslint/require-await': 'error', // Ensure async functions use await
      '@typescript-eslint/default-param-last': 'error', // Default parameters must be last
      '@typescript-eslint/parameter-properties': ['error', { 'prefer': 'class-property' }], // Consistent parameter properties
      '@typescript-eslint/consistent-type-assertions': 'error', // Consistent type assertions
      '@typescript-eslint/no-misused-promises': 'error', // Prevent misuse of Promises
      
      // Additional strict rules for function arguments
      'func-call-spacing': ['error', 'never'], // No space between function name and parentheses
      'max-params': ['error', 100], // Limit number of parameters
      'no-param-reassign': 'error', // Don't reassign parameter values
      
      // Common rules
      'prefer-const': 'error',
      'eqeqeq': 'error',
      'no-console': 'off', // Allow console.log
    },
  },
];