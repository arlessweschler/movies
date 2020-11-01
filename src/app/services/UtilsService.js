import qs from 'query-string';
const _ = require('lodash');

import history from 'app_history';
import imageNotAvailable from 'app_assets/img/image_not_available.png';

const Utils = {
  /**
   * Deep diff between two object, using lodash
   * @param  {Object} object Object compared
   * @param  {Object} base   Object to compare with
   * @return {Object}        Return a new object who represent the diff
   */
  difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
        }
      });
    }
    return changes(object, base);
  },

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

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

  getDiffMethod(request, message) {
    if (message) {
      // console.log(`\nUtils.hasDiffs(), ${message}`);
    }

    return function (key, options = {}) {
      // console.log('\nkey:', key);

      const {
        withDefault = false,
        defaultValue = null
      } = options;

      const location = history.location;
      const searchObject = qs.parse(location.search);

      // console.log('searchObject:', searchObject);
      // console.log('request:', request);

      const sValue = searchObject[key];
      const rValue = request[key];

      const searchQueryDiff = Boolean(sValue && sValue != rValue);
      // const searchQueryDiff = Boolean(sValue != rValue);

      const defaultDiff = withDefault
        ? Boolean(typeof sValue == 'undefined' && rValue != defaultValue)
        : false;

      // console.log('sValue:', sValue);
      // console.log('rValue:', rValue);
      // console.log('searchQueryDiff:', searchQueryDiff);
      // console.log('defaultDiff:', defaultDiff);

      const hasDiffs = searchQueryDiff || defaultDiff;

      // console.log('hasDiffs:', hasDiffs);

      return hasDiffs;
    }
  }
}

const difference = Utils.difference;
const capitalize = Utils.capitalize;
const isEmpty = Utils.isEmpty;
const getDiffMethod = Utils.getDiffMethod;
const isNotEmpty = (value) => !Utils.isEmpty(value);

export default Utils;

export {
  imageNotAvailable,
  difference,
  capitalize,
  getDiffMethod,
  isEmpty,
  isNotEmpty
}