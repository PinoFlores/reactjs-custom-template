import ApiService from 'app/delinternet-ui/helpers/Request';
import {
  GET_ALL_CLOSETS,
  GET_CLOSET_BY_ID,
  SAVE_CLOSET,
  UPDATE_CLOSET,
  CHANGE_CLOSET_STATE,
  ASSIGN_CLOSET_TO_USER,
  SET_ALERT,
  RESET_SELECTED_CLOSET,
} from 'store/Type/hrms/closet/ClosetType';

const BASE_URL = process.env.REACT_APP_HRMS_API;

export const getAllClosets = () => {
  return dispatch => {
    ApiService.get(`${BASE_URL}/closets`)
      .then(({ data }) => {
        dispatch({
          type: GET_ALL_CLOSETS,
          payload: data,
        });
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const getClosetById = id => {
  return dispatch => {
    ApiService.get(`${BASE_URL}/closets/${id}`)
      .then(({ data }) => {
        dispatch({
          type: GET_CLOSET_BY_ID,
          payload: data,
        });
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const saveCloset = closet => {
  return dispatch => {
    ApiService.post(`${BASE_URL}/closets`, closet)
      .then(({ data }) => {
        dispatch({
          type: SAVE_CLOSET,
          payload: data,
        });
        setAlert(dispatch, SET_ALERT, {}, 4000);
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const updateCloset = (id, payload) => {
  return dispatch => {
    ApiService.patch(`${BASE_URL}/closets/${id}`, payload)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_CLOSET,
          payload: data,
        });
        setAlert(dispatch, SET_ALERT, {}, 4000);
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const changeClosetState = (options = { id: 0, state: '' }) => {
  return dispatch => {
    ApiService.post(`${BASE_URL}/closets/setdoorstate`, options)
      .then(({ data }) => {
        dispatch({
          type: CHANGE_CLOSET_STATE,
          payload: data,
        });
        setAlert(dispatch, SET_ALERT, {}, 4000);
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const assignClosetToUser = (options = { ownerId: 0, ClosetId: 0 }) => {
  return dispatch => {
    ApiService.post(`${BASE_URL}/closets/assign`, options)
      .then(({ data }) => {
        dispatch({
          type: ASSIGN_CLOSET_TO_USER,
          payload: data,
        });
        setAlert(dispatch, SET_ALERT, {}, 4000);
      })
      .catch(({ response }) => {
        setAlert(dispatch, SET_ALERT, {}, 4000);
      });
  };
};

export const resetSelectedCloset = () => {
  return dispatch => {
    dispatch({
      type: RESET_SELECTED_CLOSET,
    });
  };
};

// ALERTS

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
        },
      }),
    duration,
  );
};
