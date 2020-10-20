export const createAsyncReducerMap = (
  actionKey,
  params = {}
) => {
  const { initialState = initialAsyncState } = params;

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

  const resetReducerFn = (state, action) => ({
    ...initialState
  });

  return {
    [`${actionKey}_START`]: startReducerFn,
    [`${actionKey}_SUCCESS`]: successReducerFn,
    [`${actionKey}_FAIL`]: failReducerFn,
    [`${actionKey}_RESET`]: resetReducerFn
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

console.warn('-- helpers/reducers.helper.js, initialAsyncState{}');
const initialAsyncState = {
  data: {},
  isLoading: false,
  error: null,
  request: null
};

export const createAsyncReducer = (
  actionKey,
  params = {}
) => {
  const { initialState = initialAsyncState } = params;
  console.warn('-- helpers/reducers.helper.js, createAsyncReducer(), actionKey:', actionKey);

  return createReducer(
    initialState,
    createAsyncReducerMap(actionKey, params)
  );
};