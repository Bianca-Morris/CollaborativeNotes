import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Router, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Signup from './Signup';
import Login from './Login';
import TextEditor from './TextEditor';
import DocumentManager from './DocumentManager';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class App extends Component {
  constructor(props){
    super(props);
    socket.on('connect', function() {
      console.log('client connected to' + socket.id + '!');
    });
  }
  render() {
    return (
      <div>
        <Route path='/' exact component={(props) => <Login {...props} socket={socket} />}/>
        <Route path='/signup' exact component={Signup} />
        <Route path='/editor/:docId' component={(props) => <TextEditor {...props} socket={socket}/>} />
        <Route path='/documentmanager' exact component={(props) => <DocumentManager {...props} socket={socket}/> } />
      </div>
    )
  }
}

// const Signup = () => <Signup></Signup>
// const Login = () => <Login></Login>
// const TextEditor = () => <TextEditor></TextEditor>

export default App;
