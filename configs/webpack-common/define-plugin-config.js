module.exports = function (env) {
  return {
    process: {
      env: {
        NODE_ENV: `'${env.NODE_ENV}'`,
        API_PATH: `'${env.npm_package_config_API_PATH}'`,
        PORT_SERVER: `'${env.npm_package_config_PORT_SERVER}'`,
        PORT_CLIENT_DEV: `'${env.npm_package_config_PORT_CLIENT_DEV}'`,
        IS_SSR: env.npm_package_config_RENDERING == 'server'
      }
    }
  };

};