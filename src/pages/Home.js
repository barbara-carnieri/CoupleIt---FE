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
            <h2> You and {user.username} are connected! </h2>
        </div>

        <div>
        <Link to={'/task'}><h3>To Do!</h3></Link>
        {this.state.tasks.slice(0,3).map(task => {
          return (
            <div key={task._id} className="gallery">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
              <div className="card text-white bg-warning mb-3 mt-3" >
              <div className="card-header"><h3>{task.name}</h3></div>
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
        <div className="card-deck">
        {this.state.gallery.slice(0,3).map(gallery => {
          return (
            <div key={gallery._id} className="card gallery">
              <Link to={`/gallery/${gallery._id}`} {...this.props}>
                {/* <h3>{gallery.title}</h3> */}
                 <img src={gallery.photoUrl} className="card-img-top" alt="photoUrl"/>
              </Link>
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
