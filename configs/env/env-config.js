const path = require('path');
const dotenv = require('dotenv-defaults');

const config = dotenv.config({ defaults: path.resolve('./.env.defaults') }).parsed;
const { env } = process;

const envConfig = {
  ...Object.keys(config).reduce(
    (acc, key) => {
      acc[key] = env[key] || config[key];
      return acc;
    }, {}
  )
};

/* eslint-disable no-console */
if (envConfig.DEBUG_MODE === '1') {
  console.log('envConfig:', envConfig);
}
/* eslint-disable no-console */

module.exports = envConfig;