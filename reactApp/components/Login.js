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
  }
  postLogin() {
    console.log('POST LOGIN username', this.state.username)
    console.log('POST LOGIN password', this.state.password)
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
      .then((response) => {
        console.log('RESPONSE INSIDE get login', response)
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success) {
          console.log('response inside get login', responseJson)
        } else {
          console.log('ISSUE 4.5')
        }
      })
      .catch((err) => {
        console.log('there was an error', err)
      })
  }
  render() {
    return (
        <div>
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
          {/* <div className="form-group">
            <div
              className="btn btn-success"
              onPress={() => this.postSignup().bind(this) }
            >Signup</div>
          </div> */}
          <button onClick={() => this.postLogin()}>Login</button>
          <Link to='/signup'>Signup</Link>
          <Link to='/editor'>Text Editor</Link>
          <Link to='/documentmanager'>Document Manager</Link>
        </div>
    );
  }
}

export default Login;
