import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import taskService from '../lib/task-service';
import Footer from '../components/Footer';

class Task extends Component {
  state = {
    name: '',
    description: '',
    listOfTasks: []
  }

  componentDidMount() {
    taskService.getTasks()
    .then(listOfTasks => this.setState({listOfTasks}))
    
    
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, description } = this.state;
    // const { coupleId } = this.props; 
    //  console.log('Gallery -> form submit', { title, photoUrl });
    taskService.createTask({ name, description}); 

  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, description} = this.state;
    return (
      <div>
        <h1>Task Route</h1>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>Task:</label>
          <input className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          </div>

        <div className="form-group">
          <label>Description:</label>
          <input className="form-control"
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          </div>


          <input type="submit" className="btn btn-outline-success" value="ADD" />
        </form>
        {this.state.listOfTasks.map(task => {
          return (
            <div key={task._id} className="gallery card-deck">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
              <div className="card text-white bg-warning mb-3 mt-3" >
              <div className="card-header"><h3>{task.name}</h3></div>
              <div className="card-body">
                <p className="card-title">{task.description}</p>
                </div>
                </div>
            </div>
          );
        })}
        <Footer />
      </div>
    );
  }
}

export default withAuth(Task);
