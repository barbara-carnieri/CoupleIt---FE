import axios from 'axios';

class CoupleService {
  constructor() {
    this.coupleService = axios.create({
      baseURL: 'http://localhost:5000/couple',
      withCredentials: true,
    });
  }


  createCouple(couple){
    const { email, name } = couple;
    return this.coupleService.post('/', {email, name})
      .then(({ data }) => data);
  }


}

const couple = new CoupleService();

export default couple;