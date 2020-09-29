const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.config.common');

const devConfig = {
  mode: 'development',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    port: process.env.npm_package_config_PORT_DEV,
    historyApiFallback: true,
    stats: 'minimal'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  stats: 'minimal',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader'
        ]
      }
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