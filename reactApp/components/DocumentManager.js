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
      idToShare: '',
      docTitle: '',
      docContents: '',
      collaborators: [],
      docPassword: '',
      history: [],
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
  openPrompt() {
    var userInput = prompt()
  }
  createDocument() {
    fetch('http://localhost:3000/createdoc', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: '59fa128fd8a7a221b133c41e', // props
        collaborators: this.state.collaborators, // state
        docPassword: this.state.docPassword, // state
        docTitle: this.state.doc, //
        history: [this.state.docContents]
      })
    })
    .then((response) => {
      console.log('RESPONSE INSIDE POSTsignup', response)
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
          <h3>Documents List</h3>
          <input
            type="text"
            name="documentTitle"
            className="form-control"
            onChange={(event) => this.setState({ documentTitle: event.target.value } )}
          ></input>
          <button className="btn" onClick={() => this.createDocument() }>Create Document</button>
          <ul>
            { dummyArray.map(item => (<li>{item}</li>)) }
          </ul>
          <input
            type="text"
            name="idToShare"
            className="form-control"
            onChange={(event) => this.setState({ idToShare: event.target.value } )}
          ></input>
          <button className="btn" onClick={() => {
            this.shareDocument()
            this.openPrompt()
         } }>Share Document</button>
         </div>
    );
  }
}

export default DocumentManager;
