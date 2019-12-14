import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';
import taskService from '../lib/task-service';
import galleryService from '../lib/gallery-service';
import Footer from '../components/Footer';


class Home extends Component {
  state = {
    tasks: [],
    gallery: []
  }

  getTasks() {
    taskService.getTasks()
    .then(tasks => this.setState({tasks}))
  }

  getGallery() {
    galleryService.getCoupleGallery()
    .then(gallery => this.setState({gallery}))
  }

  componentDidMount() {
    this.getTasks()
    this.getGallery()
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Home Route</h1>

        <div>
            <h5> You and {user.username} are connected! </h5>
        </div>

        <div>
        <Link to={'/task'}><h3>To Do!</h3></Link>
        
        <div id="card-home" className="container-fluid">
 
        {this.state.tasks.slice(0,3).map(task => {
          return (
            <div key={task._id} className="card-task">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
              <div  className="card text-white bg-warning sm mb-3 mt-3" >
              <div className="card-header"><h5>{task.name}</h5></div>
              <div className="card-body">
                <p className="card-title">{task.description}</p>
                </div>
                </div>
           
            </div>
          )
        })}
        </div>
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
       
        <Link to={'/calendar'}><h3>Check out Calendar</h3></Link>

        <Footer />
      </div>
    );
  }
}

export default withAuth(Home);
