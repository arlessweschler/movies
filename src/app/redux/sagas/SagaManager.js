// Borrowed from https://gist.github.com/hoschi/6538249ad079116840825e20c48f1690
// Note that reloading sagas has several issues/caveats to be aware of.
// See https://github.com/yelouafi/redux-saga/issues/22#issuecomment-218737951 for discussion.

import { take, fork, cancel } from 'redux-saga/effects';

import rootSaga from '@/redux/rootSaga';

const sagas = [rootSaga];

const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga) {
  if (process.env.IS_DEV) {
    return function* main() {
      const sagaTask = yield fork(saga);

      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  }
  return saga;
}

const SagaManager = {
  startSagas(sagaMiddleware) {
    sagas.map(createAbortableSaga).forEach((saga) => sagaMiddleware.run(saga));
  },

  cancelSagas(store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    });
  }
};

export {
  CANCEL_SAGAS_HMR
};

export default SagaManager;