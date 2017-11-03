import React from 'react';

// class component
class BSAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var alertType = "alert alert-" + this.props.alertType;
    return (
          <div className={alertType} role="alert">
            <strong>{this.props.header}</strong> {this.props.msg}
          </div>
    );
  }
}

export default BSAlert;
