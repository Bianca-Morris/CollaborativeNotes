import React from 'react';
import BSAlert from './BSAlert';

// class component
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
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
        password2: this.state.password2
      })
    })
    .then((response) => {
      console.log('Response received from server. Parsing...', response)
      return response.json();
    })
    .then((responseJSON) => {
      if (responseJSON.success) {
        console.log("Sign up successful!");
        this.setState({ errors: this.state.errors.concat({
                                  alertType: 'success',
                                  header: 'Sign Up Successful! ',
                                  msg: 'You will be redirected to Login in 3 seconds...'
                                })
                     });
        setTimeout(() => { this.props.history.goBack(); }, 3000);
      } else {
        if (responseJSON.status === 400){
          this.setState({ errors: this.state.errors.concat({
                                    alertType: 'danger',
                                    header: 'Bad Request: ',
                                    msg: responseJSON.error
                                  })
                       });
        } else if (responseJSON.status === 500){
          this.setState(
            { errors: this.state.errors.concat(
              {
                alertType: 'danger',
                header: 'Error: ',
                msg: responseJSON.error
              })
            }
          )
        }
      }
    })
    .catch((err) => {
      console.log("error occurred in or after postSignup()'s fetch request: " + err)
      this.setState({ errors: this.state.errors.concat({
                                alertType: 'danger',
                                header: "Error: ",
                                msg: "Something went wrong! Your data may not have been saved..."
                              })
      });
    })
  }

  render() {
    return (
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 offset-6'>
              <h3>Sign Up</h3>
              { this.state.errors.map((item, i) => <BSAlert key={i} alertType={item.alertType} header={item.header} msg={item.msg}/>)}
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
              <div>
                <label>Repeat Password</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  onChange={(event) => this.setState({ password2: event.target.value } )}
                ></input>
              </div>
              <br />
              <button className="btn btn-primary" onClick={() => this.postSignup()}>Register</button>
              <button className="btn btn-secondary" onClick={() => this.props.history.goBack()}>Back to Login</button>
            </div>
          </div>
        </div>
    );
  }
}

export default Signup;
