import axios from 'axios';

  class GalleryService {
  constructor() {
    this.galleryService = axios.create({
      baseURL: 'http://localhost:5000/gallery',
      withCredentials: true,
    });
  }

  createGallery = (oneGallery) => {
    const { title, photoUrl } = oneGallery;
    return this.galleryService
    .post('/', { title, photoUrl })
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
      .get('/')
      .then(response => response.data);
  }


  getOneById(id) {
    return this.galleryService
              .get(`/${id}`)
              .then(response => response.data);
 
  }

  getOneDelete(id) {
    return this.galleryService
              .delete(`/${id}`)
              .then(response => response.data)
              .catch( (err) => console.log(err));
  }

}

const galleryService = new GalleryService();

export default galleryService;
