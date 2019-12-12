import axios from 'axios';

  class CoupleService {
  constructor() {
    this.coupleService = axios.create({
      baseURL: 'http://localhost:5000/couple',
      withCredentials: true,
    });
  }

  createCouple = (oneCouple) => {
    const { name, email } = oneCouple;
    return this.coupleService
    .post('/', { name, email })
    .then( response => {
        const {newCouple} = response.data;
        return newCouple;
    })
    .catch( err => console.log(err))
}

  // getAll() {
  //   return this.example
  //             .get()
  //             .then(({ data }) => data);
  // }

  // getOneById(id) {
  //   return this.example
  //             .get(`/${id}`)
  //             .then(({ data }) => data);
  // }
}

const coupleService = new CoupleService();

export default coupleService;
