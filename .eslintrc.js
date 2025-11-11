module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': ['off'],
    'react/function-component-definition': ['off'],
    'react/no-unstable-nested-components': ['off'],
    'react/jsx-no-useless-fragment': ['off'],
    'react/require-default-props': ['off'],
    'prettier/prettier': ['off'],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
