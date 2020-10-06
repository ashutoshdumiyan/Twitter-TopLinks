import React, { Component } from "react";

class Tweet extends Component {
  render() {
    const tweet = this.props.data;
    return (
      <div className="card w-75">
        <div className="card-header">
          <div className="head">
            <img
              src={tweet.user.profile_image_url_https}
              className="profilepic"
              alt="Profile"
            />
            <div
              className="user"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div>
                <strong>{tweet.user.name}</strong>
              </div>
              <div>@{tweet.user.screen_name}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{tweet.text}</p>
        </div>
        <div className="card-footer text-muted">
          <a
            className="btn btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
          >
            Go to Tweet &#8599;
          </a>
        </div>
      </div>
    );
  }
}

export default Tweet;
