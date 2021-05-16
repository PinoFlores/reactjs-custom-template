/**
 * Base template to all models that could be created in future
 */
import { RequestModule } from 'app/delinternet-ui/helpers/Request';
import { ActionHelpersModule } from 'app/delinternet-ui/helpers/ActionsHelper';
import { InvoicesTypes } from '../Types/InvoiceTypes';
import { InvoicesMessages } from '../../Messages';

// TODO Change this from the genered config file in hbs
const BASE_URL = `${process.env.REACT_APP_BASE_SERVER_API}/invoices`;

const selectById = id => {
  return dispatch => {
    dispatch({
      type: InvoicesTypes.SELECT_BY_ID,
      payload: id,
    });
  };
};

const save = props => {
  return dispatch => {
    RequestModule.Request.post(BASE_URL, props)
      .then(response => {
        // As we dont know the shape of the response, let's make sure to get the final data.
        const data = RequestModule.parseResponseResource(response);
        // Make sure you're prividing this value into locales.
        const message = InvoicesMessages.SAVED_SUCCESS;
        // Let's dispatch a set to save, display alarm and in 3000ms remove that alarm
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SAVE,
            payload: data,
            timer: 0,
          },
          {
            ...ActionHelpersModule.alertBuilder.success(true, message),
            timer: 1,
          },
          {
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      })
      .catch(error => {
        // Let's parse the reponse error to make sure and select jsut needed.
        const err = RequestModule.parseError(error);
        // Make sure you're prividing this value into locales.
        const message = `${InvoicesMessages.SAVED_ERROR}${err.status}`;
        // Let's dispatch to  display an alarm and in 3000ms remove that alarm
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.error(true, message),
            timer: 1,
          },
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      });
  };
};

const update = (id, props) => {
  return dispatch => {
    RequestModule.Request.patch(`${BASE_URL}/${id}`, props)
      .then(response => {
        // As we dont know the shape of the response, let's make sure to get the final data.
        const data = RequestModule.parseResponseResource(response);
        // Make sure you're prividing this value into locales.
        const message = InvoicesMessages.UPDATION_SUCCESS;
        // Let's dispatch a set to save, display alarm and in 3000ms remove that alarm
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SAVE,
            payload: {
              id,
              resource: data,
            },
            timer: 0,
          },
          {
            ...ActionHelpersModule.alertBuilder.success(true, message),
            timer: 1,
          },
          {
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      })
      .catch(error => {
        // Let's parse the reponse error to make sure and select jsut needed.
        const err = RequestModule.parseError(error);
        // Make sure you're prividing this value into locales.
        const message = `${InvoicesMessages.UPDATION_ERROR}${err.status}`;
        // Let's dispatch to  display an alarm and in 3000ms remove that alarm
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.error(true, message),
            timer: 1,
          },
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      });
  };
};

const deleteSelected = () => {
  return dispatch => {
    dispatch({
      type: InvoicesTypes.DELETE_SELECTED,
    });
  };
};

const deleteById = id => {
  return dispatch => {
    RequestModule.Request.delete(`${BASE_URL}/${id}`)
      .then(() => {
        // Make sure you're prividing this value into locales.
        const message = InvoicesMessages.DELETED_SUCCESS;
        // Dispatch some
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.DELETE_BY_ID,
            payload: id,
            timer: 0,
          },
          {
            ...ActionHelpersModule.alertBuilder.success(true, message),
            timer: 1,
          },
          {
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      })
      .catch(error => {
        buildErrorMessage(dispatch, error, InvoicesMessages.DELETED_ERROR);
      });
  };
};

const filter = filters => {
  return dispatch => {
    dispatch({
      type: InvoicesTypes.FILTER,
      payload: filters,
    });
  };
};

const getDataPage = (number = 1, perPage = 10) => {
  return dispatch => {
    dispatch({
      type: InvoicesTypes.GET_PAGE,
      payload: { number, perPage },
    });
  };
};

// Store Required

const initializeState = (props = { page: '1', perPage: '10' }) => {
  return dispatch => {
    return RequestModule.request
      .get(RequestModule.buildQuery(BASE_URL, props))
      .then(({ data }) => {
        return dispatch({
          type: InvoicesTypes.INITIALIZE_STATE,
          payload: RequestModule.parseResponseCollection(
            data,
            props.page,
            props.perPage,
          ),
        });
      })
      .catch(error => {
        console.log(error);
        const err = RequestModule.parseError(error);
        // Make sure you're prividing this value into locales.
        const message = `${InvoicesMessages.INITIALIZE_STATE_FAILED}${err.status}`;
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.error(true, message),
            timer: 1,
          },
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      });
  };
};

const remoteFilter = filters => {
  return dispatch => {
    RequestModule.Request.get(RequestModule.buildQuery(BASE_URL, filters))
      .then(response => {
        // As we dont know the shape of the response, let's make sure to get the final data.
        const data = RequestModule.parseResponseCollection(response);
        dispatch({
          type: InvoicesTypes.REMOTE_FILTER,
          payload: data,
        });
      })
      .catch(error => {
        buildErrorMessage(dispatch, error, InvoicesMessages.DELETED_ERROR);
      });
  };
};

const fetchResourceById = id => {
  return dispatch => {
    RequestModule.Request.get(`${BASE_URL}/${id}`)
      .then(response => {
        const resource = RequestModule.parseResponseResource(response);
        dispatch({
          type: InvoicesTypes.SET_NEEDED_RESOURCE,
          payload: resource,
        });
      })
      .catch(error => {
        const err = RequestModule.parseError(error);
        const message = `${InvoicesMessages.FETCH_NEEDED_FAILED}${err.status}`;
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.errorToast(true, message),
            timer: 1,
          },
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      });
  };
};

const getRemotePage = (props = { page: '1', perPage: '10' }) => {
  return dispatch => {
    RequestModule.Request.get(RequestModule.buildQuery(BASE_URL, props))
      .then(({ data }) => {
        const newPage = RequestModule.parseResponseCollection(
          data,
          props.page,
          props.perPage,
        );

        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.ADD_PAGE,
            payload: newPage,
          },
          {
            type: InvoicesTypes.GET_PAGE,
            payload: { number, perPage },
          },
        ]);
      })
      .catch(error => {
        const err = RequestModule.parseError(error);
        // Make sure you're prividing this value into locales.
        const message = `${InvoicesMessages.NEEDED_REMOTE_PAGE_ERROR}${err.status}`;
        ActionHelpersModule.dispatcher(dispatch, [
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.errorToast(true, message),
            timer: 1,
          },
          {
            type: InvoicesTypes.SET_ALERT_MESSAGE,
            ...ActionHelpersModule.alertBuilder.empty(),
            timer: 3000,
          },
        ]);
      });
  };
};

/**
 * First request to initialize the models state/store.
 */
export const InvoiceActionForStore = {
  /**
   * Fetch All Invoices from server to
   * initialize the state.
   *
   * @param {Object} props - { page: '1', perPage: '10' }
   * @returns {function} dispatch
   * @version 1.0.0
   * @author Jose Aburto <pino0071@gmail.com>
   */
  initializeState: (props = { page: '1', perPage: '10' }) =>
    initializeState(props),
  /**
   * Make a filter request to the server
   * @param {Object} filters
   * @returns
   */
  remoteFilter: filters => remoteFilter(filters),
  /**
   * Find a resource from server by id.
   *
   * @param {*} id
   * @returns
   */
  fetchResourceById: id => fetchResourceById(id),
  getRemotePage: (props = { page: '1', perPage: '10' }) => getRemotePage(props),
};

/**
 * All Invoices actions
 *
 * This object can be spread into mapDispatchToProps:
 *
 * e.g: connect(mapStateToProps, {...InvoicesActions})(ComponentName);
 *
 * @version 1.0.0
 * @author Jose Aburto <pino0071@gmail.com>
 */
export const InvoicesActions = {
  /**
   *
   * @param {*} id - Invoice Id
   * @returns {function} dispatch
   * @version 1.0.0
   * @author Jose Aburto <pino0071@gmail.com>
   */
  selectById: id => selectById(id),
  /**
   * Given a Invoice payload save it into server and into store.
   *
   * @param {Object} props
   * @returns
   * @version 1.0.0
   * @author Jose Aburto <pino0071@gmail.com>
   */
  save: props => save(props),
  /**
   * Given a Invoice id and payload update it into server and into store.
   *
   * @param {Object} props
   * @returns
   * @version 1.0.0
   * @author Jose Aburto <pino0071@gmail.com>
   */
  update: (id, props) => update(id, props),
  /**
   * Remove the current selected Invoice.
   *
   * @author Jose Aburto <pino0071@gmail.com>
   * @version 1.0.0
   * @returns {function} dispatch
   */
  deleteSelected: () => deleteSelected(),
  /**
   * Remove a Invoice by Id.
   *
   * @author Jose Aburto <pino0071@gmail.com>
   * @version 1.0.0
   * @param {*} id - Invoice Id
   * @returns {function} dispatch
   */
  deleteById: id => deleteById(id),
  /**
   * Filter a Invoice into store.
   *
   * @author Jose Aburto <pino0071@gmail.com>
   * @version 1.0.0
   * @param {Object} filters - Invoice Id
   * @returns {function} dispatch
   */
  filter: filters => filter(filters),
  getDataPage: (number = 1, perPage = 10) => getDataPage(number, perPage),
};

const buildErrorMessage = (dispatch, error, errorMessage) => {
  const err = RequestModule.parseError(error);
  // Make sure you're prividing this value into locales.
  const message = `${errorMessage}${err.status}`;
  ActionHelpersModule.dispatcher(dispatch, [
    {
      type: InvoicesTypes.SET_ALERT_MESSAGE,
      ...ActionHelpersModule.alertBuilder.error(true, message),
      timer: 1,
    },
    {
      type: InvoicesTypes.SET_ALERT_MESSAGE,
      ...ActionHelpersModule.alertBuilder.empty(),
      timer: 3000,
    },
  ]);
};
