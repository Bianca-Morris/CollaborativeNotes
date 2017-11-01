import React from 'react';
import {
  Router, IndexRoute,
  hashHistory, browserHistory
} from 'react-router';
import { Route, Link } from 'react-router-dom';

var dummyArray = ['james', 'sandra', 'notes', 'English paper', 'amazing esssaaay'];

// class component
class DocumentManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentTitle: '',
      idToShare: '',
    }
  }
  shareDocument() {

  }
  getDocument() {
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
          <h3>Documents List</h3>
          <input
            type="text"
            name="documentTitle"
            className="form-control"
            onChange={(event) => this.setState({ documentTitle: event.target.value } )}
          ></input>
          <button className="btn" onClick={() => this.createDocument() }>Create Document</button>
          <ul>
            { dummyArray.map(item => (<li>{item}</li>)); }
          </ul>
          <input
            type="text"
            name="idToShare"
            className="form-control"
            onChange={(event) => this.setState({ idToShare: event.target.value } )}
          ></input>
          <button className="btn" onClick={() => this.shareDocument() }>Share Document</button>
    );
  }
}

export default DocumentManager;
