const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

const createFolder = expressAsyncHandler(async (req, res) => {
  const { foldername } = req.body;
  await prisma.folder.create({
    data: {
      foldername,
    },
  });
  res.redirect("/files");
});

module.exports = { createFolder };
