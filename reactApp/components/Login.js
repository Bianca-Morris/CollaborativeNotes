import React from 'react';
import {
  Router, IndexRoute,
  hashHistory, browserHistory
} from 'react-router';
import { Route, Link } from 'react-router-dom';

// class component
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    console.log("lololololol");
  }

  postLogin() {
    console.log("Attempting login.");
    // Send user information to the express server for validation
    fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    // When a response is received, parse it
    .then((response) => {
      console.log('Recieved response from express server.', response);
      return response.json();
    })
    // Then, determine whether or not the user was logged in
    .then((responseJson) => {
      if (responseJson.success) {
        console.log('User has been successfully logged in.');
        this.props.socket.emit('changeName', this.state.username);
        // Redirect user to their document manager page
        this.props.history.push('/documentmanager');
      } else {
        console.log('User could not be logged in.');
        // Update state with appropriate error, for rendering on page
      }
    })
    .catch((err) => {
      console.log('Login error.', err)
    })
  }

  render() {
    return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-6'>
              <h3>Login</h3>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={(event) => this.setState({ username: event.target.value } )}
                ></input>
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(event) => this.setState({ password: event.target.value } )}
                ></input>
              </div>
              <br/>
              <button className="btn btn-primary" onClick={() => this.postLogin()}>Login</button>
              <Link to='/signup'><button className="btn btn-success">Signup</button></Link>
              <br/>
              <Link to='/editor'>Text Editor</Link>
              <br/>
              <Link to='/documentmanager'>Document Manager</Link>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;
