const router = require("express").Router();
const passport = require("passport");
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const { populateDB } = require("../controllers/populate");
const { createUser } = require("../controllers/users");
const { checkForErrors } = require("../controllers/validation");

const prisma = new PrismaClient();

// Sign up
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Login
router.get("/login", (req, res) => {
  res.render("login");
});

// Sign Up POST
router.post(
  "/signup",
  body("username")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Name must be between 1 and 20 characters long")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: { username: value },
      });
      if (!user) {
        return true;
      }
      return false;
    })
    .withMessage("Usernsgseame already taken"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  checkForErrors,
  createUser
);

// Login POST
router.post("/login", (req, res, next) => {
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
    return req.login(user, () => res.redirect("/upload"));
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/signup");
  });
});

router.get("/test", async (req, res) => {
  await prisma.user.deleteMany({});
  const users = await prisma.user.findMany({});
  res.send(users);
});

if (process.env.ENV === "development") {
  router.get("/populate", populateDB);
}

module.exports = router;
