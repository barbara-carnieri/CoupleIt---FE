import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import  paintingService from '../lib/newPaintingCopy';
import galleryService from '../lib/gallery-service';

class Gallery extends Component {
  state = { 
    title: '', 
    photoUrl: '',
    listOfGallery: [],
  };
  // state = {
  //   listOfGallery: [],
  // };

  componentDidMount() {
    galleryService.getCoupleGallery().then(
      listOfGallery => {
        this.setState({listOfGallery})
        // console.log('RESSS', res);
        
      }
    );
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { title, photoUrl } = this.state;
    // const { coupleId } = this.props; 
    //  console.log('Gallery -> form submit', { title, photoUrl });
    galleryService.createGallery({ title, photoUrl }); 

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
    const { title, photoUrl} = this.state;
    return (
      <div>
        <h1>Add your Photo!</h1>
        <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          <label>Photo:</label>
          <input
            type="file"
            name="photoUrl"
            // value={photoUrl}
            onChange={e => this.fileChange(e)}
          />

          <input type="submit" value="ADD" />
        </form>

        {this.state.listOfGallery.map(gallery => {
          return (
            <div key={gallery._id} className="gallery">
              <Link to={`/gallery/${gallery._id}`}>
                <h3>{gallery.title}</h3>
                {/* <img>{gallery.photoUrl}</p> */}
              </Link>
            </div>
          );
        })}


        {/* <p>Already have account?</p> */}
        <Link to={'/home'}> Home Page</Link>
      </div>
    );
  }
}

export default withAuth(Gallery);

// {this.state.listOfGallery.map(gallery => {
//   return (
//     <div key={gallery._id} className="gallery">
//       <Link to={`/gallery/${gallery._id}`}>
//         <h3>{gallery.title}</h3>
//         {/* <img>{gallery.photoUrl}</p> */}
//       </Link>
//     </div>
//   );
// })}
