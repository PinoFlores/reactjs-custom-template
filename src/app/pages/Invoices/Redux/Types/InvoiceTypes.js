// This prefix must be unique.
const PREFIX = '[Invoices]';

export const InvoicesTypes = {
  SELECT_ALL: `${PREFIX} -> selectAll`,
  SELECT_BY_ID: `${PREFIX} -> selectById`,
  FILTER: `${PREFIX} -> filter`,
  UPDATE: `${PREFIX} -> update`,
  SAVE: `${PREFIX} -> save`,
  DELETE_SELECTED: `${PREFIX} -> deleteSelected`,
  DELETE_BY_ID: `${PREFIX} -> deleteById`,
  SET_ALERT_MESSAGE: `${PREFIX} -> setAlertMessage`,
  GET_PAGE: `${PREFIX} -> getDataPage`,
  // The rest for manage the state.
  INITIALIZE_STATE: `${PREFIX} -> initializeState`,
  FILTERED_ITEM_DOES_NOT_EXISTS_IN_LOCAL: `${PREFIX} -> filterItemIsNotInLocal`,
  GET_NEXT_PAGE: `${PREFIX} -> getNextPage`,
  SET_NEEDED_RESOURCE: `${PREFIX} -> fetchResourceById`,
  ADD_PAGE: `${PREFIX} -> addPage`,
};

// TODO Check pages to do not repeat data across pages.
// ! [posible issue] : Could be posible repeat data across pages.
