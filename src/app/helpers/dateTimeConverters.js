import moment from 'moment';

export const convertToMoment = value => {
  let format = 'YYYY-MM-DD h:mm:ss';
  return moment(value, format);
};

export const convertFromMoment = value => {
  return moment(value).format('YYYY-MM-DD h:mm:ss');
};

export const convertFromMomentToDateTime = value => {
  return moment(value).format('YYYY-MM-DD h:mm:ss');
};

export const convertToHourAmPm = value => {
  return moment(value).format('LTS');
};
