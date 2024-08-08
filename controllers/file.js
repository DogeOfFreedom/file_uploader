const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");
const https = require("https");
const { Writable } = require("stream");

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

  fetch(url)
    .then((response) => {
      const ws = Writable.toWeb(fs.createWriteStream("public/tmp/img.png"));
      return response.body.pipeTo(ws);
    })
    .then(() => {
      res.download("public/tmp/img.png", (err) => {
        if (err) {
          console.log(err);
        } else {
          // Delete after it's sent
          fs.unlink("public/tmp/img.png", (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // https version
  // https.get(url, (response) => {
  //   const writeStream = fs.createWriteStream("public/tmp/img.png");
  //   const stream = response.pipe(writeStream);
  //   stream.on("finish", () => {
  //     // Once finished, send file to user
  //     res.download("public/tmp/img.png", (err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         // Delete after it's sent
  //         fs.unlink("public/tmp/img.png", (err) => {
  //           if (err) {
  //             console.log(err);
  //           }
  //         });
  //       }
  //     });
  //   });
  // });
});

module.exports = { renderSpecificFile, downloadFile };
