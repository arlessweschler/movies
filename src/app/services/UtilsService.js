import qs from 'query-string';

import { DEFAULT_MOVIES_TYPE } from 'app_redux/sagas/movies-list/movies-list.reducers';
import { DEFAULT_LANGUAGE, LANGUAGES } from 'app_i18n';
import history from 'app_history';
import imageNotAvailable from 'app_assets/img/image_not_available.png';

const _ = require('lodash');

const Utils = {
  /**
   * Deep diff between two object, using lodash
   * @param  {Object} comparedObject Object compared
   * @param  {Object} baseObject   Object to compare with
   * @return {Object}        Return a new object who represent the diff
   */
  difference(comparedObject, baseObject) {
    function changes(object, base) {
      /* eslint-disable no-param-reassign */
      return _.transform(object, (result, value, key) => {
        if (!_.isEqual(value, base[key])) {
          result[key] = (_.isObject(value) && _.isObject(base[key]))
            ? changes(value, base[key])
            : value;
        }
      });
      /* eslint-enable no-param-reassign */
    }
    return changes(comparedObject, baseObject);
  },

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  isEmpty(value) {
    if (
      value && (
        (typeof value === 'string')
        || (typeof value === 'number')
      )
    ) {
      return false;
    } if (
      value &&
      (typeof value === 'object')
    ) {
      return !(Array.isArray(value)
        ? value.length
        : Object.keys(value).length);
    }

    return true;
  },

  formatLng(lng) {
    const language = LANGUAGES.find((i) => i.value === lng);

    return `${language.value}-${language.region}`;
  },

  getDefaulQueryParams() {
    return {
      lng: DEFAULT_LANGUAGE.value,
      moviesType: DEFAULT_MOVIES_TYPE,
      page: '1',
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

    return {
      lng, moviesType, page, search
    };
  },

  // проверяем различия параметров последнего запроса (ключи объекта request) в store с:
  // 1. значениями этих параметров из url search query или
  // (опционально) 2. дефолтными значениями этих параметров из редюсера
  hasRequestDiffs({ request, checklist }) {
    // console.warn(`\nUtils.hasRequestDiffs()`);

    const searchParams = Utils.getQueryParams();

    let checks = [];

    Object.keys(searchParams).forEach((key) => {
      if ({}.hasOwnProperty.call(searchParams, key)) {
        checks.push({
          key,
          hasDiffs: searchParams[key] !== request[key]
        });
      }
    });

    if (checklist) {
      checks = checks.filter((i) => checklist.includes(i.key));
    }

    const hasUrlDiffs = checks.some((i) => i.hasDiffs);

    // console.log('searchParams:', searchParams);
    // console.log('request:', request);
    // console.log('checks:', checks);
    // console.log('hasUrlDiffs:', hasUrlDiffs);

    return hasUrlDiffs;
  }
};

const isNotEmpty = (value) => !Utils.isEmpty(value);

export {
  imageNotAvailable,
  isNotEmpty
};

export const {
  formatLng,
  getDefaulQueryParams,
  getQueryParams,
  hasRequestDiffs,
  difference,
  capitalize,
  isEmpty
} = Utils;

export default Utils;