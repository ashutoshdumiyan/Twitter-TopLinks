const router = require("express").Router();
const Tweets = require("../models/tweet-model");

// This route will fetch all of the user's stored tweets
router.get("/", async (req, res) => {
  try {
    let tweets = await Tweets.find({ userid: req.user.twitterId });
    res.json({ tweets: tweets });
  } catch (error) {
    res.json({ error });
  }
});

// This route will delete user's tweets when the user click logout
router.delete("/", async (req, res) => {
  Tweets.remove({ userid: req.user.twitterId }, (err, data) => {
    if (!err) {
      console.log(data);
    }
  });
});

module.exports = router;
