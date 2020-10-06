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
const path = require("path");

// Connect to MongoDB Atlas cloud database
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

// Use the cookie session middleware
app.use(
  cookieSession({
    name: "session",
    keys: [keys.cookiekey],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Use the cookie parser middleware
app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up CORS
app.use(
  cors({
    origin: "https://intense-beyond-79161.herokuapp.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Import our routes
app.use("/auth", authRoutes);
app.use("/tweets", tweetRoutes);

// static assets will be served in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Set server port number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
