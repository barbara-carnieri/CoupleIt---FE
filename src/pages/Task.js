import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import taskService from '../lib/task-service';
import Footer from '../components/Footer';

class Task extends Component {
  state = {
    name: '',
    description: '',
    listOfTasks: [],
    completed: false
  }

  componentDidMount() { 
    this.fetchTask() 
  }

  fetchTask() {
    taskService.getTasks()
    .then(listOfTasks => this.setState({listOfTasks}))
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, description, completed } = this.state;
    return taskService.createTask({ name, description, completed})
    .then(() => this.fetchTask())
    .then(() => this.setState({name: '',
    description: ''}));
    
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  deleteTask(id) {
    taskService.getOneDelete(id)
    .then(() => this.props.history.push('/task'))
    .then(() => this.fetchTask()) // causes Router URL change
    .catch( (err) => console.log(err));
  }

  crossTask(task) {
    const { name, description } = task
    const completed = true
    taskService.getOneUpdate(task._id, {name, description, completed})
    .then(() => this.fetchTask()) // causes Router URL change
    .catch( (err) => console.log(err));
  }

  render() {
    const { name, description } = this.state;
    return (
      <div>
        <h1>To Do's</h1>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label></label>
          <input className="form-control"
            type="text"
            name="name"
            placeholder="Task"
            value={name}
            onChange={this.handleChange}
          />
          </div>
 
        <div className="form-group">
          <label></label>
          <div className="d-flex">
          <input className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-success" value="ADD">
          <i className="material-icons">add_circle</i>
          </button>
          </div>
          </div>
        </form>

        {this.state.listOfTasks.map(task => {
          return (
            <div key={task._id} className="gallery card-deck">
              <div id="taskcard" className="card text-white bg-warning mb-3 mt-3" >
              <div className={task.completed ? "card-completed" : "card-header"}><h5>{task.name}</h5></div>
              <div className="d-flex flex-row-reverse justify-content-between card-body">
                <button className="btn btn-success btn-sm pb-4"
                onClick={() => this.crossTask(task)}>
    	          <i className="material-icons">done</i>
      	        </button>
                <button className="btn btn-success btn-sm pb-4"
                onClick={() => this.deleteTask(task._id)}>
    	          <i className="material-icons">delete_forever</i>
      	        </button>
                <p className={task.completed ? "card-completed" : "card-title"}>{task.description}</p>
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
