import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';


class Navbar extends Component {
  render() {
    const { logout, isLoggedin } = this.props;
    // const { user, logout, isLoggedin } = this.props;
    // console.log(this.props)
    return (
      <div>
        
        {isLoggedin ? (
          <div id="navbarmain" className="navbar navbar-dark fixed-top">
        <Link className="navbar-brand" to="/home">
        {' '}
        <img src={require("../images/Couple.It..png")} width="30" height="30" alt="" />{' '}
        </Link>
            {/* <p className="navbar-item pt-3 font-weight-bold"> {user.username}</p> */}
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div id="navbarmain" className="navbar navbar-dark fixed-top">
            <Link to="/login">
              {' '}
              <button className="btn btn-outline-success my-2 my-sm-0 mr-3 pr-3 pl-3" >Login</button>{' '}
            </Link>

            <Link to="/signup">
              {' '}
              <button className="btn btn-outline-success my-2 my-sm-0">Signup</button>{' '}
            </Link>
          </div>
        )}
      </div>
    );
  }
}


export default withAuth(Navbar);

