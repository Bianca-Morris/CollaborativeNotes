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
      // idToShare: '',
      // docTitle: '',
      // docContents: '',
      // collaborators: [],
      // docPassword: '',
      // history: [],
      myDocuments: [],
      sharedDocuments: [],
      sharedDocPass: null,
      errors: []
    }
  }
  componentWillMount(){
    // fetch the user's authored & collaborative documents
    fetch('http://localhost:3000/fetchdocs', {
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
      // update the appropriate piece of state with said documents
    // fetch documents shared with the user

  }

  shareDocument() {

  }
  getDocument() {
    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password,
    //   })
    // })
    //   .then((response) => {
    //     console.log('RESPONSE INSIDE get login', response)
    //     return response.json();
    //   })
    //   .then((responseJson) => {
    //     if (responseJson.success) {
    //       console.log('response inside get login', responseJson)
    //     } else {
    //       console.log('ISSUE 4.5')
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('there was an error', err)
    //   })
  }
  openPrompt() {
    var userInput = prompt()
  }
  createDocument() {
    console.log("Attempting to create new document titled: " + this.refs.documentTitle.value);
    fetch('http://localhost:3000/createdoc', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        docTitle: this.refs.documentTitle.value
      })
    })
    .then((response) => {
      console.log('Received response from express server. Parsing...', response)
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.success) {
        // delete the name of the doc from the input box
        this.refs.documentTitle.value = null;
        // update the state with new document
        console.log('New document object created: ', responseJson)
      } else {
        console.log('Document was not created.')
      }
    })
    .catch((err) => {
      console.log('Error creating document.', err)
    });
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <Link to='/signup'>Signup</Link><br/>
            <Link to='/login'>Login</Link><br/>
            <Link to='/editor'>Text Editor</Link><br/>
            <div className="col-md-6 offset-6">
              <h3>Documents List {this.state.documentTitle}</h3>
              <input
                type="text"
                ref="documentTitle"
                placeholder="New Document Name Here"
                className="form-control"
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
          </div>
        </div>
    );
  }
}

export default DocumentManager;
