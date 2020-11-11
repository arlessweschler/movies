const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pug = require('pug');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require('dotenv-defaults');

const getAlias = require('./webpack-common/alias');
const getOptimization = require('./webpack-common/optimization');
const namedChunksPluginConfig = require('./webpack-common/named-chunks-plugin-config');
const rules = require('./webpack-common/rules');
const indexTemplate = require('./templates/index.tpl');
const GenerateAssetWebpackPlugin = require('./webpack-plugins/generate-asset-webpack-plugin');
const SRC_PATH = path.resolve(__dirname, '../src');

const env = dotenv.config({ defaults: path.resolve('./configs/defaults/.env.defaults') }).parsed;
const IS_SSR = (env.RENDERING === 'server');

let commonConfig = {
  context: path.resolve(__dirname),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: getAlias({ srcPath: SRC_PATH })
  },
  entry: [
    'react-hot-loader/patch',
    `${SRC_PATH}/app/index.client.js`,
    `${SRC_PATH}/app/index.styles.js`,
    'bootstrap-loader'
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].chunk.js',
    publicPath: '/'
  },
  optimization: getOptimization({ splitBy: 'vendor' }),
  module: {
    rules: [
      rules.jsx,
      rules.images
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedChunksPlugin(namedChunksPluginConfig),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        TMDB_API_KEY: (process.env.TMDB_API_KEY || env.TMDB_API_KEY),
        IS_SSR,
        IS_DEV: (process.env.NODE_ENV === 'development')
      })
    }),
    new HtmlWebpackPlugin({
      favicon: `${SRC_PATH}/assets/img/favicon.ico`,
      minify: false,
      templateContent: function () {
        return pug.render(indexTemplate(), { pretty: true });
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ]
};

const ssrConfig = {
  plugins: [
    new GenerateAssetWebpackPlugin({
      filename: './views/index.pug',
      fn: (compilation, callback) => {
        callback(null, indexTemplate(compilation));
      }
    })
  ]
};

if (IS_SSR) {
  commonConfig = merge(commonConfig, ssrConfig);
}

module.exports = commonConfig;