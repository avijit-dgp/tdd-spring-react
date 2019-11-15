import React from 'react';
import UserListItem from './UserListItem';
import { Wrapper } from '../testHelper';

const user = {
  username: 'user1',
  displayName: 'display1',
  image: 'profile1.png'
};

const setup = (propUser = user) => {
  return Wrapper(<UserListItem user={propUser} />);
};

describe('UserListItem', () => {
  it('has image', () => {
    const { container } = setup();
    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
  });
  it('displays default image when user does not have one', () => {
    const userWithoutImage = {
      ...user,
      image: undefined
    };
    const { container } = setup(userWithoutImage);
    const image = container.querySelector('img');
    expect(image.src).toContain('/profile.png');
  });
  it('displays users image when user have one', () => {
    const { container } = setup();
    const image = container.querySelector('img');
    expect(image.src).toContain('/images/profile/' + user.image);
  });
});
