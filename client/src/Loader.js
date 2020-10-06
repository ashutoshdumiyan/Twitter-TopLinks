import React, { Component } from "react";

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
