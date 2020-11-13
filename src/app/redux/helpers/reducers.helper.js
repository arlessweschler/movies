const createAsyncReducerMap = (
  actionKey,
  params = {}
) => {
  const { initialState = initialAsyncState } = params;

  const startReducerFn = (state, action) => {
    const { request } = action.payload;
    return {
      ...state,
      isLoading: true,
      error: null,
      request
    };
  };

  const successReducerFn = (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      isLoading: false,
      error: null,
      data
    };
  };

  const failReducerFn = (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      isLoading: false,
      error
    };
  };

  const resetReducerFn = () => {
    return {
      ...initialState
    };
  };

  return {
    [`${actionKey}_START`]: startReducerFn,
    [`${actionKey}_SUCCESS`]: successReducerFn,
    [`${actionKey}_FAIL`]: failReducerFn,
    [`${actionKey}_RESET`]: resetReducerFn
  };
};

const createReducer = (
  initialState = {},
  actionHandlerKeyFuncs = {}
) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  };
};

const initialAsyncState = {
  data: {},
  isLoading: false,
  error: null,
  request: {}
};

const createAsyncReducer = (
  actionKey,
  params = {}
) => {
  const { initialState = initialAsyncState } = params;

  return createReducer(
    initialState,
    createAsyncReducerMap(actionKey, params)
  );
};

export {
  createAsyncReducerMap,
  createReducer,
  createAsyncReducer
};