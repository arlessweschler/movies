const path = require('path');

// webpack plugins and common modules
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// internal confuguration modules
const aliases = require('./webpack-helpers/resolve-alias');
const rules = require('./webpack-helpers/module-rules');

const FILENAME = 'server.js';
const SRC_PATH = path.resolve(__dirname, '../src');

const commonConfig = {
  ...aliases,
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: `${SRC_PATH}/server/index.${FILENAME}`,
  output: {
    filename: FILENAME,
    path: path.resolve(__dirname, '../dist')
  },
  stats: 'minimal',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      rules.common.scripts,
      rules.server.imagesByUrl,
      rules.server.cssByUrl,
      rules.server.cssModules(),
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

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching webpack server configuration was found!');
  }
};