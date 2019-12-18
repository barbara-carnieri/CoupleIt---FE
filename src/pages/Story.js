import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    this.fetchStories()
  }

  fetchStories(){
    storyService.getStories()
    .then(listOfStories => this.setState({listOfStories}))
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { date, title, description, type } = this.state;
    console.log(this.state)
    // const { coupleId } = this.props; 
    //  console.log('Gallery -> form submit', { title, photoUrl });
    storyService.createStory({ date, title, description, type })
    .then(() => this.fetchStories())
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  deleteStory(id) {
    storyService.getOneDelete(id)
    .then( () => this.props.history.push('/story')) // causes Router URL change
    .then(() => this.fetchStories())
    .catch( (err) => console.log(err));
  }


  render() {
    const { date, title, description, type } = this.state;

    return (
      <div>
        <h1>Countdown Story</h1>
        <form onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label></label>
          <input className="form-control"
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
          </div>
          <div className="form-group">
          <label></label>
          <input className="form-control"
            type="text"
            name="title"
            placeholder="Enter story"
            value={title}
            onChange={this.handleChange}
          />
          </div>
          {/* <div className="form-group">
          <label></label>
          <input className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />
          </div> */}
          <div className="form-group">
          <label htmlFor="exampleFormControlSelect1"></label>
          <div className="d-flex">
          <select className="form-control" id="exampleFormControlSelect1"
            name="type"
            value={type}
            onChange={this.handleChange}>
            <option hidden>Select a type</option>
            <option>Special Date</option>
            <option>Family</option>
            <option>Friends</option>
            <option>Anniversary</option>
          </select>
          <button type="submit" className="btn btn-success pb-0" value="ADD">
          <i className="material-icons">add_circle</i>
          </button>
          </div>
          </div>
        </form>

        

        {this.state.listOfStories.map(story => {
          
          return (
            <div key={story._id} className="story">
            <h6 className="mt-4"><DateCountdown dateTo={story.date}/> </h6>
               <h2><span className="badge badge-info">{story.title} {story.date}</span></h2>
                {/* <h3>Story: {story.title}</h3> */}
                <div className="d-flex justify-content-between">
                <h4 className="pl-2">{story.type}</h4>
    	          <button className="btn btn-success btn-sm pb-0 mb-0"><i onClick={() => this.deleteStory(story._id)} className="material-icons ">delete_forever</i></button>
                </div>
            </div>
          );
        })}


        {/* <Link to={'/home'}> Home </Link> */}


        <Footer />
      </div>

    );
      
  }
}

export default withAuth(Story);


