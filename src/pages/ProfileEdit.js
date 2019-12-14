import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import  paintingService from '../lib/newPaintingCopy';
import  userService from '../lib/user-service';
import Footer from '../components/Footer';

class ProfileEdit extends Component {
  state = { username: this.props.user.username, password: this.props.user.password, email: this.props.user.email, photoUrl: this.props.user.photoUrl };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, email, photoUrl} = this.state;
    userService.updateUser(this.props.user._id, 
      { username, password, email, photoUrl, coupleId: this.props.user.coupleId }); // props.signup is Provided by withAuth() and Context API
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

  render() {
    const { username, password, email, photoUrl} = this.state;
    return (
      <div>
        <h1>Update your profile</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Username:</label>
          <input className="form-control"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
        <label>Email:</label>
          <input className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Password:</label>
          <input className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
         <div className="form-group">
          <label>Profile Photo:</label>
          <input className="form-control"
            type="file"
            name="photoUrl"
            value={photoUrl}
            onChange={e => this.fileChange(e)}
          />
        </div>
          <input type="submit" className="btn btn-outline-success" value="Update" />
        </form>

        <Link to={'/home'}> Back Home</Link>

        <Footer />
      </div>
    );
  }
}

export default withAuth(ProfileEdit);




