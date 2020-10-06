const router = require("express").Router();
const passport = require("passport");

// Send successful response if authentication is successful
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "authentication successful",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({ error: new Error("failed to authenticate") });
  }
});

// Send failure message if authentication fails
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "authentication failed",
  });
});

// Logout the user and then redirect
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://intense-beyond-79161.herokuapp.com");
});

// Authenticate user from twitter using passport
router.get("/twitter", passport.authenticate("twitter"));

// Redirect user according to their twitter authentication results (pass or fail)
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: "https://intense-beyond-79161.herokuapp.com",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
