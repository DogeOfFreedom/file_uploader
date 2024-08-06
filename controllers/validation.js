const { validationResult } = require("express-validator");

const checkForErrors = (req, res, next) => {
  const errorsObj = validationResult(req);

  if (!errorsObj.isEmpty()) {
    const firstErrorMsg = errorsObj.errors[0].msg;
    const { username, password, confirmPassword } = req.body;
    res.render("index", {
      username,
      password,
      confirmPassword,
      error: firstErrorMsg,
    });
  } else {
    next();
  }
};

module.exports = { checkForErrors };
