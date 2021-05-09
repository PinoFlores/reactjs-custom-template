import {
  GET_ALL_USERS,
  SELECT_USER_BY_ID,
  RESET_SELECTED_USER,
  CREATE_NEW_USER,
  UPDATE_USER,
  SET_ALERT,
} from 'store/Type/hrms/user/UserType';
import ApiService from 'app/delinternet-ui/helpers/Request';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;

// '/users'
// '/users/{id}'
// '/users'
// '/users/{id}'
// '/users/{id}'
// '/users/avatar'
// '/users/avatar/{filename}'

const validationTmp = {
  id: 0,
  avatar: '',
  email: '',
  language: '',
  name: '',
  role: '',
};

export const getAllUsers = () => {
  return dispatch => {
    ApiService.get(`${BASE_URL}`)
      .then(({ data }) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: data,
        });
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const selectUserById = id => {
  return dispatch => {
    ApiService.get(`${BASE_URL}/${id}`)
      .then(({ data }) => {
        dispatch({
          type: SELECT_USER_BY_ID,
          payload: data,
        });
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const createNewUser = payload => {
  return dispatch => {
    ApiService.post(`${BASE_URL}`, payload).then(({ response }) => {
      const { status, data } = response;

      if (status == 422) {
        const errorAlertPayload = {
          active: true,
          type: 'danger',
          message: data['message'],
          action: '',
          validation: {
            ...validationTmp,
            ...parseValidationErrors(data['errors']),
          },
        };
        console.log(errorAlertPayload);
        setAlert(dispatch, SET_ALERT, errorAlertPayload, 4000);
      }

      // dispatch({
      //   type: CREATE_NEW_USER,
      //   payload: res,
      // });
      // setAlert(dispatch, SET_ALERT, {}, 4000);
    });
    // .catch(err => {
    //   console.log(err);
    //   setAlert(
    //     dispatch,
    //     SET_ALERT,
    //     {
    //       active: true,
    //       type: 'danger',
    //       message: `Error: `,
    //       action: '',
    //     },
    //     4000,
    //   );
    // });
  };
};

export const updateUser = (id, payload) => {
  return dispatch => {
    ApiService.patch(`${BASE_URL}/${id}`, payload)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_USER,
          payload: data,
        });
        setAlert(dispatch, SET_ALERT, {}, 4000);
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

//
export const resetSelectedCloset = () => {
  return dispatch => {
    dispatch({
      type: RESET_SELECTED_USER,
    });
  };
};

const parseValidationErrors = errors => {
  let res = {};
  Object.keys(errors).forEach(error => {
    const errList = errors[error];
    if (errList.length) res[error] = errList[0];
  });
  return res;
};

const setAlert = (dispatch, type, payload, duration) => {
  dispatch({ type, payload });
  setTimeout(
    () =>
      dispatch({
        type,
        payload: {
          active: false,
          type: '',
          message: '',
          action: '',
          validation: validationTmp,
        },
      }),
    duration,
  );
};
