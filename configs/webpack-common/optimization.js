module.exports = function ({ splitBy }) {
  const cacheGroups = (function (splitBy) {
    switch (splitBy) {

      case 'packageName':
        return {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              return `npm.${packageName.replace('@', '')}`;
            },
          },
        };

      case 'loadType':
        return {
          vendor_sync: {
            name: 'vendor_sync',
            chunks: 'initial',
            test: /node_modules/
          },
          vendor_async: {
            name: 'vendor_async',
            chunks: 'async',
            test: /node_modules/
          }
        };

      case 'vendor':
        return {
          vendor_sync: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/
          }
        };

      default:
        throw new Error('No matching webpack optimization "splitBy" value found!');
    }
  })(splitBy);

  return {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: cacheGroups,
    }
  };
};