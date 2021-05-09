import { SWITCH_THEME } from 'store/Type/ThemeType';

const initialState = {
  theme: 'light',
};

export const ThemeReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SWITCH_THEME:
      const currentTheme = state.theme;
      return { ...state, theme: currentTheme === 'light' ? 'dark' : 'light' };
    default:
      return { ...state };
  }
};
