module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:storybook/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 14,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname, // parsing error
  },

  plugins: ['react', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        // example of overriding a rule
        'storybook/hierarchy-separator': 'error',
        // example of disabling a rule
        'storybook/default-exports': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {},
      typescript: {
        directory: './src',
      },
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    semi: ['error', 'always'], // 문장의 끝에 세미콜론을 붙임
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    'no-unused-vars': ['warn'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'global-require': 0,
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }], // Fragment
    'import/prefer-default-export': 'off', // parsing error
    'react/require-default-props': 'off',
    'import/no-named-as-default': 0,
    'jsx-a11y/anchor-is-valid': 0,
    // 라벨과 인풋 연관성
    'jsx-a11y/label-has-associated-control': 1,
    'react/button-has-type': 0,
    'import/extensions': 0,
    'no-return-assign': 0,
  },
  ignorePatterns: ['vite.config.ts', '**/*.js'],
};
