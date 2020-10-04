import React, { Component } from "react";

class Tweet extends Component {
  render() {
    const tweet = this.props.data;
    return (
      <div className="tweet">
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
        <div className="body">{tweet.text}</div>
        <div className="footer">
          <a
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
          >
            View Tweet
          </a>
        </div>
      </div>
    );
  }
}

export default Tweet;
