import qs from 'query-string';

import history from 'app_history';
import imageNotAvailable from 'app_assets/img/image_not_available.png';

const Utils = {
  isEmpty(value) {
    if (
      value && (
        (typeof value === 'string') ||
        (typeof value === 'number')
      )
    ) {
      return false;

    } else if (
      value &&
      (typeof value === 'object')
    ) {
      return Array.isArray(value)
        ? !Boolean(value.length)
        : !Boolean(Object.keys(value).length);
    }

    return true;
  },

  getDiffMethod(request) {
    return function (key, options = {}) {
      /*       console.log('\n hasDiffs()');
            console.log('key:', key);
            console.log('request:', request); */

      const {
        withDefault = false,
        defaultValue = null
      } = options;

      const location = history.location;
      const searchObject = qs.parse(location.search);
      const sValue = searchObject[key];
      const rValue = request[key];

      const searchQueryDiff = Boolean(sValue && sValue !== rValue);

      const defaultDiff = withDefault
        ? Boolean(typeof sValue == 'undefined' && rValue !== defaultValue)
        : false;

      /*           console.log('sValue:', sValue);
                console.log('rValue:', rValue);
                console.log('searchQueryDiff:', searchQueryDiff);
                console.log('defaultDiff:', defaultDiff); */

      return searchQueryDiff || defaultDiff;
    }
  }
}

const getDiffMethod = Utils.getDiffMethod;
const isEmpty = Utils.isEmpty;
const isNotEmpty = (value) => !Utils.isEmpty(value);

export default Utils;

export {
  imageNotAvailable,
  getDiffMethod,
  isEmpty,
  isNotEmpty
}