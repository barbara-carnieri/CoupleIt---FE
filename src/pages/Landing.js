import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';


class Landing extends Component {
  render() {
    return (
      <div className="landing">
      <img src={require("../images/backlogo.png")} height="650" alt="" />
      </div>
    );
  }
}


export default withAuth(Landing);