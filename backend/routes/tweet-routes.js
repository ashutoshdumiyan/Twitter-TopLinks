const router = require("express").Router();
const Tweets = require("../models/tweet-model");

router.get("/", async (req, res) => {
  try {
    let tweets = await Tweets.find({ userid: req.user.twitterId });
    res.json({ tweets: tweets });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    Tweets.deleteMany({ userid: req.user.twitterId });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
