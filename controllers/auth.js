const passport = require("passport");

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/signup");
  }
};

const authenticateUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const { username, password } = req.body;
      return res.render("login", {
        username,
        password,
        error: "Incorrect User Details",
      });
    }
    return req.login(user, () => res.redirect("/files"));
  })(req, res, next);
};

module.exports = { checkAuth, authenticateUser };
