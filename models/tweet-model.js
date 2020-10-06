const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Tweet schema
const tweetSchema = new Schema({
  userid: String,
  tweets: [mongoose.Schema.Types.Mixed],
});

const Tweets = mongoose.model("tweets", tweetSchema);

module.exports = Tweets;
