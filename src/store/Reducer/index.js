import { combineReducers } from 'redux';

import { UserLoginReducer } from './AuthReducer';
import { ThemeReducer } from './ThemeReducer';

export default combineReducers({
  UserLoginReducer,
  ThemeReducer,
});
