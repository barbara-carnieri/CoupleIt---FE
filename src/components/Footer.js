import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';

class Footer extends Component {
  render() {
    const { isLoggedin } = this.props;
    return (
      <div
        style={{ borderRadius: '5px', padding: '20px', background: '#686de0' }}>
        {isLoggedin ? (
          <div>
          <div>
          <Link 
          to="/calendar">{' '}<i class="material-icons">event</i>{' '}
          </Link>
          </div>
          <div>
          <Link 
          to="/task">{' '}<i class="material-icons">view_list</i>{' '}
          </Link>
          </div>
          <div>
          <Link 
          to="/story">{' '}<i class="material-icons">favorite_border</i>{' '}
          </Link>
          </div>
          <div>
          <Link 
          to="/gallery">{' '}<i class="material-icons">photo_library</i>{' '}
          </Link>
          </div>
          <div>
          <Link 
          to="/profile">{' '}<i class="material-icons">person</i>{' '}
          </Link>
          </div>
          </div>
        ) : null }
      </div>
    );
  }
}

export default withAuth(Footer);
