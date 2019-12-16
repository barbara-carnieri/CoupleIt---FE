import axios from 'axios';

  class UserService {
  constructor() {
    this.userService = axios.create({
      // baseURL: 'http://localhost:5000/user',
      baseURL: process.env.REACT_APP_API_URL + '/user',
      withCredentials: true,
    });
  }


  getOneById(id) {
    return this.userService
              .get(`/${id}`)
              .then(response => response.data);
 
  }



  // updateUser(id, user) {
  //   return this.profileService
  //             .put(`/${id}`, user)
  //             .then(response => response.data);
 
  // }

  updateUser = (id, userUpdated ) =>{
    return this.userService
    .put(`/${id}/edit`, userUpdated)
    .then((data)=> data )
  }
  // getOneDelete(id) {
  //   return this.profileService
  //             .delete(`/${id}`)
  //             .then(response => response.data)
  //             .catch( (err) => console.log(err));
  // }


}

const userService = new UserService();

export default userService;
