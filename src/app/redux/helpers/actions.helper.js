export const createActionCreator = (type, actionProps) => {

  const actionCreator = {
    type,
    ...actionProps
  };

  return actionCreator;
};

export const createActionsForAsyncAction = (
  actionKey
) => {
  const actionsForAsyncAction = {
    start: request => createActionCreator(`${actionKey}_START`, { request }),
    success: data => createActionCreator(`${actionKey}_SUCCESS`, { data }),
    fail: error => createActionCreator(`${actionKey}_FAIL`, { error }),
    reset: () => createActionCreator(`${actionKey}_RESET`)
  };

  return actionsForAsyncAction;
};