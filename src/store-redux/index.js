import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import * as reducers from './exports';
import { thunk, withExtraArgument } from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStoreRedux(services, config = {}) {
  return createStore(
    combineReducers(reducers),
    undefined,
    composeEnhancers(applyMiddleware(withExtraArgument(services))),
  );
}