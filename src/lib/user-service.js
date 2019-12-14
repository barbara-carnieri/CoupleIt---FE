import axios from 'axios';

  class ProfileService {
  constructor() {
    this.profileService = axios.create({
      baseURL: 'http://localhost:5000/user',
      withCredentials: true,
    });
  }


  getOneById(id) {
    return this.profileService
              .get(`/${id}`)
              .then(response => response.data);
 
  }



  updateUser(id, user) {
    return this.profileService
              .put(`/${id}`, user)
              .then(response => response.data);
 
  }
  // getOneDelete(id) {
  //   return this.profileService
  //             .delete(`/${id}`)
  //             .then(response => response.data)
  //             .catch( (err) => console.log(err));
  // }


}

const profileService = new ProfileService();

export default profileService;
