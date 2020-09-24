module.exports = function (env) {
  return {
    process: {
      env: {
        NODE_ENV: `'${env.NODE_ENV}'`,
        PORT: `'${env.npm_package_config_PORT}'`,
        PORT_DEV: `'${env.npm_package_config_PORT_DEV}'`,
        IS_SSR: env.npm_package_config_RENDERING == 'server'
      }
    }
  };

};