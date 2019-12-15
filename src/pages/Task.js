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
    this.fetchTask()
  }

  fetchTask() {
    taskService.getTasks()
    .then(listOfTasks => this.setState({listOfTasks}))
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, description } = this.state;
    // const { coupleId } = this.props; 
    //  console.log('Gallery -> form submit', { title, photoUrl });
    taskService.createTask({ name, description});
    this.fetchTask()
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  deleteTask(id) {
    taskService.getOneDelete(id)
    .then( () => this.props.history.push('/task'))
    .then(() => this.fetchTask()) // causes Router URL change
    .catch( (err) => console.log(err));
  }


  render() {
    const { name, description} = this.state;
    return (
      <div>
        <h1>To Do's</h1>
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


          <button type="submit" className="btn btn-success" value="ADD">
          <i class="material-icons">add_circle</i>
          </button>
        </form>
        {this.state.listOfTasks.map(task => {
          return (
            <div key={task._id} className="gallery card-deck">
              <div id="taskcard" className="card text-white bg-warning mb-3 mt-3" >
              <div className="card-header"><h5>{task.name}</h5></div>
              <div className="d-flex flex-row-reverse justify-content-between card-body">
                <button className="btn btn-success btn-sm pb-4"
                onClick={() => this.deleteTask(task._id)}>
    	          <i class="material-icons">delete_forever</i>
      	        </button>
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
