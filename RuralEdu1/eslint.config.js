import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const baseConfig = js.configs?.recommended ?? {}
const reactHooksConfig = reactHooks.configs?.flat?.recommended ?? reactHooks.configs?.recommended ?? {}
const reactRefreshConfig = reactRefresh.configs?.vite ?? {}

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...(baseConfig.rules ?? {}),
      ...(reactHooksConfig.rules ?? {}),
      ...(reactRefreshConfig.rules ?? {}),
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]
