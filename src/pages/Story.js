import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import storyService from '../lib/story-service';

import Footer from '../components/Footer';

class Story extends Component {
  state = {
    date: '',
    title:'',
    description: '',
    type: '',
    listOfStories: []
  }
 
  componentDidMount() {
    this.getStories()
  }

  getStories() {
    storyService.getStories()
    .then(listOfStories => this.setState({listOfStories}))
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { date, title, description, type } = this.state;
    // const { coupleId } = this.props; 
    //  console.log('Gallery -> form submit', { title, photoUrl });
    storyService.createStory({ date, title, description, type }); 
    this.getStories()
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  deleteStory(id) {
    storyService.getOneDelete(id)
    .then( () => this.props.history.push('/story')) // causes Router URL change
    .catch( (err) => console.log(err));
  }


  render() {
    const { date, title, description, type } = this.state;
    return (
      <div>
        <h1>Story Route</h1>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input className="form-control"
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Story:</label>
          <input className="form-control"
            type="text"
            name="title"
            placeholder="Enter story"
            value={title}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Description:</label>
          <input className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label>Type:</label>
          <select class="form-control" id="exampleFormControlSelect1"
            name="type"
            value={type}
            onChange={this.handleChange}>
            <option>Birthday</option>
            <option>Family</option>
            <option>Friends</option>
            <option>Special Anniversary</option>
          </select>
          </div>
          <input type="submit" className="btn btn-outline-success" value="ADD" />
        </form>

        {this.state.listOfStories.map(story => {
          return (
            <div key={story._id} className="story">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
               <h3>Date: {story.date}</h3>
                <h3>Story: {story.title}</h3>
                <p>{story.description}</p>
                <p>{story.type}</p>
                <button className="btn btn-outline-success"
                onClick={() => this.deleteStory(story._id)}>
    	          Delete
      	        </button>
            </div>
          );
        })}
        <Link to={'/home'}> Home </Link>


        <Footer />
      </div>

    );
      
  }
}

export default withAuth(Story);


{/* <input className="form-control"
type="text"
name="type"
value={type}
onChange={this.handleChange}
/> */}