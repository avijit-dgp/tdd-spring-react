import React from 'react';
import * as apiCalls from './api/apiCalls';

export const Auth = React.createContext();

class AuthContext extends React.Component {
  state = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLoggedIn: false
  };

  componentDidMount() {
    if (!this.props.initialData) {
      let localStorageData = localStorage.getItem('hoax-auth');
      if (localStorageData) {
        try {
          const newState = JSON.parse(localStorageData);
          this.setState({ ...newState }, () => {
            apiCalls.setAuthorizationHeader(newState);
          });
        } catch (error) {}
      }
    } else {
      this.setState({ ...this.props.initialData });
    }
  }

  postLogin = (credentials) => {
    return apiCalls.login(credentials).then((response) => {
      this.setState(
        { ...response.data, ...credentials, isLoggedIn: true },
        this.updateStorage
      );
      return response;
    });
  };

  updateUser = (updated) => {
    this.setState(
      {
        displayName: updated.displayName,
        image: updated.image
      },
      this.updateStorage
    );
  };

  updateStorage = () => {
    localStorage.setItem('hoax-auth', JSON.stringify(this.state));
    apiCalls.setAuthorizationHeader(this.state);
  };

  postSignup = (user) => {
    return apiCalls.signup(user).then((response) => {
      return this.postLogin(user);
    });
  };

  logout = () => {
    this.setState(
      {
        id: 0,
        username: '',
        displayName: '',
        image: '',
        password: '',
        isLoggedIn: false
      },
      () => {
        this.updateStorage();
      }
    );
  };

  render() {
    const actions = {
      postLogin: this.postLogin,
      postSignup: this.postSignup,
      logout: this.logout,
      updateUser: this.updateUser
    };
    return (
      <Auth.Provider
        value={{
          state: { ...this.state },
          actions: { ...actions }
        }}
      >
        {this.props.children}
      </Auth.Provider>
    );
  }
}

export default AuthContext;
