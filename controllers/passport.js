const passport = require("passport");
const LocalStrategy = require("passport-local");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Setup
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Check if user exists
      const user = await prisma.user.findFirst({ where: { username } });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      // Check if password is correct
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user); // User verified
    } catch (err) {
      return done(err);
    }
  })
);

// stores info in the session data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// retrieves the user info based on the user id stored in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
