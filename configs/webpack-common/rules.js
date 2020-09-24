module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  {
    test: /\.(jpe?g|jpg|png|gif)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/img'
    },
  }
]