/* eslint-disable import/newline-after-import */
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const path = require("path");

const port = 3002;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// dotenv
require("dotenv").config();

// Session
app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

// Passport
require("./controllers/passport");

// Routes
const router = require("./routes/general");
app.use(router);
const protect = require("./routes/protected");
app.use(protect);

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Internal Server Error");
});
