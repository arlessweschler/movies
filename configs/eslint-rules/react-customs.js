module.exports = {
  rules: {
    'react/jsx-fragments': [1, 'syntax'],
    'react/jsx-no-useless-fragment': 1,
    'react/jsx-child-element-spacing': 1,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-closing-tag-location': 1,
    'react/jsx-curly-spacing': [1, {
      'when': 'never'
    }],
    'react/jsx-equals-spacing': [1, 'never'],
    'react/jsx-indent': [1, 2, {
      'indentLogicalExpressions': false
    }],
    'react/jsx-tag-spacing': [1, {
      'closingSlash': 'never',
      'beforeSelfClosing': 'always',
      'afterOpening': 'never',
      'beforeClosing': 'never'
    }],
    'react/default-props-match-prop-types': 2,
    'react/forbid-foreign-prop-types': 2,
    'react/jsx-boolean-value': [2, 'always'],
    'react/jsx-curly-brace-presence': [2, {
      'props': 'never',
      'children': 'never'
    }],
    'react/jsx-curly-newline': [2, {
      'multiline': 'consistent',
      'singleline': 'consistent'
    }],
    'react/jsx-filename-extension': [2, {
      'extensions': ['.js', '.jsx']
    }],
    'react/jsx-key': 2,
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-script-url': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-one-expression-per-line': [2, {
      'allow': 'single-child'
    }],
    'react/jsx-pascal-case': 2,
    'react/jsx-props-no-multi-spaces': 1,
    'react/jsx-uses-react': 2,
    'react/jsx-wrap-multilines': 2,
    'react/no-access-state-in-setstate': 2,
    'react/no-adjacent-inline-elements': 2,
    'react/no-children-prop': 2,
    'react/no-danger': 2,
    'react/no-deprecated': 2,
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-multi-comp': 2,
    'react/no-redundant-should-component-update': 2,
    'react/no-render-return-value': 2,
    'react/no-this-in-sfc': 2,
    'react/no-typos': 2,
    'react/no-unsafe': 2,
    'react/no-unused-prop-types': 2,
    'react/no-unused-state': 2,
    'react/no-will-update-set-state': 2,
    'react/react-in-jsx-scope': 2,
    'react/require-render-return': 2,
    'react/self-closing-comp': 2,
    'react/style-prop-object': 2,
    'react/void-dom-elements-no-children': 2
  }
};