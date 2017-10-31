import React from 'react';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';

const displayMessage =
  'The React Redux Boilerplate is running successfully!';

// class component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      tAlignment: 'left',
      color: '#000',
      colorValue: '#000',
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  }
  _handleChange(e){
    console.log('colorValue', colorValue);
    this.setState({colorValue: e.target.value});
    console.log(colorValue);
  }
  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    console.log('NEXT EDITOR STATE', nextEditorState);
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    this.onChange(nextEditorState);
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
  _onRedClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'RED'
    ));
  }
  _onOrangeClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ORANGE'
    ));
  }
  _onRightAlignClick() {
    this.setState({tAlignment: 'right'});
  }
  changeColor(value) {
    console.log('dropdown.value', dropdown.value)
  }
  render() {
    return (
      <div id='content'>
        <h1>Draft.js Editor</h1>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._onItalicClick.bind(this)}>Italic</button>
        <button onClick={this._onUnderlineClick.bind(this)}>Underline</button>
        <button onClick={this._onRightAlignClick.bind(this)}>Right Align</button>
        <button onClick={this._onHighlightClick.bind(this)}>Highlight</button>
        <select
          value={this.state.selectValue}
          onChange={this._handleChange} >
          <option value="red">Red</option>
          <option value="orange">Orange</option>
        </select>
        <ColorControls
          editorState={this.state.editorState}
          onToggle={this.toggleColor}
        />
        <div className='editor' onClick={this.focus}>
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            textAlignment={this.state.tAlignment}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
};



class StyleButton extends React.Component {
  constructor(props) {
    super(props);
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
  }
  render() {
    let style;
    if (this.props.active) {
      style = {...styles.styleButton, ...colorStyleMap[this.props.style]};
    } else {
      style = styles.styleButton;
    }
    return (
      <span style={style} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var COLORS = [
  {label: 'Red', style: 'red'},
  {label: 'Orange', style: 'orange'},
  {label: 'Yellow', style: 'yellow'},
  {label: 'Green', style: 'green'},
  {label: 'Blue', style: 'blue'},
  {label: 'Indigo', style: 'indigo'},
  {label: 'Violet', style: 'violet'},
];


const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div style={styles.controls}>
      {COLORS.map(type =>
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

// This object provides the styling information for our custom color
// styles.
const styleMap = {
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
};

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    fontSize: 14,
    padding: 20,
    width: 600,
  },
  editor: {
    borderTop: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    marginTop: 20,
    minHeight: 400,
    paddingTop: 20,
  },
  controls: {
    fontFamily: '\'Helvetica\', sans-serif',
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none',
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0',
  },
};

/* Equivalent function component! */
// const App = (/* props OR { prop1, prop2 } */) => (
//    <div>
//      <p>{displayMessage}</p>
//    </div>
// );


/*
==========================================================
  This is what you do if you want this component or any
  other to become a connected "container" component!
==========================================================
*/
// /* At top of file: */
// import { connect } from 'react-redux';
//
// /* At bottom of file: */
// const mapStateToProps = (state) => ({
//    someStateProp: /* state.something typically */
// });
//
// const mapDispatchToProps = (dispatch) => ({
//    someDispProp: /* some function that dispatches an action */
// });
//
// App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
