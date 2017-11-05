import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  Router, IndexRoute,
  hashHistory, browserHistory
} from 'react-router';
// add in draft js
import {
  Editor,
  EditorState,
  ContentState,
  EditorBlock,
  Modifier,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';

const displayMessage =
  'The React Redux Boilerplate is running successfully!';
// class component

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      owner: '',
      collaborators: [],
      tAlignment: 'left',
      colorValue: '#000',
      selectedColor: 'black',
      selectedFontSize: 14,
      selectedFont: 'Ariel',
      currDocContents: '',
    };
    this.onChange = this.onChange.bind(this);
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }
  componentWillMount(){
    // when a new update is received from the server, take that and render it
    socket.on('update', function(newDocContents) {
      const docJSON = JSON.parse(newDocContents);
      const contentState = convertFromRaw(docJSON);
      this.setState({
        editorState: EditorState.createWithContent(contentState)
      });
    }.bind(this))
  }
  componentDidMount() {
    fetch(`http://localhost:3000/getDoc/${this.props.match.params.docId}`)
      .then((resp) => {
        console.log('resp', resp)
        return resp.json();
        })
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.success) {
            console.log("%%%%%%%%%%%%%%%")
            const doc = responseJson.doc;
            console.log("doc history: " + doc.history );
            const rawContentState = JSON.parse(doc.history[doc.history.length - 1]);
            const contentState = convertFromRaw(rawContentState);
            const newEditorState = EditorState.createWithContent(contentState);
            console.log("this: " + this);
            this.setState({
              title: doc.title,
              owner: doc.owner,
              editorState: newEditorState
            })
        }
        else { console.log('error') }
      })
      .catch((err) => { console.log(err) })
  }
  onChange(editorState) {
    // when someone changes the text in the editor,
    // update the editor state
    this.setState({editorState: editorState});
    // emit an update event with the new text
    var rawDoc = convertToRaw(editorState.getCurrentContent());
    var docContents = JSON.stringify(rawDoc);
    socket.emit('update', docContents);
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE'
    ));
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ITALIC'
    ));
  }
  _onHighlightClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'HIGHLIGHT'
    ));
  }
  // Editor calls this method, you need to call toggleBlockType
  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    switch (type){
      case 'blockquote':
        return 'superFancyBlockquote';
      case 'align-left':
        return 'align-left';
      case 'align-right':
        return 'align-right';
      case 'align-center':
        return 'align-center';
      default:
        return 'align-left';
    }
  }
  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState, blockType
  ));
  }

  changeColor(event) {
    var newColor = event.target.value;
    this.setState({selectedColor: newColor});
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      newColor.toUpperCase()
    ));
    console.log("new color is: " + this.state.selectedColor);
  }

  changeFontSize(event) {
    var newFontSize = event.target.value;
    this.setState({selectedFontSize: newFontSize});
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      newFontSize
    ));
    console.log("new font size: " + this.state.selectedFontSize);
  }

  changeFont(event){
    var newFont = event.target.value;
    this.setState({selectedFont: newFont});
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      newFont.toUpperCase()
    ));
  }

  saveDocument(){
    // convert the current content of the editor into JSON
    var rawDoc = convertToRaw(this.state.editorState.getCurrentContent());
    var docContents = JSON.stringify(rawDoc);
    // send a post request to '/documentID/save'
    return fetch(`http://localhost:3000/save/${this.props.match.params.docId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currDocContents: [docContents]
      })
    })
    // gets the response
    .then((response) => {
      console.log('RESPONSE INSIDE save document', response)
      return response.json();
    })
    // gets the response once it's parsed into json
    .then((responseJson) => {
      if (responseJson.success) {
        console.log('response inside save document', responseJson)
      } else {
        console.log('ISSUE 4.5')
      }
    })
    .catch((err) => { console.log('there was an error', err) })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header navbar-right">
              <a className="navbar-brand" href="#">Collaborative Notes</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a onClick={()=>this.props.history.goBack()}><span className='glyphicon glyphicon-arrow-left'></span> Back</a></li>
              <li><a href="#">Invite Collaborators</a></li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2>{this.state.title}</h2>
              <p>Owned by: {this.state.owner}</p>
              <p>Document id: {this.props.match.params.docId}</p>
              <div className='btn-toolbar' role='toolbar'>
                <div className='btn-group' role='group'>
                  <button className='btn btn-default' onClick={this._onBoldClick.bind(this)}><span className='glyphicon glyphicon-bold'></span></button>
                  <button className='btn btn-default' onClick={this._onItalicClick.bind(this)}><span className='glyphicon glyphicon-italic'></span></button>
                  <button className='btn btn-default' onClick={this._onUnderlineClick.bind(this)}><span className='glyphicon glyphicon-text-color'></span></button>
                </div>
                <div className='btn-group' role='group'>
                  <button className='btn btn-default' onClick={() => this.toggleBlockType('align-left')}><span className='glyphicon glyphicon-align-left'></span></button>
                  <button className='btn btn-default' onClick={() => this.toggleBlockType('align-center')}><span className='glyphicon glyphicon-align-center'></span></button>
                  <button className='btn btn-default' onClick={() => this.toggleBlockType('align-right')}><span className='glyphicon glyphicon-align-right'></span></button>
                </div>
                <div className='btn-group' role='group'>
                  <button className='btn btn-default' onClick={this._onHighlightClick.bind(this)}><span className='glyphicon glyphicon-text-background'></span></button>
                  <button className='btn btn-default' onClick={() => this.toggleBlockType('blockquote')}>Blockquote</button>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <select value={this.state.selectValue} onChange={this.changeFont.bind(this)}>
                <option defaultValue value="Arial">- font -</option>
                <option value="Arial">Arial</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
              <select
                value={this.state.selectValue}
                onChange={this.changeColor.bind(this)}>
                <option defaultValue value="black">- color -</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="violet">Violet</option>
                <option value="black">Black</option>
              </select>
              <select
                value={this.state.selectValue}
                onChange={this.changeFontSize.bind(this)}>
                <option defaultValue value="">- size -</option>
                <option value="10">10</option>
                <option value="14">14</option>
                <option value="18">18</option>
                <option value="24">24</option>
                <option value="36">36</option>
                <option value="48">48</option>
                <option value="86">86</option>
              </select>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12' id='content'>
              <div className='editor well' id='editor-well' onClick={this.focus}>
                <Editor
                  customStyleMap={styleMap}
                  editorState={this.state.editorState}
                  textAlignment={this.state.tAlignment}
                  onChange={this.onChange}
                  blockStyleFn={this.myBlockStyleFn.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              {/* <button className='btn btn-primary' onClick={() => this.updateDoc()}><span className='glyphicon glyphicon-floppy-disk'></span> Update</button> */}
              <button className='btn btn-primary' onClick={() => this.saveDocument()}><span className='glyphicon glyphicon-floppy-disk'></span> Save</button>
              <button className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span> Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// This object provides the styling information for our custom color
// styles.
const styleMap = {
  'ARIAL': {
    fontFamily: 'Arial'
  },
  'COMIC SANS MS': {
    fontFamily: 'Comic Sans MS'
  },
  'TAHOMA': {
    fontFamily: 'Tahoma'
  },
  'TIMES NEW ROMAN': {
    fontFamily: 'Times New Roman'
  },
  'HIGHLIGHT': {
    backgroundColor: 'lightgreen'
  },
  'RED': {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  'ORANGE': {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  'YELLOW': {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  'GREEN': {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  'BLUE': {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  'INDIGO': {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  'VIOLET': {
    color: 'rgba(127, 0, 255, 1.0)',
  },
  'BLACK': {
    color: 'rgba(0, 0, 0, 1.0)'
  },
  '10': { fontSize: 10 },
  '14': { fontSize: 14 },
  '18': { fontSize: 18 },
  '24': { fontSize: 24 },
  '36': { fontSize: 36 },
  '48': { fontSize: 48 },
  '86': { fontSize: 86 },
};


export default TextEditor;
