import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import storyService from '../lib/story-service';

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
          <label>Date:</label>
          <input
            type="text"
            name="date"
            value={date}
            onChange={this.handleChange}
          />

          <label>Story:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
          />

          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={type}
            onChange={this.handleChange}
          />

          <input type="submit" value="ADD" />
        </form>

        {this.state.listOfStories.map(story => {
          return (
            <div key={story._id} className="story">
              {/* <Link to={`/gallery/${task._id}`} {...this.props}> */}
               <h3>Date: {story.date}</h3>
                <h3>Story: {story.title}</h3>
                <p>{story.description}</p>
                <p>{story.type}</p>
                <button 
                onClick={() => this.deleteStory(story._id)}>
    	          Delete
      	        </button>
            </div>
          );
        })}
        <Link to={'/story'}> Return Page</Link>
      </div>
    );
  }
}

export default withAuth(Story);
