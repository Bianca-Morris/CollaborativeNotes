import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Router, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Signup from './Signup';
import Login from './Login';
import TextEditor from './TextEditor';
import DocumentManager from './DocumentManager';

class App extends Component {
  render() {
    return (
      <div>
        <Route path='/' exact component={Login} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/editor/:docId' exact component={TextEditor} />
        <Route path='/documentmanager' exact component={DocumentManager} />
      </div>
    )
  }
}

// const Signup = () => <Signup></Signup>
// const Login = () => <Login></Login>
// const TextEditor = () => <TextEditor></TextEditor>

export default App;
