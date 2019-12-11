import React, { Component } from 'react';
import { Switch} from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';
import Navbar from './components/Navbar';

import Profile from './pages/Profile';
import Task from './pages/Task';
import Calendar from './pages/Calendar';
import Story from './pages/Story';
import Gallery from './pages/Gallery';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <h1>Basic React Authentication</h1> */}

        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/private" component={Private} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/calendar" component={Calendar} />
          <PrivateRoute exact path="/task" component={Task} />
          <PrivateRoute exact path="/story" component={Story} />
          <PrivateRoute exact path="/gallery" component={Gallery} />
        </Switch>
      </div>
    );
  }
}

export default App;
