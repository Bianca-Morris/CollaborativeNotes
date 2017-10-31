
      const {Editor, EditorState, Modifier, RichUtils} = Draft;
      class ColorfulEditorExample extends React.Component {
        constructor(props) {
          super(props);
          this.state = {editorState: EditorState.createEmpty()};
          this.focus = () => this.editor.focus();
          this.onChange = (editorState) => this.setState({editorState});
          this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
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
        render() {
          const {editorState} = this.state;
          return (
            <div style={styles.root}>
              <ColorControls
                editorState={editorState}
                onToggle={this.toggleColor}
              />
              <div style={styles.editor} onClick={this.focus}>
                <Editor
                  customStyleMap={colorStyleMap}
                  editorState={editorState}
                  onChange={this.onChange}
                  placeholder="Write something colorful..."
                  ref={(ref) => this.editor = ref}
                />
              </div>
            </div>
          );
        }
      }
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


      ReactDOM.render(
        <ColorfulEditorExample />,
        document.getElementById('target')
      );
    </script>
  </body>
</html>
