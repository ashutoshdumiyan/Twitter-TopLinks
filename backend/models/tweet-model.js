const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  userid: String,
  tweet: [mongoose.Schema.Types.Mixed],
});

const Tweets = mongoose.model("tweets", tweetSchema);

module.exports = Tweets;
