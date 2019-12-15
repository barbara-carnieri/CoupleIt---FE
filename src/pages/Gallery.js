import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import  paintingService from '../lib/newPaintingCopy';
import galleryService from '../lib/gallery-service';
import Footer from '../components/Footer';

class Gallery extends Component {
  state = { 
    title: '', 
    photoUrl: '',
    listOfGallery: [],
  };

  componentDidMount() {
    this.fetchGallery()
  }

  fetchGallery() {
    galleryService.getCoupleGallery()
    .then(
      listOfGallery => {
        this.setState({listOfGallery})
      }
    )
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { title, photoUrl } = this.state;
    // const { coupleId } = this.props; 
    //  console.log('Gallery -> form submit', { title, photoUrl });
    galleryService.createGallery({ title, photoUrl }); 
    this.fetchGallery()
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  fileChange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)
    paintingService.imageUpload(uploadData)
    .then((image) => {
        this.setState({ photoUrl: image })
    })
    .catch((error) => console.log(error))
  }

  render() {
    const { title} = this.state;
    return (
      <div>
        <h1>Add your Photo!</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Title:</label>
          <input className="form-control"
            type="text"
            name="title"
            placeholder="Something about this photo"
            value={title}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Photo:</label>
          <input className="form-control"
            type="file"
            name="photoUrl"
            alt="photo"
            onChange={e => this.fileChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-success" value="ADD">
          <i class="material-icons">add_circle</i>
          </button>
        </form>

        <div className="container">
        <div className="row">
        
        <div className="d-flex flex-wrap">
        {this.state.listOfGallery.map(gallery => {
          return (
            <div key={gallery._id} className="gallery">
            <div className="col-md-6 pt-2">
              <Link to={`/gallery/${gallery._id}`} {...this.props}>
                 <img className="rounded img-fluid" src={gallery.photoUrl} alt="photoUrl"/>
                 <div className="carousel-caption align-items-end">
                <h5>{gallery.title}</h5>
                </div>
              </Link>
              </div>
              </div>
          );
        })}
    
        </div>
        </div>
        </div>

        {/* <Link to={'/home'}> Home Page</Link> */}

        <Footer />
      </div>
    );
  }
}

export default withAuth(Gallery);
