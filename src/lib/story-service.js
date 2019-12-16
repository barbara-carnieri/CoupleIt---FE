import axios from 'axios';

  class StoryService {
  constructor() {
    this.storyService = axios.create({
      // baseURL: 'http://localhost:5000/story',
      baseURL: process.env.REACT_APP_API_URL + '/story',
      withCredentials: true,
    });
  }

  createStory = (oneStory) => {
    const { date, title, description, type} = oneStory;
    return this.storyService
    .post('/', { date, title, description, type })
    .then( response => {
      console.log(response)
        const {newStory} = response.config.data;
        return newStory;
    })
    .catch( err => console.log(err))
}

  getStories() {
    return this.storyService
      .get('/')
      .then(response => response.data);
  }


  getOneById(id) {
    return this.storyService
              .get(`/${id}`)
              .then(response => response.data);
 
  }

  getOneDelete(id) {
    return this.storyService
              .delete(`/${id}`)
              .then(response => response.data)
              .catch( (err) => console.log(err));
  }


}

const storyService = new StoryService();

export default storyService;
