const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth-routes");
const tweetRoutes = require("./routes/tweet-routes");
const passportSetup = require("./config/passport-setup");
const app = express();

mongoose.connect(
  keys.dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to mongodb");
  }
);

app.use(
  cookieSession({
    name: "session",
    keys: [keys.cookiekey],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/tweets", tweetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
