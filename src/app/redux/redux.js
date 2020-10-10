export const createActionCreator = (type, actionProps) => {

  const actionCreator = {
    type,
    ...actionProps
  };

  console.warn('-- redux.js, createActionCreator(), type:', type);

  return actionCreator;
};

export const createActionsForAsyncAction = (
  actionKey
) => {
  console.warn('-- redux.js, createActionsForAsyncAction(), actionKey:', actionKey);

  const actionsForAsyncAction = {
    start: request => createActionCreator(`${actionKey}_START`, { request }),
    success: data => createActionCreator(`${actionKey}_SUCCESS`, { data }),
    fail: error => createActionCreator(`${actionKey}_FAIL`, { error })
  };

  return actionsForAsyncAction;
};

export const createAsyncReducerMap = (
  actionKey
) => {

  const startReducerFn = (state, action) => ({
    ...state,
    isLoading: true,
    error: null,
    request: action.request
  });

  const successReducerFn = (state, action) => ({
    ...state,
    isLoading: false,
    error: null,
    data: action.data
  });

  const failReducerFn = (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  });

  return {
    [`${actionKey}_START`]: startReducerFn,
    [`${actionKey}_SUCCESS`]: successReducerFn,
    [`${actionKey}_FAIL`]: failReducerFn
  };
};

export const createReducer = (
  initialState = {},
  actionHandlerKeyFuncs = {}
) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  };
};

console.warn('-- redux.js, initialAsyncState{}');
const initialAsyncState = {
  isLoading: false,
  error: null,
  data: undefined,
  request: undefined
};

export const createAsyncReducer = (
  actionKey,
  initialState = initialAsyncState
) => {

  console.warn('-- redux.js, createAsyncReducer(), actionKey:', actionKey);

  return createReducer(
    initialState,
    createAsyncReducerMap(actionKey)
  );
};