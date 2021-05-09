import Axios from 'axios';
import { FETCH_ALL_TIMERECORDS } from 'store/Type/hrms/location/TimeRecordType';

const URL_RANDOM_USER_PHOTO = 'https://randomuser.me/api/portraits/women';

const USER_ACTIVITY = ['enter', 'exit'];
const DEVICES_NAME = ['Delinternet', 'Tortosa', 'Mora'];

const getRandowPhoto = (size = 10) => {
  const urls = [];

  for (let i = 0; i < size; i++) {
    const id = Math.floor(Math.random() * 100);
    const url = `${URL_RANDOM_USER_PHOTO}/${id}.jpg`;
    urls.push(url);
  }

  return Promise.all(
    urls.map(async (photoUrl, k) => {
      return {
        name: `User #${k}`,
        avatar: photoUrl,
        activity: USER_ACTIVITY[Math.floor(Math.random() * 2)],
        activityTime: new Date(),
        deviceName: DEVICES_NAME[Math.floor(Math.random() * 3)],
      };
    }),
  );
};

export const fetchAll = () => {
  return dispatch => {
    getRandowPhoto(25).then(records => {
      dispatch({
        type: FETCH_ALL_TIMERECORDS,
        payload: records,
      });
    });
  };
};
