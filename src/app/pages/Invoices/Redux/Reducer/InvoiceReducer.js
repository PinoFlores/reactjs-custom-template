import { ReducerHelper } from 'app/delinternet-ui/helpers/ReducerHelper';
import { InvoicesTypes } from '../Types/InvoiceTypes';
import { InvoiceActionForStore } from '../Actions/InvoiceActions';

/**
 * To make easy the state updation the property of the staate must be the same,
 * thinking that this must be a pattern for all incoming generators.
 */
const initialState = {
  backup: [],
  all: [], // This must container: {collection, pagination}
  selected: {},
  selectedPage: {
    data: [],
    pagination: {
      current: 1,
      perPage: 10,
      total: 0,
    },
  },
  alert: {
    show: false,
    showOnly: ['*'],
    type: 'error',
    message: '',
    callback: () => {},
  },
};

export const InvoiceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case InvoicesTypes.SELECT_ALL:
      return { ...state };
    case InvoicesTypes.SELECT_BY_ID:
      const predicateForSelect = item => item.id == payload;
      return ReducerHelper.getItemIfExistsOrRequestIt(
        state,
        predicateForSelect,
        () => InvoiceActionForStore.fetchResourceById(payload),
      );
    case InvoicesTypes.SAVE:
      return ReducerHelper.handleOnSave(state, payload);
    case InvoicesTypes.UPDATE:
      const { id, resource } = payload;
      const predicateUpdate = item => item.id == id;
      return ReducerHelper.handleOnUpdate(state, predicateUpdate, resource);
    case InvoicesTypes.DELETE_BY_ID:
      const predicateDelete = item => item.id == id;
      return ReducerHelper.handleOnDelete(state, predicateDelete);
    case InvoicesTypes.DELETE_SELECTED:
      return { ...state, selected: null };
    case InvoicesTypes.FILTER:
      return ReducerHelper.handleOnFilter(state, payload, filters => {
        InvoiceActionForStore.remoteFilter(filters);
      });
    case InvoicesTypes.GET_PAGE:
      const { number, perPage } = payload;
      return ReducerHelper.handleOnLocalPageReq(
        state,
        number,
        perPage,
        pagination => {
          // If needed page was not found locally, so execute this callback
          // for find it from the server
          InvoiceActionForStore.getRemotePage(pagination);
        },
      );
    // Internal Actions Types
    case InvoicesTypes.INITIALIZE_STATE:
      const { data, pagination } = payload;
      return { ...state, all: data, pagination };
    case InvoicesTypes.SET_NEEDED_RESOURCE:
      return { ...state, selected: payload };
    case InvoicesTypes.REMOTE_FILTER:
      return { ...state, all: payload };
    //
    default:
      return { ...state };
  }
};
