import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

function AnonRoute({ component: Component, isLoggedin, isLoading, user, ...rest }) {

  if (isLoading) {
    return <h1>Loading</h1>
  }
  else {
    return (
      <Route
        {...rest}
        render={props =>
          !isLoggedin ? <Component {...props} /> : user.coupleId ?<Redirect to="/home" /> : <Redirect to="/private" {...props}/>
        }
      />
    );
  }
}

export default withAuth(AnonRoute);