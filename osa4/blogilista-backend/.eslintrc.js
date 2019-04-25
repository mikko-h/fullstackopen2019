module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'arrow-spacing': [
      'error', {
        'before': true,
        'after': true
      }
    ],
    'eqeqeq': 'error',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-console': 0,
    'no-trailing-spaces': 'error',
    'no-unused-vars': [
      'error',
      {
        'ignoreRestSiblings': true
      }
    ],
    'object-curly-spacing': [
      'error', 'always'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
