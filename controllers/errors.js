const { validationResult } = require("express-validator");

const checkForErrors = (req, res, next) => {
  const errorObj = validationResult(req);
  if (!errorObj.isEmpty()) {
    const errorMsg = errorObj.errors[0].msg;
    res.json({
      message: errorMsg,
    });
  } else {
    next();
  }
};

module.exports = checkForErrors;
