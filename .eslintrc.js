module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
    mocha: true,
    jest: true,

  },
  globals: {
    _handleResponse: false,
    _logger: false,
    _server: false,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: 'error',
    'no-param-reassign': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
  },
};
