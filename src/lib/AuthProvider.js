//	lib/AuthProvider.js

import React from 'react';
import authService from './auth-service'; // IMPORT functions for axios requests to API
const { Consumer, Provider } = React.createContext();

// HOC to create Consumer
const withAuth = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {/* <Consumer> component provides callback which receives Providers "value" object */}
          {/* (value) => { <WrappedComponent />}  */}
          {({ login, signup, user, logout, isLoggedin, isLoading, me }) => {
            return (
              <WrappedComponent
                user={user}
                login={login}
                signup={signup}
                logout={logout}
                isLoggedin={isLoggedin}
                isLoading={isLoading}
                me={me}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

// Provider
class AuthProvider extends React.Component {
  state = { isLoggedin: false, user: null, isLoading: true };

  componentDidMount() {
    this.me();
  }

  me = () => {
    authService
    .me()
    .then(user =>
      this.setState({ isLoggedin: true, user: user, isLoading: false }),
    )
    .catch(err =>
      this.setState({ isLoggedin: false, user: null, isLoading: false }),
    );
  }

  signup = user => {
    const { username, password, email, photoUrl } = user;
    //  console.log('Signup -> form submit', { photoUrl });

    authService
      .signup({ username, password, email, photoUrl })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  login = user => {
    const { email, password } = user;

    authService
      .login({ email, password })
      .then(user => this.setState({ isLoggedin: true, user }))
      .catch(err => console.log(err));
  };

  logout = () => {
    authService
      .logout()
      .then(() => this.setState({ isLoggedin: false, user: null }))
      .catch(err => console.log(err));
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { login, logout, signup, me } = this;

    return (
      <Provider value={{ isLoading, isLoggedin, user, login, logout, signup, me }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, withAuth };

export default AuthProvider;