import React from 'react';

// class component
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='toolbar'>
        <button onClick={this.props.boldClick()}>Bold</button>
      </div>
    );
  }
};

export default Toolbar;
