import React, { Component } from 'react';
import { withAuth } from '../lib/AuthProvider';
import { Link } from 'react-router-dom';
import taskService from '../lib/task-service';
import galleryService from '../lib/gallery-service';


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
    return (
      <div>
        <h1>Home Route</h1>
        <div>
        {this.state.tasks.slice(0,3).map(task => {
          return (
            <div key={task._id} className="gallery">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
                <h3>{task.name}</h3>
                <p>{task.description}</p>
           
            </div>
          )
        })}
        </div>
        <div>
        {this.state.gallery.slice(0,3).map(gallery => {
          return (
            <div key={gallery._id} className="gallery">
              <Link to={`/gallery/${gallery._id}`} {...this.props}>
                <h3>{gallery.title}</h3>
                 <img src={gallery.photoUrl} alt="photoUrl"/>
              </Link>
            </div>
          )
        })}
        </div>
       
      </div>
    );
  }
}

export default withAuth(Home);
