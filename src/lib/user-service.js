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

  updateUser = (id, userUpdated ) =>{
    // console.log(userUpdated)
    return this.userService
    .put(`/${id}/edit`, userUpdated)
    .then((data)=> data )
  }
}

const userService = new UserService();

export default userService;
