const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const moment = require("moment");
const keys = require("./keys");
const User = require("../models/user-model");
const Tweets = require("../models/tweet-model");
const Twit = require("twit");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.consumerkey,
      consumerSecret: keys.consumersecret,
      callbackURL:
        "https://intense-beyond-79161.herokuapp.com/auth/twitter/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      let T = new Twit({
        consumer_key: keys.consumerkey,
        consumer_secret: keys.consumersecret,
        access_token: token,
        access_token_secret: tokenSecret,
      });
      let totalTweets = [];

      // T.get(
      //   "friends/ids",
      //   { user_id: profile._json.id_str, stringify_ids: true, count: 5000 },
      //   (err, data1, response) => {
      //     data1.ids.push(profile._json.id_str);
      //     const l = data1.ids.length;

      //     let counter = 0;
      //     for (let i = 0; i < l; i++) {
      //       const id = data1.ids[i];

      //       T.get(
      //         "statuses/user_timeline",
      //         { user_id: id, count: 3200 },
      //         (error, data, res) => {
      //           counter++;
      //           for (let j = 0; j < data.length; j++) {
      //             let date = moment(
      //               data[j].created_at,
      //               "dd MMM DD HH:mm:ss ZZ YYYY",
      //               "en"
      //             );

      //             let date1 = new Date();
      //             let date2 = moment(date1, "dd MMM DD HH:mm:ss ZZ YYYY", "en");
      //             let change = date2.diff(date, "days");
      //             if (change < 7) {
      //               totalTweets.push(data[j]);
      //             }
      //           }
      //           if (totalTweets.length > 0 && counter === i) {
      //             console.log(totalTweets.length);
      //             if (totalTweets.length <= 1000) {
      //               new Tweets({
      //                 userid: profile._json.id_str,
      //                 tweets: totalTweets,
      //               }).save();
      //             } else {
      //               for (let u = 0; u < totalTweets.length; u += 1000) {
      //                 let temparr = totalTweets.slice(u, u + 1000);
      //                 new Tweets({
      //                   userid: profile._json.id_str,
      //                   tweets: temparr,
      //                 }).save();
      //               }
      //             }
      //           }
      //         }
      //       );
      //     }
      //   }
      // );

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
            let date1 = new Date();
            let date2 = moment(date1, "dd MMM DD HH:mm:ss ZZ YYYY", "en");
            let change = date2.diff(date, "days");
            if (change < 7) {
              console.log("changed");
              tweets.push(val);
            }
          });
          await new Tweets({
            userid: profile._json.id_str,
            tweets: tweets,
          }).save();
        }
      );

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
