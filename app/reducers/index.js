// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import mainStore from './MainStore';

const rootReducer = combineReducers({
  mainStore,
  routing
});

export default rootReducer;