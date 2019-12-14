import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';

class Login extends Component {
  state = { email: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-control"
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Password:</label>
          <input className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
          <input type="submit" className="btn btn-outline-success" value="Login" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
