module.exports = (api) => {
  // cache is disabled bacause of debugging purposes, to make on the fly config computing possible
  api.cache(false);

  return {
    presets: [
      [
        '@babel/preset-env', {
          targets: {
            esmodules: true
          }
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
/*       [
        'transform-remove-console',
        { exclude: ["log"] }
      ], */
      '@babel/plugin-proposal-class-properties'
    ]
  };
};
