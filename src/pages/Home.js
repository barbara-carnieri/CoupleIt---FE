import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';
import taskService from '../lib/task-service';
import galleryService from '../lib/gallery-service';
import storyService from '../lib/story-service';
import Footer from '../components/Footer';
import DateCountdown from 'react-date-countdown-timer';


class Home extends Component {
  state = {
    tasks: [],
    gallery: [],
    story: []
  }

  getTasks() {
    taskService.getTasks()
    .then(tasks => this.setState({tasks}))
  }

  getGallery() {
    galleryService.getCoupleGallery()
    .then(gallery => this.setState({gallery}))
  }

  getStory() {
    storyService.getStories()
    .then(story => this.setState({story}))
  }

  componentDidMount() {
    this.getTasks()
    this.getGallery()
    this.getStory()
  }

  render() {
    const { user } = this.props;
    const galleryArray = this.state.gallery.length ? this.state.gallery.slice(0,3) : '';
    
    return (
      <div className='home'>

        <div className='connected'>
            <h5>{user.username}, you are connected with your partner! </h5>
        </div>

        <div id="story-home" className="container-fluid">
        {this.state.story.length ? this.state.story.slice(0,1).map(story => {
          return (
            <div key={story._id} className="card-task">
            <div className="card-body">
            <Link to={'/story'}>
            <h5><DateCountdown dateTo={story.date} /> to {story.title}! </h5>
            </Link>
            </div>  
            </div>
          )
        }) : <h2>No story yet</h2>}
        </div>

        <div>
        <Link to={'/gallery'}><h2 id="gallery-x" className="d-flex justify-content-center badge badge-info mt-4">GALLERY</h2></Link>
        {/* <div className="card-deck"> */}
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" data-interval="2000">
          { galleryArray.length === 3 ? 
            <div className="carousel-inner gallery">
            <div className="carousel-item active">
              <Link to={`/gallery/${galleryArray[0]._id}`} >
                 <img id="slides" src={galleryArray[0].photoUrl} className="d-block w-100 rounded img-fluid img-thumbnail" alt="First slide" />
              </Link>
              </div>
              <div className="carousel-item">
              <Link to={`/gallery/${galleryArray[1]._id}`} >
                 <img id="slides" src={galleryArray[1].photoUrl} className="d-block w-100 rounded img-fluid img-thumbnail" alt="Second slide"/>
              </Link>
              </div>
              <div className="carousel-item">
              <Link to={`/gallery/${galleryArray[2]._id}`} >
                 <img id="slides" src={galleryArray[2].photoUrl} className="d-block w-100 rounded img-fluid img-thumbnail" alt="Third slide"/>
              </Link>
              </div>
            </div>
          : <h2>No picture yet</h2>}
        </div>
        </div>


       <br/>
        <div id="card-home" className="container-fluid mr-0 ml-0 pr-0 pl-0">
        {this.state.tasks.length ? this.state.tasks.slice(0,3).map(task => {
          return (
            <div key={task._id} className="card-task">
              <div  className="card text-white bg-warning sm mb-3 mt-3" >
              <div id="card-header-home" className="card-header m-0 p-0"><Link to={'/task'}><h5 className="link-title-task m-0 p-0">{task.name}</h5></Link></div>
              <div id="card-body-home" className="card-body p-0">
                <p className={task.completed ? "card-completed" :"card-title m-1"}>{task.description}</p>
                </div>
                </div>
            </div>
          )
        }) : <h2 className="ml-4">No tasks yet</h2>}
        </div>
        
        {/* <Link to={'/calendar'}><h3>Check out Calendar</h3></Link> */}

        <Footer />
      </div>
    );
  }
}

export default withAuth(Home);


{/* <Link to={`/gallery/${gallery._id}`} {...this.props}> */}