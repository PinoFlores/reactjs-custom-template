import {
  NAVIGATION_SELECT_APP,
  NAVIGATION_SELECT_APP_ITEM,
} from 'store/Type/NavigationType';

export const selectApp = appName => {
  return dispatch => {
    dispatch({
      type: NAVIGATION_SELECT_APP,
      payload: appName,
    });
  };
};

export const selectAppItem = (appName, menuItem) => {
  return dispatch => {
    dispatch({
      type: NAVIGATION_SELECT_APP_ITEM,
      payload: {
        app: appName,
        item: menuItem,
      },
    });
  };
};
