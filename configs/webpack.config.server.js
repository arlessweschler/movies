const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const getDefinePluginConfig = require('./webpack-common/define-plugin-config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getAlias = require('./webpack-common/alias.js');
const FILENAME = 'server.js';
const srcPath = path.resolve(__dirname, '../src');

const commonConfig = {
  entry: `${srcPath}/server/index.${FILENAME}`,
  
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  stats: 'minimal',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.css'],
    alias: getAlias({ srcPath })
  },
  output: {
    filename: FILENAME,
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
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