module.exports = {
  rules: {
    'import/order': 1,
    'import/no-useless-path-segments': 1,
    'import/first': 1,
    'import/exports-last': 1,
    'import/newline-after-import': 1,
    'import/no-unresolved': 2,
    'import/default': 2,
    'import/namespace': 2,
    'import/no-absolute-path': 2,
    'import/no-dynamic-require': 2,
    'import/no-webpack-loader-syntax': 2,
    'import/no-self-import': 2,
    'import/export': 2,
    'import/no-deprecated': 2,
    'import/no-namespace': 2,
    'import/no-named-default': 2,
    'import/no-unassigned-import': [1, {
      'allow': ['**/*.scss', '**/*.css', 'isomorphic-fetch']
    }]
  }
};