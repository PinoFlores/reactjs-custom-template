import { SET_LOGIN_STATUS } from 'store/Type/AuthType';

const initialState = {
  loginStatus: '',
};

export const UserLoginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOGIN_STATUS:
      return { ...state, loginStatus: payload };
    default:
      return { ...state };
  }
};
