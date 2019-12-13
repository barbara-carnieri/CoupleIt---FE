import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
// import  paintingService from '../lib/newPaintingCopy';
import galleryService from '../lib/gallery-service';
// import { Route, Redirect } from 'react-router-dom';


class GalleryDetail extends Component {
  state = { 
    title: '', 
    photoUrl: '',
  };

  getPhotoDetail(id) {
    galleryService.getOneById(id).then(
      thePhoto => {
        this.setState({title: thePhoto.title,
        photoUrl: thePhoto.photoUrl})
        console.log('RESSS', this.state);
        
      }
    );
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    this.getPhotoDetail(id)
  
  }

  deletePhoto(id) {
    galleryService.getOneDelete(id)
    .then( () => this.props.history.push('/gallery')) // causes Router URL change
    .catch( (err) => console.log(err));
  }

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   const { title, photoUrl } = this.state;
  //   // const { coupleId } = this.props; 
  //   //  console.log('Gallery -> form submit', { title, photoUrl });
  //   galleryService.createGallery({ title, photoUrl }); 

  // };


  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value });
  // };


  // fileChange = (event) => {
  //   const file = event.target.files[0];
  //   const uploadData = new FormData()
  //   uploadData.append('photo', file)
  //   paintingService.imageUpload(uploadData)
  //   .then((image) => {
  //       this.setState({ photoUrl: image })
  //   })
  //   .catch((error) => console.log(error))
  // }

  render() {
    // const { title, photoUrl} = this.state;
    return (
      <div>
        <h1>Your photo</h1>
      
                <h3>{this.state.title}</h3>
                 <img src={this.state.photoUrl} alt="gallerydetail"/>

                 <button 
                 onClick={() => this.deletePhoto(this.props.match.params.id)}>
    	          Delete
      	        </button>
   
        <Link to={'/gallery'}> Return Page</Link>
      </div>
    );
  }
}


export default withAuth(GalleryDetail);

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
