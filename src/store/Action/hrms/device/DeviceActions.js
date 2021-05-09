// export const reconnectDevice = deviceId => {};

import ApiService from 'app/helpers/Request';
import FingerPrintConverter from 'app/Helpers/FingerPrintConverter';
import { ObjectHelper } from 'app/helpers/ObjectCheckerHelper';
import toast from 'react-hot-toast';
import {
  FETCH_ALL_FINGERPRINTS_TEMPLATES,
  SET_ALERT,
  CREATED_NEW_DEVICE,
  GET_ALL_DEVICES,
} from 'store/Type/hrms/device/DeviceType';

const BASE_URL_DEVICE = `${process.env.REACT_APP_BASE_URL}/anviz`;
const BASE_URL_HRMS = `${process.env.REACT_APP_BASE_URL}/hrms/anvizes`;

export const getAllAnviz = () => {
  return dispatch => {
    ApiService.get(`${BASE_URL_HRMS}`)
      .then(res => {
        if (ObjectHelper.contains(res, 'data')) {
          const { data } = res;

          if (ObjectHelper.contains(data, 'data')) {
            const { data } = data;

            dispatch({
              type: GET_ALL_DEVICES,
              payload: data,
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fetchAllFps = () => {
  return dispatch => {
    ApiService.get(`${BASE_URL_HRMS}`)
      .then(({ data }) => {
        const converter = new FingerPrintConverter();
        converter.setData(data);

        dispatch({
          type: FETCH_ALL_FINGERPRINTS_TEMPLATES,
          payload: converter.mergeAll(),
        });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };
};

export const addNewDevice = options => {
  const {
    device_id,
    name,
    device_ip: ip,
    device_port: port,
    device_location: location,
    device_timeout: timeout,
    device_type: type,
    is_locked,
    is_enable,
  } = options;

  const payload = {
    device_id,
    name,
    ip,
    port,
    location,
    timeout,
    type,
    is_locked,
    is_enable,
  };

  console.log(payload);

  return dispatch => {
    ApiService.post(`${BASE_URL_HRMS}`, payload)
      .then(response => {
        if (ObjectHelper.contains(response, 'data')) {
          const { data } = response;

          if (ObjectHelper.contains(data, 'data')) {
            const { data: createdAnviz } = data;

            dispatch({
              type: CREATED_NEW_DEVICE,
              payload: createdAnviz,
            });
          }
        }

        console.log(response);

        // dispatch({
        //   type : CREATE_NEW_DEVICE,
        //   payload :
        // })

        dispatch({
          type: SET_ALERT,
          payload: {
            active: true,
            type: 'success',
            message: 'Device was created success!',
            action: 'show_alert',
          },
        });

        toast.success('Device was created success!');
      })
      .catch(err => {
        toast.error('Device was not created success!');
      });
  };
};

export const _addNewDevice = options => {
  return dispatch => {
    ApiService.post(`${BASE_URL_DEVICE}`, options)
      .then(response => {
        // THIS REQUEST DONT RESPONSE ANY IMPORTANT
        // DATA, BECAUSE JUST MAKE EXECURTE A COMMAND.
        // WE CAN MAKE A TYPE OF LOG REGISTRATION HERE...
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// COMMANDS HERE

export const addStaffToDevice = (deviceId, Staff) => {
  // return dispatch => {
  //   BASE_URL_DEVICE
  //   ApiService.post(`${BASE_URL_DEVICE}/registerNewStaff/`)
  //   /anviz/registerNewStaff/1
  //   http://localhost:8000/registerNewStaff/1
  //   {{server}}/anviz/registerNewStaff/1
  // }
};
