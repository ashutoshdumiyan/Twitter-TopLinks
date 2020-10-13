const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create user schema
const userSchema2 = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  token: String,
  tokenSecret: String,
});

const User2 = mongoose.model("user2", userSchema2);

module.exports = User2;
