import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import configureStore from './redux/configureStore';
import { MemoryRouter } from 'react-router-dom';
//import authReducer from './redux/authReducer';

export let store;

export const Wrapper = (child, state) => {
  store = configureStore(false, state);
  return render(
    <Provider store={store}>
      <MemoryRouter>{child}</MemoryRouter>
    </Provider>
  );
};

export const WrapperForPath = (child, path) => {
  store = configureStore(false);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>{child}</MemoryRouter>
    </Provider>
  );
};

export const loggedInState = {
  id: 1,
  username: 'user1',
  displayName: 'display1',
  image: 'profile1.png',
  password: 'P4ssword',
  isLoggedIn: true
};

export const loggedInStateUser2 = {
  id: 2,
  username: 'user2',
  displayName: 'display2',
  image: 'profile2.png',
  password: 'P4ssword',
  isLoggedIn: true
};
