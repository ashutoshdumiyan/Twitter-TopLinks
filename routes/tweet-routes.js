const router = require("express").Router();
const Tweets = require("../models/tweet-model");
const Twit = require("twit");
const moment = require("moment");
const keys = require("../config/keys");

// This route will fetch all of the user's stored tweets
router.get("/", async (req, res) => {
  // console.log(req.user);
  let tweets = [];
  try {
    tweets = await Tweets.find({ userid: req.user.twitterId });
    // Initialize twit
    if (tweets.length !== 0) {
      res.json({ tweets });
    } else {
      let T = new Twit({
        consumer_key: keys.consumerkey,
        consumer_secret: keys.consumersecret,
        access_token: req.user.token,
        access_token_secret: req.user.tokenSecret,
      });
      // Fetch user's tweets from twitter using twit
      T.get(
        "statuses/home_timeline",
        { count: 1000 },
        async (err, data, response) => {
          tweets = [];
          data.forEach((val, index) => {
            let date = moment(
              val.created_at,
              "dd MMM DD HH:mm:ss ZZ YYYY",
              "en"
            );
            // Filter tweets according to date
            // Take only past 7 days' tweets
            let date1 = new Date();
            let date2 = moment(date1, "dd MMM DD HH:mm:ss ZZ YYYY", "en");
            let change = date2.diff(date, "days");
            if (change < 7) {
              // console.log("changed");
              tweets.push(val);
            }
          });
          res.json({ tweets: [{ tweets: tweets }] });

          // Save tweets in the database
          await new Tweets({
            userid: req.user.twitterId,
            tweets: tweets,
          }).save();
        }
      );
    }
  } catch (error) {
    res.json({ tweets: [], error: true });
  }
});

// This route will delete user's tweets when the user click logout
router.delete("/", async (req, res) => {
  Tweets.remove({ userid: req.user.twitterId }, (err, data) => {
    if (!err) {
      console.log(data);
    }
  });
  res.send({ error: true });
});

module.exports = router;
