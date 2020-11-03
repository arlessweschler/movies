import qs from 'query-string';
const _ = require('lodash');

import history from 'app_history';
import imageNotAvailable from 'app_assets/img/image_not_available.png';

import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';
import { DEFAULT_LANGUAGE } from 'app_i18n';

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

  getDefaulQueryParams() {
    return {
      lng: DEFAULT_LANGUAGE.value,
      moviesType: DEFAULT_MOVIES_TYPE,
      page: 1,
      search: ''
    };
  },

  getQueryParams(query = history.location.search) {
    const defaults = Utils.getDefaulQueryParams();
    // console.log('Utils.getQueryParams(), query:', query);

    const {
      lng = defaults.lng,
      moviesType = defaults.moviesType,
      page = defaults.page,
      search = defaults.search
    } = qs.parse(query);

    return { lng, moviesType, page, search };
  },

  // проверяем различия параметров последнего запроса (ключи объекта request) в store с: 
  // 1. значениями этих параметров из url search query или 
  // (опционально) 2. дефолтными значениями этих параметров из редюсера
  hasRequestDiffs({ request, checklist }) {
    // console.warn(`\nUtils.hasRequestDiffs()`);

    const searchParams = Utils.getQueryParams();

    let checks = [];
    for (let key in searchParams) {
      checks.push({
        key,
        hasDiffs: searchParams[key] != request[key]
      });
    }

    if (checklist) {
      checks = checks.filter(i => checklist.includes(i.key));
    }

    const hasUrlDiffs = checks.some(i => i.hasDiffs);

    // console.log('searchParams:', searchParams);
    // console.log('request:', request);
    // console.log('checks:', checks);
    // console.log('hasUrlDiffs:', hasUrlDiffs);

    return hasUrlDiffs;
  }
}

const getDefaulQueryParams = Utils.getDefaulQueryParams;
const getQueryParams = Utils.getQueryParams;
const hasRequestDiffs = Utils.hasRequestDiffs;
const difference = Utils.difference;
const capitalize = Utils.capitalize;
const isEmpty = Utils.isEmpty;
const isNotEmpty = (value) => !Utils.isEmpty(value);

export default Utils;

export {
  imageNotAvailable,
  getDefaulQueryParams,
  getQueryParams,
  hasRequestDiffs,
  difference,
  capitalize,
  isEmpty,
  isNotEmpty
}