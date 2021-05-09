import { SWITCH_THEME } from 'store/Type/ThemeType';

export const switchTheme = () => {
  return dispatch => {
    dispatch({
      type: SWITCH_THEME,
    });
  };
};
