require('isomorphic-fetch');

export default {
  fetch: function ({ url }) {
    const fetchUrl = process.env.API_PATH + url;

    console.log(`\n-- ApiService, fetchUrl: ${fetchUrl}`);

    return fetch(fetchUrl, {
      method: 'GET'
    });
  }
};
