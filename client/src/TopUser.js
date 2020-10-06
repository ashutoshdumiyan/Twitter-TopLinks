import React, { Component } from "react";

// The Top User component
// Displays the top user (user who has shared most links)
// Receives props from App component and simply displays the user in a nice layout
class TopUser extends Component {
  render() {
    const { data, topcount } = this.props;
    return (
      <React.Fragment>
        <h2 style={{ textAlign: "center", color: "#309eb6" }}>
          User with the most links shared is:
        </h2>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img className="profilepic" src={data.pic} alt="Profile" />
          <span>{data.name}</span>
          <br />
          <br />
          <strong>&nbsp;&nbsp;&nbsp;with {topcount} links shared</strong>
          <br />
          <br />
          <a
            href={`https://twitter.com/${data.screen_name}`}
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
      </React.Fragment>
    );
  }
}

export default TopUser;
