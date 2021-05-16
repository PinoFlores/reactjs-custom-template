import { SWITCH_THEME } from 'store/types/ThemeType';

export const switchTheme = () => {
  return dispatch => {
    dispatch({
      type: SWITCH_THEME,
    });
  };
};
