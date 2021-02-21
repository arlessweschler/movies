const path = require('path');
const webpack = require('webpack');

// webpack plugins and common modules
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pug = require('pug');

// internal confuguration modules
const envConfig = require('./env/env-config');
const aliases = require('./webpack-helpers/resolve-alias');
const rules = require('./webpack-helpers/module-rules');
const splitChunks = require('./webpack-helpers/optimization - splitChunks');
const getIndexTemplate = require('./index.template.js');
const GenerateAssetPlugin = require('./webpack-helpers/generate-asset-plugin');

const SRC_PATH = path.resolve(__dirname, '../src');

let commonConfig = {
  ...aliases,
  entry: {
    app: [
      'react-hot-loader/patch',
      `${SRC_PATH}/app/index.client.js`,
      `${SRC_PATH}/app/index.styles.js`
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'js/[name].[fullhash].js',
    chunkFilename: 'js/[id].[fullhash].chunk.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks
  },
  module: {
    rules: [
      rules.common.scripts,
      rules.client.images
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConfig)
    }),
    new HtmlWebpackPlugin({
      favicon: `${SRC_PATH}/assets/img/favicon.ico`,
      minify: false,
      templateContent() {
        return pug.render(getIndexTemplate(), { pretty: true });
      },
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jquery': 'jquery',
      'jQuery': 'jquery',
      'window.jquery': 'jquery',
      'window.jQuery': 'jquery',
      'Popper': ['popper.js', 'default'],
    }),
  ]
};

const devConfig = {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    port: envConfig.PORT_CLIENT,
    historyApiFallback: true,
    writeToDisk: true,
    stats: 'minimal'
  },
  module: {
    rules: [
      rules.client.css(),
      rules.client.scss()
    ]
  }
};

const cssProdParams = {
  extract: true,
  publicPath: '../'
};

const prodConfig = {
  mode: 'production',
  stats: 'minimal',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      rules.client.css(cssProdParams),
      rules.client.scss(cssProdParams)
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css'
    }),
  ]
};

const ssrConfig = {
  plugins: [
    new GenerateAssetPlugin({
      filename: './views/index.pug',
      fn: (compilation, callback) => {
        callback(null, getIndexTemplate(compilation));
      }
    })
  ]
};

if (envConfig.RENDERING === 'server') {
  commonConfig = merge(commonConfig, ssrConfig);
}

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching webpack client configuration was found!');
  }
};