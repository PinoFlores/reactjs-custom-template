import _ from 'lodash';

export const ActionAlertBuilder = {
  success: (
    show = false,
    message = '',
    callback = () => {},
    showOnly = ['*'],
  ) => {
    return {
      show,
      showOnly,
      type: 'success',
      message,
      callback,
    };
  },
  warning: (
    show = false,
    message = '',
    callback = () => {},
    showOnly = ['*'],
  ) => {
    return {
      show,
      showOnly,
      type: 'warning',
      message,
      callback,
    };
  },
  error: (
    show = false,
    message = '',
    callback = () => {},
    showOnly = ['*'],
  ) => {
    return {
      show,
      showOnly,
      type: 'error',
      message,
      callback,
    };
  },
  errorToast: (
    show = false,
    message = '',
    callback = () => {},
    showOnly = ['*'],
  ) => {
    return {
      show,
      showOnly,
      type: 'errorToast',
      message,
      callback,
    };
  },
  empty: () => {
    return {
      show: false,
      showOnly: ['*'],
      type: '',
      message: '',
      callback: () => {},
    };
  },
};

/**
 * This function the a dispatch and a set of objects that
 * each of them represent the param that dispatch function need.
 *
 * This just iterate that array and take one by one and execute
 * the dispatch function passing that item.
 *
 *
 * dispatches array must contain: {type} optionals [payload, timer]
 *
 *
 * Timer: pass this value if you want to program this execution, otherwise
 * this will be execute in [1-10]ms.
 *
 * @param {function} dispatcher - dispatch function
 * @param {array} dispatches - all dispatch arg
 */
export const dispatcherHelper = (dispatcher, dispatches = []) => {
  for (let item of dispatches) {
    const config = { type: item.type };

    if (_.has(item, 'payload')) {
      config['payload'] = item.payload;
    }

    const timer = _.has(item, 'timer') ? item.timer : 0;

    setTimeout(() => dispatcher({ type, payload }), timer);
  }
};

export const ActionHelpersModule = {
  dispatcher: (dispatcher, dispatches = []) =>
    dispatcherHelper(dispatcher, dispatches),
  alertBuilder: ActionAlertBuilder,
};
