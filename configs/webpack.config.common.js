const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pug = require('pug');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcPath = path.resolve(__dirname, '../src');
const getAlias = require('./webpack-common/alias');
const getOptimization = require('./webpack-common/optimization');
const namedChunksPluginConfig = require('./webpack-common/named-chunks-plugin-config');
const getDefinePluginConfig = require('./webpack-common/define-plugin-config');
const rules = require('./webpack-common/rules');
const indexTemplate = require('./templates/index.tpl');
const GenerateAssetWebpackPlugin = require('./webpack-plugins/generate-asset-webpack-plugin');

let commonConfig = {
  context: path.resolve(__dirname),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: getAlias({ srcPath })
  },
  entry: [
    'react-hot-loader/patch',
    `${srcPath}/app/index.client.js`,
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
    rules: rules
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedChunksPlugin(namedChunksPluginConfig),
    new webpack.DefinePlugin(getDefinePluginConfig(process.env)),
    new HtmlWebpackPlugin({
      favicon: `${srcPath}/assets/img/favicon.ico`,
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

if (process.env.npm_package_config_RENDERING == 'server') {
  commonConfig = merge(commonConfig, ssrConfig);
}

module.exports = commonConfig;