import React from 'react';

// class component
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
  }
  postSignup() {
    console.log('Attempting to register user...');
    fetch('http://localhost:3000/signup', {
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
      console.log('Response received from server. Parsing...', response)
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.success) {
        console.log("Login successful!");
        this.props.history.goBack();
      } else {
        console.log("Login was unsuccessful.")
      }
    })
    .catch((err) => {
      console.log('Error: Could not complete registration. ', err)
    })
  }
  
  render() {
    return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-6'>
              <h3>Sign Up</h3>
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
              <button className="btn btn-primary" onClick={() => this.postSignup()}>Register</button>
            </div>
          </div>
        </div>
    );
  }
}

export default Signup;
