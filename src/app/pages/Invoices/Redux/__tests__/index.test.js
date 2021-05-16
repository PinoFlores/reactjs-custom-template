// Directly server call tests here
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { InvoiceActionForStore } from '../Actions/InvoiceActions';
import { DataFaker } from 'app/delinternet-ui/helpers/makeDataHelper';
import { InvoicesTypes } from '../Types/InvoiceTypes';
import { RequestModule } from 'app/delinternet-ui/helpers/Request';

const BASE_URL = `${process.env.REACT_APP_BASE_SERVER_API}/invoices`;
// set store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// set axios
const mock = new MockAdapter(axios);

describe('Redux Actions Testing...', () => {
  let store;
  afterAll(() => {
    mock.restore();
  });

  beforeEach(() => {
    store = mockStore({
      backup: [],
      all: [],
    });
  });

  // Test initilizing state
  it('Initializing store state: INITIALIZE_STATE', () => {
    const mockData = DataFaker.getWithPagination();
    const url = RequestModule.buildQuery(BASE_URL, {
      page: '1',
      perPage: '10',
    });

    mock.onGet(url).reply(200, mockData);

    const actions = store.getActions();
    const expectedActions = [
      {
        type: InvoicesTypes.INITIALIZE_STATE,
        payload: RequestModule.parseResponseCollection(mockData),
      },
    ];

    return store.dispatch(InvoiceActionForStore.initializeState()).then(() => {
      return expect(actions).toEqual(expectedActions);
    });
  });

  it('Should dispatch action for get local pages', () => {
    
  })
});
