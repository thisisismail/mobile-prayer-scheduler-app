module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'react/no-unstable-nested-components': [
      'off',
      {
        allowAsProps: true,
        customValidators:
          [] /* optional array of validators used for propTypes validation */,
      },
    ],
  },
};
