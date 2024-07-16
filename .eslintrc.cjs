module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        project: './tsconfig.json',
        paths: ['@app/', '@tests/'],
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
      },
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
      alias: {
        map: [
          ['@app', './app'],
          ['@tests', './tests'],
        ],
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      },
    },
    'import/ignore': ['node_modules', '\\.(coffee|scss|css|less|hbs|html)$'],
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'testing-library',
    'prettier',
  ],
  extends: [
    'plugin:@next/next/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:vitest/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:vitest/recommended'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
    {
      files: ['tailwind.config.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        'unicorn/no-empty-file': 'off',
      },
    },
    {
      files: ['**/actions/**/*.ts'],
      rules: {
        '@typescript-eslint/require-await': 'off',
      },
    },
  ],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/cypress/**',
    'README.md',
    'next.config.js',
    'tailwind.config.ts',
    'postcss.config.cjs',
    '.eslintrc.cjs',
  ],
  rules: {
    'no-undef': 'off',
    'prefer-const': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    '@typescript-eslint/no-base-to-string': [
      'error',
      { ignoredTypeNames: ['Url'] },
    ],
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-unreadable-array-destructuring': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
        ignore: ['/^$/', 'README.md$'],
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          ref: true,
          props: true,
          Props: true,
          param: true,
          params: true,
          Param: true,
          Params: true,
          args: true,
          env: true,
        },
      },
    ],
    'import/no-cycle': 'warn',
    'import/consistent-type-specifier-style': ['off'],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    'react/prop-types': 'off',
  },
}
