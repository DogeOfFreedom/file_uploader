const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash(
    password,
    10,
    expressAsyncHandler(async (err, hashedPassword) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const user = await prisma.user.create({
          data: { username, password: hashedPassword },
        });

        // Log
        console.log("User Created");
        console.log(user);

        next();
      }
    })
  );
};

module.exports = { createUser };
