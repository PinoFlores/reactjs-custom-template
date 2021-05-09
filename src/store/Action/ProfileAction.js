import Axios from 'axios';

import {
  PROFILE_AVATAR_UPDATED,
  PROFILE_AVATAR_UPDATED_ERROR,
  UPDATE_LOCAL_AVATAR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_PASSWORD_ERROR,
  UPDATE_PROFILE_ALERT,
} from 'store/Type/ProfileType';

const BASE_URL = `${process.env.REACT_APP_UNPAID_MODULE_BASE_URL}/profile`;

/**
 *
 * @param {*} avatar Valid File
 */
export const updateAvatar = avatar => {
  return dispatch => {
    const payload = new FormData();

    payload.append('avatar', avatar);

    Axios({
      method: 'POST',
      url: BASE_URL,
      data: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data }) => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        currentUser = { ...currentUser, avatar: data };

        localStorage.setItem('currentUser', currentUser);

        dispatch({
          type: PROFILE_AVATAR_UPDATED,
          data,
        });

        dispatch({
          type: UPDATE_PROFILE_ALERT,
          payload: {
            formName: 'basic_settings_form',
            active: true,
            message: 'Profile Avatar was successfully updated',
            type: 'success',
          },
        });

        setTimeout(() => {
          dispatch({
            type: UPDATE_PROFILE_ALERT,
            payload: {
              formName: '',
              active: false,
              message: '',
              type: '',
            },
          });
        }, 3000);
      })
      .catch(({ response }) => {
        dispatch({
          type: PROFILE_AVATAR_UPDATED_ERROR,
        });

        const { data } = response;

        dispatch({
          type: UPDATE_PROFILE_ALERT,
          payload: {
            formName: 'basic_settings_form',
            active: true,
            message:
              'Profile Avatar was not updated. Reason: ' + data['message'],
            type: 'error',
          },
        });

        setTimeout(() => {
          dispatch({
            type: UPDATE_PROFILE_ALERT,
            payload: {
              formName: '',
              active: false,
              message: '',
              type: '',
            },
          });
        }, 3000);
      });
  };
};

// profile
export const updateProfileInformation = data => {
  return dispatch => {
    Axios.post(`${BASE_URL}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    })
      .then(({ data }) => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (data && Object.keys(data).includes('current_password')) {
          delete data['current_password'];
        }

        localStorage.setItem(
          'currentUser',
          JSON.stringify({ ...currentUser, ...data }),
        );
        dispatch({
          type: UPDATE_PROFILE,
          payload: { ...currentUser, ...data },
        });

        dispatch({
          type: UPDATE_PROFILE_ALERT,
          payload: {
            formName: 'basic_settings_form',
            active: true,
            message: 'Profile was successfully updated.',
            type: 'success',
          },
        });

        setTimeout(() => {
          dispatch({
            type: UPDATE_PROFILE_ALERT,
            payload: {
              formName: '',
              active: false,
              message: '',
              type: '',
            },
          });
        }, 3000);
      })
      .catch(({ response }) => {
        dispatch({
          type: UPDATE_PROFILE_ERROR,
        });

        const { data } = response;

        dispatch({
          type: UPDATE_PROFILE_ALERT,
          payload: {
            formName: 'basic_settings_form',
            active: true,
            message: 'Profile was not updated. Reason: ' + data['message'],
            type: 'error',
          },
        });

        setTimeout(() => {
          dispatch({
            type: UPDATE_PROFILE_ALERT,
            payload: {
              formName: '',
              active: false,
              message: '',
              type: '',
            },
          });
        }, 3000);
      });
  };
};

export const updatePassword = data => {
  return dispatch => {
    Axios.post(`${BASE_URL}/password/update`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    })
      .then(({ data }) => {
        console.log(data['new_token']);
        dispatch({
          type: UPDATE_PROFILE_PASSWORD_SUCCESS,
          payload: {
            active: true,
            message: data['message'],
          },
        });

        setTimeout(() => {
          dispatch({
            type: UPDATE_PROFILE_PASSWORD_SUCCESS,
            payload: {
              active: false,
              reason: '',
            },
          });
        }, 6000);
      })
      .catch(({ response }) => {
        const { data } = response;

        dispatch({
          type: UPDATE_PROFILE_PASSWORD_ERROR,
          payload: {
            active: true,
            reason: data['message'],
          },
        });

        setTimeout(() => {
          dispatch({
            type: UPDATE_PROFILE_PASSWORD_ERROR,
            payload: {
              active: false,
              reason: '',
            },
          });
        }, 6000);
      });
  };
};

const dispatchUpdateLocalAvatar = dispatch => {
  dispatch({
    type: UPDATE_LOCAL_AVATAR,
    payload: true,
  });

  setTimeout(() => {
    dispatch({
      type: UPDATE_LOCAL_AVATAR,
      payload: false,
    });
  }, 2000);
};

export const updateLocalAvatar = () => {
  return dispatch => dispatchUpdateLocalAvatar(dispatch);
};
