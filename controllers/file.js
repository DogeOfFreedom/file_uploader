const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const https = require("https");

const prisma = new PrismaClient();

const renderSpecificFile = async (req, res) => {
  const { fileId } = req.query;
  const file = await prisma.file.findUnique({
    where: {
      id: Number(fileId),
    },
  });
  res.render("file", { file });
};

const downloadFile = expressAsyncHandler(async (req, res) => {
  const { fileId } = req.query;

  // Get cloudinary url of file
  const { url } = await prisma.file.findUnique({
    where: {
      id: Number(fileId),
    },
  });

  https.get(url, (response) => {
    response.pipe(fs.createWriteStream("public/tmp/img.png"));
    res.download("public/tmp/img.png");
    fs.unlink("public/tmp/img.png", (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

module.exports = { renderSpecificFile, downloadFile };
