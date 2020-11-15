import {
  createBrowserHistory,
  createMemoryHistory
} from 'history';

const history = (typeof window !== 'undefined' && window.document)
  ? createBrowserHistory()
  : createMemoryHistory();

function redirect(url) {
  // console.log('-- redirect, url:', url);
  history.push(url);
}

export default history;

export {
  redirect
};