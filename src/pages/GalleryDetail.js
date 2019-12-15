import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
// import  paintingService from '../lib/newPaintingCopy';
import galleryService from '../lib/gallery-service';
// import { Route, Redirect } from 'react-router-dom';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon} from 'react-share';
import Footer from '../components/Footer';

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
    const shareUrl = this.state.photoUrl;
  
    return (
      <div>
        <div id="card-gallerydetail" className="container">
        <div className="row">
        <div className="col-md-6">
        {/* <div id="card-gallerydetail" > */}
                 <img className="img-fluid" src={this.state.photoUrl} alt="gallerydetail"/>
            
                <div className="carousel-caption d-flex justify-content-end align-items-bottom p-0 m-0 ">
                <h4 className="pr-5">{this.state.title}</h4>
                <FacebookShareButton url={shareUrl} title={this.state.title}>
                <FacebookIcon size={36} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl} title={this.state.title}>
                <WhatsappIcon size={36} round={true} />
                </WhatsappShareButton>
                 
    	          <i className="material-icons pt-1" onClick={() => this.deletePhoto(this.props.match.params.id)}>delete_forever</i>
      	       
                </div>
                </div>
                </div>
                </div>
        <Link to={'/gallery'}>
        <i class="material-icons">keyboard_return</i>
        </Link>

        <Footer />
      </div>
    );
  }
}


export default withAuth(GalleryDetail);


