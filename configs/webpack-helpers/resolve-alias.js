const path = require('path');

const SRC_PATH = path.resolve(__dirname, '../../src');

const aliases = {
  '@/components': 'app/components',
  '@/containers': 'app/containers',
  '@/contexts': 'app/contexts',
  '@/hocs': 'app/hocs',
  '@/redux': 'app/redux/',
  '@/routing': 'app/routing',
  '@/history': 'app/services/HistoryService',
  '@/services': 'app/services',
  '@/settings': 'app/settings',
  '@/assets': 'assets',
  '@/locales': 'locales',
  '@/server': 'server'
};

Object.keys(aliases).forEach(
  (key) => {
    aliases[key] = path.resolve(
      __dirname, `${SRC_PATH}/${aliases[key]}`
    );
  }
);

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.scss', '.css'],
    alias: aliases
  },
};