import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import  paintingService from '../lib/newPaintingCopy';

class Signup extends Component {
  state = { username: '', password: '', email: '', photoUrl: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email, photoUrl } = this.state;
    this.props.signup({ username, password, email, photoUrl }); // props.signup is Provided by withAuth() and Context API
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  fileChange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)
    paintingService.imageUpload(uploadData)
    .then((image) => {
        this.setState({ photoUrl: image })
    })
    .catch((error) => console.log(error))
  }
// enctype="multipart/form-data"
  render() {
    const { username, password, email, photoUrl} = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />

          <label>Profile Photo:</label>
          <input
            type="file"
            name="photoUrl"
            // value={photoUrl}
            onChange={e => this.fileChange(e)}
          />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?</p>
        <Link to={'/login'}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
