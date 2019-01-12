import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser
});

export default reducers;