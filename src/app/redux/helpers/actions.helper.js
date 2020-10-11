export const createActionCreator = (type, actionProps) => {

  const actionCreator = {
    type,
    ...actionProps
  };

  console.warn('-- actions.helper.js, createActionCreator(), type:', type);

  return actionCreator;
};

export const createActionsForAsyncAction = (
  actionKey
) => {
  console.warn('-- actions.helper.js, createActionsForAsyncAction(), actionKey:', actionKey);

  const actionsForAsyncAction = {
    start: request => createActionCreator(`${actionKey}_START`, { request }),
    success: data => createActionCreator(`${actionKey}_SUCCESS`, { data }),
    fail: error => createActionCreator(`${actionKey}_FAIL`, { error })
  };

  return actionsForAsyncAction;
};