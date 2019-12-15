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
    const { username, password, email} = this.state;
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Username:</label>
          <input className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
          </div>
        <div className="form-group">
        <label>Email:</label>
          <input className="form-control"
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={this.handleChange}
          />
          </div>
        <div className="form-group">
          <label>Password:</label>
          <input className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Photo:</label>
          <input className="form-control"
            type="file"
            name="photoUrl"
            // value={photoUrl}
            onChange={e => this.fileChange(e)}
          />
          </div>
          <input type="submit" className="btn btn-success" value="Signup" />
        </form>

        <p>Already have account? <Link to={'/login'}> Login</Link></p>
      </div>
    );
  }
}

export default withAuth(Signup);
