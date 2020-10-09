import { history } from 'redux_store';

const Utils = {
  isClient() {
    return (typeof window !== 'undefined' && window.document);
  },
  redirect(url) {
    console.log('-- redirect, url:', url);
    history.push(url);
  },
  isEmpty(value) {
    if (value && typeof value === 'object') {
      return Array.isArray(value) ? !Boolean(value.length) : !Boolean(Object.keys(value).length);
    }

    return true;
  },
}

const isClient = Utils.isClient;
const redirect = Utils.redirect;
const isEmpty = Utils.isEmpty;
const isNotEmpty = (value) => !Utils.isEmpty(value);

export default Utils;

export {
  isClient,
  redirect,
  isEmpty,
  isNotEmpty
}