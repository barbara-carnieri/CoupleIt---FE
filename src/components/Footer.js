import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
// import { withAuth } from '../lib/user-service';

class Footer extends Component {
  render() {
    const { isLoggedin , user } = this.props;
    return (
      <div>
        {isLoggedin ? (
          <div id="footermain" className="footer navbar navbar-dark fixed-bottom">
          <div className="nav-item nav-link active">
          <Link 
          to="/calendar">{' '}<i className="material-icons">event</i>{' '}
          </Link>
          </div>
          <div className="nav-item nav-link active">
          <Link 
          to="/task">{' '}<i className="material-icons">view_list</i>{' '}
          </Link>
          </div>
          <div className="navbar-brand">
          <Link 
          to="/story">{' '}<i className="material-icons">favorite_border</i>{' '}
          </Link>
          </div>
          <div className="nav-item nav-link active">
          <Link
          to="/gallery">{' '}<i className="material-icons">photo_library</i>{' '}
          </Link>
          </div>
          <div className="nav-item nav-link active">
          <Link 
          to={`profile/${user._id}`}>{' '}<i className="material-icons">person</i>{' '}
          </Link>
          </div>
          </div>
        ) : null }
      </div>
    );
  }
}

export default withAuth(Footer);
