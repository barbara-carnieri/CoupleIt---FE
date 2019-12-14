import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import coupleService from '../lib/couple-service';
import { Link } from 'react-router-dom';

class Private extends Component {
  state = { email: '', name: ''};

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, name } = this.state;
console.log(this.state.name)
    coupleService.createCouple({ email, name }).then(createdCouple => {
      return createdCouple
    }); // props.signup is Provided by withAuth() and Context API
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };




  render() {
    const { email, name } = this.state;
    return (
      <div>
        <h1>Connect with your Pair!</h1>
        <form onSubmit={this.handleFormSubmit}>

        <label>Couple name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Your Partner Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Link to="/home">
              {' '}
                   <input type="submit" value="Match!" />
                   {' '}
            </Link>

        
        </form>
      </div>
    );
  }
}

export default withAuth(Private);
