import React, { Component } from 'react';

class Private extends Component {
  state = { email: '', name: ''};

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, name } = this.state;

    this.props.private({ email, name }); // props.signup is Provided by withAuth() and Context API
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
                   <input type="submit" value="Match!" />
        </form>
      </div>
    );
  }
}

export default Private;
