import getQueryParams from './getQueryParams';

/*
Checks for differences of the last request (from redux store) and url search query.
And (optionally) with default values from redux useReducer.
*/
export default function hasRequestDiffs({
  request,
  checklist
}) {
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