import Axios from "axios";
import React from "react";

class App extends React.Component {
  state = {
    user: {},
    error: null,
    authenticated: false,
  };

  componentDidMount() {
    Axios.get("/auth/login/success")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }

  renderNavbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Twitter TopLinks</span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn btn-primary">Login with Twitter</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  render() {
    return (
      <div className="App">
        {this.renderNavbar()}
        <header className="App-header">hahaha</header>
      </div>
    );
  }
}

export default App;
