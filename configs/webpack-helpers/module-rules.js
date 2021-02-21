const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const regexes = {
  scripts: /\.(js|jsx)$/,
  images: /\.(jpe?g|jpg|png|gif|svg)$/,
  css: /\.css$/,
  scss: /\.scss$/,
  cssModules: {
    common: /.*module\.(sa|sc|c)ss$/,
    css: /\.module\.css$/,
    scss: /\.module\.scss$/
  }
};

const common = {
  scripts: {
    test: regexes.scripts,
    exclude: /node_modules/,
    use: 'babel-loader'
  }
};

const styling = {
  cssLoader(params = {}) {
    const {
      cssModules = false,
      exportOnlyLocals = false
    } = params;

    return {
      loader: 'css-loader',
      options: cssModules
        ? {
          modules: {
            // load as css modules only regex suitable files
            auto: (resourcePath) => regexes.cssModules.common.test(resourcePath),

            // css modules naming format
            localIdentName: '[name]__[local]___[hash:base64:5]',

            // "exportOnlyLocals: 1" allows not to bundle styles without css modules
            exportOnlyLocals
          }
        }

        // compileType: 'icss'allows interoperable css (required for sass :export syntax)
        : {
          importLoaders: 1,
          modules: {
            compileType: 'icss'
          },
        }
    }
  },

  styleLoader(params = {}) {
    const { extract = false, publicPath = '' } = params;

    return extract
      ? {
        loader: MiniCssExtractPlugin.loader,
        options: { publicPath },
      }
      : 'style-loader';
  },
}

const client = {
  images: {
    test: regexes.images,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/img'
    },
  },
  css(params = {}) {
    return {
      test: regexes.css,
      use: [
        styling.styleLoader(params),
        styling.cssLoader({ cssModules: true })
      ]
    };
  },
  scss(params = {}) {
    return {
      test: regexes.scss,
      use: [
        styling.styleLoader(params),
        styling.cssLoader({ cssModules: true }),
        'sass-loader'
      ]
    };
  },
}

const server = {
  imagesUrl: {
    test: regexes.images,
    use: ['url-loader']
  },
  cssByUrl: {
    test: regexes.css,
    exclude: regexes.cssModules.css,
    use: ['url-loader']
  },
  scssByUrl: {
    test: regexes.scss,
    exclude: regexes.cssModules.scss,
    use: ['url-loader']
  },
  cssModules() {
    return {
      test: regexes.cssModules.css,
      use: [
        styling.cssLoader({
          cssModules: true,
          exportOnlyLocals: true
        })
      ]
    }
  },
  scssModules() {
    return {
      test: regexes.cssModules.scss,
      use: [
        styling.cssLoader({
          cssModules: true,
          exportOnlyLocals: true
        }),
        'sass-loader'
      ]
    }
  }
};

module.exports = {
  common,
  client,
  server
};