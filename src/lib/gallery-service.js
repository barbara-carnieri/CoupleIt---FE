import axios from 'axios';

  class GalleryService {
  constructor() {
    this.galleryService = axios.create({
      // baseURL: 'http://localhost:5000/gallery',
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  createGallery = (oneGallery) => {
    const { title, photoUrl } = oneGallery;
    return this.galleryService
    .post('/gallery', { title, photoUrl })
    .then( response => {
        const {newGallery} = response.data;
        return newGallery;
        // this.props.getData();
        // this.setState({ title: '', description: '' });
    })
    .catch( err => console.log(err))
}

  getCoupleGallery() {
    return this.galleryService
      .get('/gallery')
      .then(response => response.data);
  }


  getOneById(id) {
    return this.galleryService
              .get(`/gallery/${id}`)
              .then(response => response.data);
 
  }

  getOneDelete(id) {
    return this.galleryService
              .delete(`/gallery/${id}`)
              .then(response => response.data)
              .catch( (err) => console.log(err));
  }

}

const galleryService = new GalleryService();

export default galleryService;
