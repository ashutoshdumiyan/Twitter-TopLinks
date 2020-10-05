import Axios from "axios";
import React from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import Pagination from "react-pagination-js";
import Loader from "./Loader";
import Tweet from "./Tweet";
import TopUser from "./TopUser";
import TopLinks from "./TopLinks";
import Pills from "./Pills";
import "react-pagination-js/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

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
    topcount: 0,
    toplinks: [],
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
          console.log(res.data.tweets);
          if (res.data.tweets.length === 0) {
            setTimeout(function () {
              window.location.reload();
            }, 5000);
          }
          let temp = [];
          res.data.tweets.forEach((val, index) => {
            val.tweets.forEach((vl, ind) => {
              temp.push(vl);
            });
          });
          const ob = this.analyseTweets(temp);
          let rs = [];
          let tp = temp.slice(0, 10);
          tp.forEach((val, index) => {
            rs.push(<Tweet key={index} data={val} />);
          });
          this.setState({
            loading: false,
            tweets: temp,
            currItems: rs,
            currentPage: 1,
            topuser: ob.topuser,
            topcount: ob.topcount,
            toplinks: ob.toplinks,
          });
        });
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }

  domain_from_url = (url) => {
    let result;
    let match;
    if (
      (match = url.match(
        // eslint-disable-next-line
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
      ))
    ) {
      result = match[1];
      // eslint-disable-next-line
      if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
        result = match[1];
      }
    }
    return result;
  };

  analyseTweets = (tweets) => {
    let userobj = new Map();
    let linkobj = new Map();
    tweets.forEach((val, index) => {
      if (val.entities.urls.length > 0) {
        val.entities.urls.forEach((vl, ind) => {
          if (vl.display_url.slice(0, 24) !== "twitter.com/i/web/status") {
            const key = this.domain_from_url(vl.expanded_url).toLowerCase();
            if (linkobj.has(key)) {
              linkobj.set(key, linkobj.get(key) + 1);
            } else {
              linkobj.set(key, 1);
            }
            const obj = {
              name: val.user.name,
              screen_name: val.user.screen_name,
              pic: val.user.profile_image_url_https,
            };
            if (userobj.has(obj.screen_name)) {
              userobj.set(obj.screen_name, [
                obj,
                userobj.get(obj.screen_name)[1] + 1,
              ]);
            } else {
              userobj.set(obj.screen_name, [obj, 1]);
            }
          }
        });
      }
    });
    let m = 0;
    let obj = {};
    userobj.forEach((user, index) => {
      const curr = user[0];
      const count = user[1];
      if (count > m) {
        m = count;
        obj = curr;
      }
    });
    return { topuser: obj, topcount: m, toplinks: linkobj };
  };

  handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  handleLogin = () => {
    window.open("http://localhost:5000/auth/twitter", "_self");
  };

  handleLogout = () => {
    Axios.delete("/tweets")
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

  renderButton = () => {
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
          {this.renderButton()}
        </div>
      </nav>
    );
  };

  changeCurrentPage = (numPage) => {
    let temp = this.state.tweets.slice(numPage * 10 - 10, numPage * 10);
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

  renderTopUser = () => {
    if (this.state.loading === true) {
      return <Loader />;
    } else {
      return (
        <TopUser data={this.state.topuser} topcount={this.state.topcount} />
      );
    }
  };

  renderTopLinks = () => {
    if (this.state.loading === true) {
      return <Loader />;
    } else {
      return <TopLinks data={this.state.toplinks} />;
    }
  };

  renderTabs = () => {
    if (this.state.authenticated) {
      return (
        <div className="container">
          <Pills />
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
              {this.renderTopUser()}
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              {this.renderTopLinks()}
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
