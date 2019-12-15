import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../lib/AuthProvider';
import storyService from '../lib/story-service';

import DateCountdown from 'react-date-countdown-timer';

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
    console.log(this.state)
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
        <h1>Countdown Story</h1>
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
          <label htmlFor="exampleFormControlSelect1">Type:</label>
          <select className="form-control" id="exampleFormControlSelect1"
            name="type"
            value={type}
            onChange={this.handleChange}>
            <option>Birthday</option>
            <option>Family</option>
            <option>Friends</option>
            <option>Special Anniversary</option>
          </select>
          </div>
          <button type="submit" className="btn btn-success" value="ADD">
          <i class="material-icons">add_circle</i>
          </button>
        </form>

        

        {this.state.listOfStories.map(story => {
        
          return (
            <div key={story._id} className="story">
            <h3><DateCountdown dateTo={story.date} /> </h3>
               <h3>{story.title} {story.date}</h3>
                {/* <h3>Story: {story.title}</h3> */}
                <p>{story.type}</p>
                <button className="btn btn-success"
                onClick={() => this.deleteStory(story._id)}>
    	          <i class="material-icons ">delete_forever</i>
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


