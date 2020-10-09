import React, { Component } from "react";

// The Top User component
// Displays the top user (user who has shared most links)
// Receives props from App component and simply displays the user in a nice layout
class TopUser extends Component {
  renderUsers = (list) => {
    let res = [];
    let count = 0;
    list.forEach((val, index) => {
      if (count < 5) {
        res.push(
          <React.Fragment key={index}>
            {/* <h2 style={{ textAlign: "center", color: "#309eb6" }}>
            User with the most links shared is:
          </h2> */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <img className="profilepic" src={val[1][0].pic} alt="Profile" />
              <span>{val[0]}</span>
              <br />
              <br />
              <strong>&nbsp;&nbsp;&nbsp;with {val[1][1]} links shared</strong>
              <br />
              <br />
              <a
                href={`https://twitter.com/${val[1][0].screen_name}`}
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
      count += 1;
    });
    return res;
  };
  render() {
    const { data } = this.props;
    let sortable = [];
    for (let [key, value] of data) {
      sortable.push([key, value]);
    }
    sortable.sort((a, b) => {
      return b[1] - a[1];
    });
    return this.renderUsers(sortable);
  }
}

export default TopUser;
