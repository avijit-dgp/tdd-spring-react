import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as apiCalls from '../api/apiCalls';

const configureStore = (addLogger = true, initialData) => {
  let persistedState;

  if (!initialData) {
    persistedState = {
      id: 0,
      username: '',
      displayName: '',
      image: '',
      password: '',
      isLoggedIn: false
    };
    let localStorageData = localStorage.getItem('hoax-auth');
    if (localStorageData) {
      try {
        persistedState = JSON.parse(localStorageData);
        apiCalls.setAuthorizationHeader(persistedState);
      } catch (error) {}
    }
  } else {
    persistedState = initialData;
  }

  const middleware = addLogger
    ? applyMiddleware(thunk, logger)
    : applyMiddleware(thunk);
  const store = createStore(authReducer, persistedState, middleware);

  store.subscribe(() => {
    localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
    apiCalls.setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configureStore;
