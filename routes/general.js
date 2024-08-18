const router = require("express").Router();
const { body } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const { populateDB } = require("../controllers/populate");
const { createUser } = require("../controllers/users");
const { checkForErrors } = require("../controllers/validation");
const { authenticateUser } = require("../controllers/auth");

const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.redirect("/files");
});

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
        // username not taken
        return true;
      }
      throw new Error("Username taken");
    })
    .withMessage("Username already taken"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  checkForErrors,
  createUser,
  authenticateUser
);

// Login POST
router.post("/login", authenticateUser);

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/signup");
  });
});

if (process.env.ENV === "development") {
  router.get("/populate", populateDB);

  router.get("/test", async (req, res) => {
    const folder = await prisma.folder.findUnique({
      where: {
        id: "1",
      },
    });
    // console.log(folder);
    res.send(folder);
  });
}

module.exports = router;
