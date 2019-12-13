import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import taskService from '../lib/task-service';

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
          <label>Task:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />

          <input type="submit" value="ADD" />
        </form>
        {this.state.listOfTasks.map(task => {
          return (
            <div key={task._id} className="gallery">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
                <h3>{task.name}</h3>
                <p>{task.description}</p>
           
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(Task);
