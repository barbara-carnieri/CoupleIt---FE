import React, { Component } from 'react';
import userService from '../lib/user-service'
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import Footer from '../components/Footer';
import  paintingService from '../lib/newPaintingCopy';
import galleryService from '../lib/gallery-service';


class Profile extends Component {
  state= {
    user: {}
  };


  getProfile(id) {
    userService.getOneById(id)
    .then( theProfile => {
        this.setState({user: theProfile})
      }
    );
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProfile(id)
  
  }

  render() {
    const { username, email, photoUrl } = this.state.user;
    return (
      <div className="profile">
        <h1>My Profile</h1>
        <h2>{username}</h2>
        <p>{email}</p>
        {/* <img src={photoUrl} alt="profilepicture" className="rounded img-fluid img-thumbnail figure-img"/> */}
      <br/>
        <Link to={`/user/${this.state.user._id}/edit`} className="btn btn-success"> Edit Profile </Link>
      
        <Footer />
      </div>
    );
  }
}

export default withAuth(Profile);




