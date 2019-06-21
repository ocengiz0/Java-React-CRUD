import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './modules';

const rootReducers = combineReducers(reducers);

const store = createStore(
  rootReducers,
  applyMiddleware(thunk)
);

export default store;
