const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { populateDB } = require("../controllers/populate");

const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.render("index");
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
