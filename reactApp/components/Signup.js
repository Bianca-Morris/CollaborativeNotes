import React from 'react';

// class component
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  postSignup() {
    console.log('username', this.state.username)
    console.log('password', this.state.password)
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
        console.log('RESPONSE INSIDE POSTLOGIN', response)
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.success) {
          console.log('response inside postlogin', responseJson)
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
          <h3>Sign Up</h3>
          <div>
            <label>Username</label>
            <input type="text" name="username" className="form-control"></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(event) => this.setState({ username: event.target.value } )}
            ></input>
          </div>
          {/* <div className="form-group">
            <div
              className="btn btn-success"
              onPress={() => this.postSignup().bind(this) }
            >Signup</div>
          </div> */}
          <button onClick={() => this.postSignup()}>Center Align</button>
        </div>
    );
  }
}

export default Signup;
