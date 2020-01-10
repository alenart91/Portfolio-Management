import React from 'react';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {

    return (
      <React.Fragment>
        <div className = {this.props.theme}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  };
}

export default Layout
