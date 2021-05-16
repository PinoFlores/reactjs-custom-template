import { combineReducers } from 'redux';

import { UserLoginReducer } from './AuthReducer';
import { ThemeReducer } from './ThemeReducer';
import { UserReducer } from './UserReducer';
import { InvoiceReducer } from 'app/pages/Invoices/Redux/Reducer/InvoiceReducer';

export default combineReducers({
  UserLoginReducer,
  ThemeReducer,
  UserReducer,
  InvoiceReducer,
});
