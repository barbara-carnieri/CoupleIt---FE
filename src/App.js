import React, { Component } from 'react';
import { Switch} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';


import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Task from './pages/Task';
import Calendar from './pages/Calendar';
import Story from './pages/Story';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import GalleryDetail from './pages/GalleryDetail';


import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  
  render() {
    return (
      <div className="App container">
        <Navbar />
        

        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/profile/:id/edit" component={ProfileEdit} />
          <PrivateRoute exact path="/calendar" component={Calendar} />
          <PrivateRoute exact path="/task" component={Task} />
          <PrivateRoute exact path="/story" component={Story} />
          <PrivateRoute exact path="/gallery" component={Gallery} />
          <PrivateRoute exact path="/gallery/:id" component={GalleryDetail} />
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>

       
      </div>
    );
  }
}

export default App;
