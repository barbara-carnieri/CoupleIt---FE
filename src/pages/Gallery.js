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
    galleryService.createGallery({ title, photoUrl })
    .then(() => this.fetchGallery())
    .then(() => this.setState({title: '',
    photoUrl: ''}));;
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
          <label></label>
          <input className="form-control"
            type="text"
            name="title"
            placeholder="Something about this photo"
            value={title}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group pt-2 mt-0">
          <div className="d-flex">
          <input className="form-control"
            type="file"
            name="photoUrl"
            alt="photo"
            onChange={e => this.fileChange(e)}
          />
        <button type="submit" className="btn btn-success" value="ADD">
          <i className="material-icons">add_circle</i>
          </button>
        </div>
        </div>
        </form>

 
        <div className="row pt-2">
        {this.state.listOfGallery.map(gallery => {
          return (
            <div key={gallery._id} id="container-gallery" className="figure gallery">
              <Link className="d-block mb-2 h-40" to={`/gallery/${gallery._id}`}>
                 <img id="gallery-item" className="rounded img-fluid img-thumbnail figure-img" src={gallery.photoUrl} alt="photoUrl"/>
                
                {/* <h5 className="figure-caption text-center">{gallery.title}</h5> */}
              </Link>
              </div>
          );
        })}
    
        </div>

        {/* <Link to={'/home'}> Home Page</Link> */}

        <Footer />
      </div>
    );
  }
}

export default withAuth(Gallery);
