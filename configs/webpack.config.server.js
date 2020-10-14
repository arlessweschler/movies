const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const getDefinePluginConfig = require('./webpack-common/define-plugin-config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = require('./webpack-common/rules');
const getAlias = require('./webpack-common/alias');
const FILENAME = 'server.js';
const SRC_PATH = path.resolve(__dirname, '../src');

const commonConfig = {
  entry: `${SRC_PATH}/server/index.${FILENAME}`,

  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  stats: 'minimal',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.css'],
    alias: getAlias({ srcPath: SRC_PATH })
  },
  output: {
    filename: FILENAME,
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      rules.jsx,
      {
        test: /\.scss$/,
        use: ['url-loader']
      },
      {
        test: /\.css$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      {
        verbose: true,
        cleanOnceBeforeBuildPatterns: ['*server.js'],
        cleanAfterEveryBuildPatterns: ['*server.js']
      }
    ),
    new webpack.DefinePlugin(getDefinePluginConfig(process.env)),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
  ]
};

const devConfig = {
  mode: 'development',
  plugins: [
    new NodemonPlugin({
      script: `./dist/${FILENAME}`
    })
  ]
};

const prodConfig = {
  mode: 'production'
};

module.exports = env => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching webpack server configuration was found!');
  }
};