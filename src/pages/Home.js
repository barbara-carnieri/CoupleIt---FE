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
    return (
      <div className='home'>

        <div className='connected'>
            <h5> You and {user.username} are connected! </h5>
        </div>

        <div id="story-home" className="container-fluid">
        {this.state.story.slice(0,1).map(story => {
          return (
            <div key={story._id} className="card-task">
            <div className="card-body">
            <Link to={'/story'}>
            <h5><DateCountdown dateTo={story.date} /> DAYS LEFT to {story.title}! </h5>
            </Link>
            </div>  
            </div>
          )
        })}
        </div>

        
        <div id="card-home" className="container-fluid">
        {this.state.tasks.slice(0,3).map(task => {
          return (
            <div key={task._id} className="card-task">
              <div  className="card text-white bg-warning sm mb-3 mt-3" >
              <div className="card-header"><Link to={'/task'}><h5>{task.name}</h5></Link></div>
              <div className="card-body">
                <p className="card-title">{task.description}</p>
                </div>
                </div>
            </div>
          )
        })}
        </div>


        <div>
        <Link to={'/gallery'}><h3>Gallery</h3></Link>
        {/* <div className="card-deck"> */}
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        {this.state.gallery.slice(0,3).map(gallery => {
          return (
            <div key={gallery._id} className="carousel-inner gallery">
            <div className="carousel-item active">
              <Link to={`/gallery/${gallery._id}`} {...this.props}>
                 <img src={gallery.photoUrl} className="d-block w-100" alt="photoUrl"/>
              </Link>
              </div>
            </div>
          )
        })}
        </div>
        </div>
       
        {/* <Link to={'/calendar'}><h3>Check out Calendar</h3></Link> */}

        <Footer />
      </div>
    );
  }
}

export default withAuth(Home);
