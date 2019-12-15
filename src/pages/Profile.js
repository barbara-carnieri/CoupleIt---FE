import React, { Component } from 'react';
import profileService from '../lib/user-service'
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import Footer from '../components/Footer';


class Profile extends Component {
  state= {
    // username: '',
    // email: '',
    // photoUrl: '',
    // coupleId: '',
    // id: ''
    user: {}
  };


  getProfile(id) {
    profileService.getOneById(id).then(
      theProfile => {
        this.setState({user: theProfile})
        // console.log(theProfile)
        // this.setState({username: theProfile.username,
        // email: theProfile.email, photoUrl: theProfile.photoUrl, coupleId: theProfile.coupleId, id: theProfile._id})
        // console.log('RESSS', this.state);
        
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
      <div>
        <h1>My Profile</h1>
        <h2>{username}</h2>
        <p>{email}</p>
        <img scr={photoUrl} alt="profilepicture"/>
      
        <Link to={`/profile/${this.state.user._id}/edit`} {...this.props} className="btn btn-success"> Edit Profile </Link>
      
        <Footer />
      </div>
    );
  }
}

export default withAuth(Profile);




