import Axios from "axios";
import React from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
// import { TwitterTweetEmbed } from "react-twitter-embed";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./Loader";
import Tweet from "./Tweet";

class App extends React.Component {
  state = {
    user: {},
    error: null,
    authenticated: false,
    topuser: [],
    loading: false,
    currItems: [],
    tweets: [],
    currentPage: 0,
  };

  componentDidMount() {
    Axios.get("/auth/login/success")
      .then((res) => {
        this.setState({
          authenticated: true,
          user: res.data.user,
          loading: true,
        });
        this.notify(
          "If your friends list is large, it may take some time to load you data. So, be patient."
        );
        Axios.get("/tweets").then((res) => {
          this.setState({ loading: false });
          this.notify("Your data has been fetched");
          console.log(res.data.tweets);
          let temp = [];
          res.data.tweets.forEach((val, index) => {
            val.tweets.forEach((vl, ind) => {
              temp.push(vl);
            });
          });
          let rs = [];
          let tp = temp.slice(0, 10);
          tp.forEach((val, index) => {
            rs.push(<Tweet key={index} data={val} />);
          });
          this.setState({ tweets: temp, currItems: rs, currentPage: 1 });
        });
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
    Axios.post("/tweets")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.open("http://localhost:5000/auth/logout", "_self");
    this.handleNotAuthenticated();
  };

  notify = (text) => {
    toast(text);
  };

  renderControl = () => {
    if (this.state.authenticated === true) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href={`https://twitter.com/${this.state.user.screenName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="profilepic2"
                src={this.state.user.profileImageUrl}
                alt="current user"
              />
            </a>
          </li>
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
          {this.renderControl()}
        </div>
      </nav>
    );
  };

  changeCurrentPage = (numPage) => {
    // const pg = this.state.currentPage;
    let temp = this.state.tweets.slice(numPage * 10 - 10, numPage * 10);
    // console.log(pg, temp);
    let res = [];
    temp.forEach((val, index) => {
      res.push(<Tweet key={index} data={val} />);
    });
    this.setState({ currentPage: numPage, currItems: res });
  };

  renderTweets = () => {
    if (this.state.loading === true) {
      return <Loader />;
    } else {
      const l = this.state.tweets.length;
      return (
        <React.Fragment>
          {this.state.currItems}
          <Pagination
            currentPage={this.state.currentPage}
            totalSize={l}
            sizePerPage={10}
            changeCurrentPage={this.changeCurrentPage}
            theme="bootstrap"
          />
        </React.Fragment>
      );
    }
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
              {this.renderTweets()}
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <h2 style={{ textAlign: "center", color: "#309eb6" }}>
                User with the most links shared is:
              </h2>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <img
                  className="profilepic"
                  src={this.state.topuser[2]}
                  alt="Profile"
                />
                <span>{this.state.topuser[0]}</span>
                <br />
                <br />
                <a
                  href={`https://twitter.com/${this.state.topuser[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://abs.twimg.com/favicons/twitter.ico"
                    alt="profile link"
                  />
                  Go to Twitter profile
                </a>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <h2 style={{ textAlign: "center", color: "#309eb6" }}>
                The top shared domains are:
              </h2>
              <div className="list-group">
                <a href="/" className="list-group-item list-group-item-action">
                  Cras justo odio
                  <span
                    style={{ float: "right" }}
                    className="badge badge-primary badge-pill bpill"
                  >
                    14
                  </span>
                </a>
                <a href="/" className="list-group-item list-group-item-action">
                  Dapibus ac facilisis in
                  <span
                    style={{ float: "right" }}
                    className="badge badge-primary badge-pill bpill"
                  >
                    12
                  </span>
                </a>
                <a href="/" className="list-group-item list-group-item-action">
                  Morbi leo risus
                  <span
                    style={{ float: "right" }}
                    className="badge badge-primary badge-pill bpill"
                  >
                    9
                  </span>
                </a>
                <a href="/" className="list-group-item list-group-item-action">
                  Porta ac consectetur ac
                  <span
                    style={{ float: "right" }}
                    className="badge badge-primary badge-pill bpill"
                  >
                    5
                  </span>
                </a>
              </div>
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
        <ToastContainer draggable={false} transition={Zoom} autoClose={6000} />
      </div>
    );
  }
}

export default App;
