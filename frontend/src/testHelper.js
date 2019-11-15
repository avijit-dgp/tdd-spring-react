import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from './AuthContext';

export const Wrapper = (child, state) => {
  return render(
    <AuthContext initialData={state}>
      <MemoryRouter>{child}</MemoryRouter>
    </AuthContext>
  );
};
export const WrapperForPath = (child, path) => {
  return render(
    <AuthContext>
      <MemoryRouter initialEntries={[path]}>{child}</MemoryRouter>
    </AuthContext>
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
