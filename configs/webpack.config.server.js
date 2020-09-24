const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const getDefinePluginConfig = require('./webpack-common/define-plugin-config.js');
const FILENAME = 'server.js';

const commonConfig = {
  entry: './src/server/index.server.js',
  target: 'node',
  externals: [nodeExternals()],
  stats: 'minimal',
  output: {
    filename: FILENAME,
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CleanWebpackPlugin(
      {
        verbose: true,
        cleanOnceBeforeBuildPatterns: [FILENAME],
        cleanAfterEveryBuildPatterns: [FILENAME]
      }
    ),
    new webpack.DefinePlugin(getDefinePluginConfig(process.env)),
  ]
};

const devConfig = {
  mode: 'development',
  plugins: [
    new NodemonPlugin()
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