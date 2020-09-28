const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./keys");
const User = require("../models/user-model");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.consumerkey,
      consumerSecret: keys.consumersecret,
      callbackURL: "/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str,
      });
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
