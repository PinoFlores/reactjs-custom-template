import { message } from 'antd';
import ApiService from 'app/delinternet-ui/helpers/Request';
import { setAuthToken } from 'app/Helpers/AuthenticationToken';
import Axios from 'axios';
import { SET_LOGIN_STATUS } from 'store/types/AuthType';

const headers = {
  accept: 'application/json',
};

/**
 * Request for login.
 *
 * @param {*} credentials email and password
 * @param {*} history react-router-dom hook
 *
 */
export const UserLoginActions = (credentials, history) => {
  var data = new FormData();
  Object.keys(credentials).forEach(key => {
    data.append(key, credentials[key]);
  });

  return dispatch => {
    Axios({
      method: 'POST',
      url: `${process.env.REACT_APP_LOGIN}`,
      data,
      headers: headers,
    })
      .then(async resp => {
        const { token, user } = resp.data;

        localStorage.setItem('token', token);

        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            ...user,
            avatarPreview: '',
            created_at: Date.now(),
          }),
        );

        await setAuthToken(token);

        dispatch({
          type: SET_LOGIN_STATUS,
          payload: 'accepted',
        });

        history.push('/');
      })
      .catch(err => {
        message.error('Authentication Error!');
        dispatch({
          type: SET_LOGIN_STATUS,
          payload: 'fail',
        });
      });
  };
};

const URL = process.env.REACT_APP_LEGACY_API;

export const UserLoginLegacySysAction = (credentials, history) => {
  return dispatch => {
    Axios.post(`${URL}/auth/login`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async ({ data }) => {
        const { access_token: token, user: username, status, email } = data;

        const user = {
          username,
          email,
          status,
        };

        localStorage.setItem('token', token);

        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            ...user,
            avatarPreview: '',
            created_at: Date.now(),
          }),
        );

        await setAuthToken(token);

        dispatch({
          type: SET_LOGIN_STATUS,
          payload: 'accepted',
        });

        history.push('/');
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};
