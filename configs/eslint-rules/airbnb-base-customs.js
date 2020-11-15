const TMDB_API_FIELDS = ['total_results', 'original_title', 'backdrop_path', 'poster_path', 'release_date', 'vote_count', 'vote_average', 'genre_ids'];

module.exports = {
  rules: {
    'linebreak-style': 0,
    'eol-last': 0,
    'import/no-cycle': 0,
    'object-curly-newline': 0,
    'comma-dangle': [1, 'only-multiline'],
    'semi': [1, 'always'],
    'quotes': [1, 'single'],
    'operator-linebreak': [1, 'before',
      { overrides: { '&&': 'after' } }
    ],
    'quote-props': [1, 'consistent'],
    'class-methods-use-this': [2, {
      exceptMethods: ['render']
    }],
    'camelcase': [2, {
      properties: 'never',
      ignoreDestructuring: true,
      allow: TMDB_API_FIELDS
    }],
  }
};