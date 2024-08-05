const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const populateDB = async (req, res) => {
  await prisma.user.deleteMany({});
  const usernames = ["test", "user2"];
  const passwords = ["123", "09wsegyu"];
  for (let i = 0; i < passwords.length; i += 1) {
    bcrypt.hash(passwords[i], 10, async (err, hashedPassword) => {
      if (err) {
        throw new Error("Error hashing populate db passwords");
      }
      await prisma.user.create({
        data: {
          username: usernames[i],
          password: hashedPassword,
        },
      });
    });
  }
  res.sendStatus(200);
};

module.exports = { populateDB };
