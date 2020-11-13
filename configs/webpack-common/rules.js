const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = {
  jsx: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  images: {
    test: /\.(jpe?g|jpg|png|gif|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/img'
    },
  },
  cssLoaders(params) {
    const { extract = false, publicPath = '' } = params;

    return [
      extract
        ?
        {
          loader: MiniCssExtractPlugin.loader,
          options: { publicPath },
        }
        : 'style-loader',

      // allows Interoperable CSS (required for sass :export syntax)
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            compileType: 'icss'
          }
        }
      }
    ];
  },
  css: function (params = {}) {

    return {
      test: /\.css$/,
      use: [...rules.cssLoaders(params)]
    };
  },
  scss: function (params = {}) {
    return {
      test: /\.scss$/,
      use: [
        ...rules.cssLoaders(params),
        'sass-loader'
      ]
    };
  },
};

module.exports = rules;