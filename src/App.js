import Axios from "axios";
import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    user: {},
    error: null,
    authenticated: false,
  };

  componentDidMount() {
    Axios.get("/auth/login/success")
      .then((res) => {
        this.setState({ authenticated: true, user: res.data.user });
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }

  handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  handleLogin = () => {
    window.open("http://localhost:5000/auth/twitter", "_self");
  };

  handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
    this.handleNotAuthenticated();
  };

  renderControl = () => {
    if (this.state.authenticated === true) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-primary" onClick={this.handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-primary" onClick={this.handleLogin}>
              Login with Twitter
            </button>
          </li>
        </ul>
      );
    }
  };

  renderNavbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul> */}
          {this.renderControl()}
        </div>
      </nav>
    );
  };

  renderTabs = () => {
    if (this.state.authenticated) {
      return (
        <div className="container">
          <ul className="nav nav-pills nav-justified" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Tweets
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Top User
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Top Domain
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              t1, t2, t3, ...
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              user1...
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              domain1...
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <p>Sign in with your twitter account to start...</p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="App">
        {this.renderNavbar()}
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            {!this.state.authenticated ? (
              <h1 className="display-4">Welcome</h1>
            ) : (
              <h1 className="display-4">Welcome, {this.state.user.name}</h1>
            )}
            <p className="lead">
              to your twitter analysis app. View you tweets and stats.
            </p>
          </div>
        </div>
        {this.renderTabs()}
      </div>
    );
  }
}

export default App;
