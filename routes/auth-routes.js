const router = require("express").Router();
const passport = require("passport");

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

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "authentication failed",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
