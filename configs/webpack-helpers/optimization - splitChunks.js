const nodeModulesGroups = {
  vendor: {
    name: 'vendor',
    chunks: 'all',
    test: /node_modules/,
    priority: 10
  }
};

/* 
Temporarily disabled.
UI client handlers are not working after hydration on client in SSR mode with current css modules build settings.
*/
/* const styleModulesGroups = {
  app_styles: {
    name: 'app_styles',
    chunks: 'all',
    test: /\.(sa|sc|c)ss$/,
    enforce: true,
    priority: 11
  },
  vendor_styles: {
    name: 'vendor_styles',
    chunks: 'all',
    test: /node_modules[\\/].*\.(sa|sc|c)ss$/,
    enforce: true,
    priority: 12
  },
  bootstrap_styles: {
    name: 'bootstrap_styles',
    chunks: 'all',
    test: /assets[\\/]styles[\\/]bootstrap[\\/]index\.scss/,
    enforce: true,
    priority: 13
  }
}; */

const splitChunks = {
  cacheGroups: {
    ...nodeModulesGroups,
    // ...styleModulesGroups
  }
};

module.exports = splitChunks;