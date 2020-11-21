import getQueryParams from './getQueryParams';

// проверяем различия параметров последнего запроса (ключи объекта request) в store с:
// 1. значениями этих параметров из url search query или
// (опционально) 2. дефолтными значениями этих параметров из редюсера
export default function hasRequestDiffs({ request, checklist }) {
  const searchParams = getQueryParams();

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

  return hasUrlDiffs;
}