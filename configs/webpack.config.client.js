const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv-defaults');

const commonConfig = require('./webpack.config.common');
const rules = require('./webpack-common/rules');
const env = dotenv.config({ defaults: path.resolve('./configs/defaults/.env.defaults') }).parsed;

const devConfig = {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    port: env.PORT_CLIENT,
    historyApiFallback: true,
    writeToDisk: true,
    stats: 'minimal'
  },
  module: {
    rules: [
      rules.css(),
      rules.scss()
    ]
  }
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'minimal',
  optimization: {
    // minimize: false
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      rules.css({ extract: true, publicPath: '../' }),
      rules.scss({ extract: true, publicPath: '../' })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
  ]
}

module.exports = env => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(commonConfig, devConfig);
    case 'production':
      return merge(commonConfig, prodConfig);
    default:
      throw new Error('No matching webpack configuration was found!');
  }
}