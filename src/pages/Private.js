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
        <div className="form-group">
        <label>Couple name:</label>
          <input className="form-control"
            type="text"
            name="name"
            placeholder="Your creative couple name!"
            value={name}
            onChange={this.handleChange}
          />
          </div>
        <div className="form-group">
          <label>Your Partner:</label>
          <input className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          </div>
          <Link to="/home">
              {' '}
                   <input type="submit" className="btn btn-outline-success" value="Match!" />
                   {' '}
            </Link>

        
        </form>
      </div>
    );
  }
}

export default withAuth(Private);
