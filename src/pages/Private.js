import React, { Component } from 'react';

class Private extends Component {
  state = { email: ''};

  handleFormSubmit = event => {
    event.preventDefault();
    const { email } = this.state;

    this.props.private({ email }); // props.signup is Provided by withAuth() and Context API
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };




  render() {
    const { email } = this.state;
    return (
      <div>
        <h1>Connect with your Pair!</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Your Partner Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
                   <input type="submit" value="Match!" />
        </form>
      </div>
    );
  }
}

export default Private;
