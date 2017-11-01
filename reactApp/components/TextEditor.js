import React from 'react';
import {Editor, EditorState, EditorBlock, Modifier, RichUtils} from 'draft-js';
const displayMessage =
  'The React Redux Boilerplate is running successfully!';
// class component
class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      tAlignment: 'left',
      colorValue: '#000',
      selectedColor: 'black',
      selectedFontSize: 14,
      selectedFont: 'Ariel'
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
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
    console.log('content', contentBlock);
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
    console.log("new font: " + this.state.selectedFont)
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
              <li className="active"><a href="#"><span className='glyphicon glyphicon-arrow-left'></span> Back</a></li>
              <li><a href="#">Invite Collaborators</a></li>
            </ul>
          </div>
        </nav>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h2>[File Name Here]</h2>
              <p>Owned by: [User Name Here]</p>
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
              <button className='btn btn-primary'><span className='glyphicon glyphicon-floppy-disk'></span> Save</button>
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
