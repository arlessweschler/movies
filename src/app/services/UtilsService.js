import qs from 'query-string';

import { DEFAULT_MOVIES_TYPE } from '@/settings/tmdb';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/settings/i18n';
import history from '@/routing/history';
import imageNotAvailable from '@/assets/img/image_not_available.png';

const Utils = {
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
  capitalize,
  isEmpty
} = Utils;

export default Utils;