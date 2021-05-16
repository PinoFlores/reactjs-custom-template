import { UserTypes } from 'store/types/UserTypes';

export const filterUsers = filters => {
  return dispatch => {
    dispatch({
      type: UserTypes.FILTER_USERS,
      payload: filters,
    });
  };
};

export const getAllUsers = () => {
  return dispatch => {
    dispatch({
      type: UserTypes.GET_ALL,
    });
  };
};
