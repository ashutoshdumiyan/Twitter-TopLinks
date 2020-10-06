const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const moment = require("moment");
const keys = require("./keys");
const User = require("../models/user-model");
const Tweets = require("../models/tweet-model");
const Twit = require("twit");

// Passport twitter strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.consumerkey,
      consumerSecret: keys.consumersecret,
      callbackURL:
        "https://intense-beyond-79161.herokuapp.com/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      // Initialize twit
      let T = new Twit({
        consumer_key: keys.consumerkey,
        consumer_secret: keys.consumersecret,
        access_token: token,
        access_token_secret: tokenSecret,
      });
      // Fetch user's tweets from twitter using twit
      T.get(
        "statuses/home_timeline",
        { count: 1000 },
        async (err, data, response) => {
          let tweets = [];
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
              console.log("changed");
              tweets.push(val);
            }
          });
          // Save tweets in the database
          await new Tweets({
            userid: profile._json.id_str,
            tweets: tweets,
          }).save();
        }
      );

      // Find user if already exists
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str,
      });
      // Save user in the database
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("user deserialize failed"));
    });
});
