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
      myDocuments: [],
      sharedDocuments: [],
      sharedDocPass: null,
      errors: [],
      user: ''
    }
  }
  componentDidMount(){
    // fetch the user's authored & collaborative documents
    console.log("Attempting to retrieve documents from express server.");
    fetch('http://localhost:3000/fetchdocs', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Received response from express server. Parsing...', response)
      return response.json();
    })
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.success && responseJson.docs) {
        // update the appropriate piece of state with said documents
        this.setState({
          myDocuments: this.state.myDocuments.concat(responseJson.docs)
        });
      } else {
        console.log('Documents could not be loaded.')
      }
      this.setState({
        user: responseJson.user
      });
    })
    .catch((err) => {
      console.log('Error retrieving documents from express server.', err)
    });
    // fetch documents shared with the user
  }

  shareDocument() {

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
        this.props.history.push('/editor/' + responseJson.doc._id);
      } else {
        console.log('Document was not created.')
      }
    })
    .catch((err) => {
      console.log('Error creating document.', err)
    });
  }
  openDocument(docid) {
    socket.emit('openedDocument', docid);
    this.props.history.push("/editor/" + docid);
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <Link to='/signup'>Signup</Link><br/>
            <Link to='/'>Login</Link><br/>
            <Link to='/editor'>Text Editor</Link><br/>
            <div className="col-md-6 offset-6">
              <h3>{this.state.user}'s Portal</h3>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">My Documents</h3>
                </div>
                <div className="list-group">
                { this.state.myDocuments.map(item => (
                  <a onClick={() => this.openDocument(item._id)} className="list-group-item" key={item._id}>{item.title}</a>
                )) }
                </div>
                <div className="panel-footer">
                  <div className="input-group">
                    <span className="input-group-addon"><span className="glyphicon glyphicon-pencil"></span></span>
                    <input type="text" className="form-control" ref="documentTitle"
                      placeholder="Title your doc here..." />
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button"
                        onClick={() => this.createDocument() }>Create New Doc</button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Shared with Me</h3>
                </div>
                <div className="panel-body">
                  (Shared docs will go here)
                </div>
              </div>
              <input
                type="text"
                ref="shareId"
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
