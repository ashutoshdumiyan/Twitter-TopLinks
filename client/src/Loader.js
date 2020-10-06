import React, { Component } from "react";

// A nice looking loading animation component
class Loader extends Component {
  render() {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Loader;
