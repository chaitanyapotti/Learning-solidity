import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class App extends Component {
  render() {
    const { children } = this.props || {};
    return <div>{children}</div>;
  }
}

export default withRouter(App);
