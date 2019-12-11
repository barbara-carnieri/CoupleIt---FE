import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  state= {
    username: '',
    email: '',
    photoUrl: '',
    coupleId: ''
  };


  // getProfile = id => {
  //   axios
  //     .get(`http://localhost:5000/auth/profile/${id}`)
  //     .then(apiResponse => {
  //       const theProfile = apiResponse.data;
       
  //       this.setState(theProfile);
  //     })
  //     .catch(err => console.log(err));
  // };



  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   this.getProfile(id);
  // }


  render() {
    return (
      <div>
        <h1>Profile Route</h1>
        <h2>{this.state.username}</h2>
        <p>{this.state.email}</p>
      </div>
    );
  }
}

export default Profile;




