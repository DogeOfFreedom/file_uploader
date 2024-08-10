const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { Writable } = require("stream");

const prisma = new PrismaClient();

const uploadFile = expressAsyncHandler(async (req, res) => {
  const { originalname, size, path } = req.file;
  const { folder } = req.body;

  // Upload files to cloudinary
  const { url } = await cloudinary.uploader.upload(path, {
    resource_type: "image",
  });

  const existingFolder = await prisma.folder.findUnique({
    where: {
      foldername: folder,
    },
    select: {
      id: true,
    },
  });

  if (!existingFolder) {
    await prisma.file.create({
      data: {
        filename: originalname,
        size,
        url,
        folderId: null,
      },
    });
  } else {
    const { id } = existingFolder;
    await prisma.file.create({
      data: {
        filename: originalname,
        size,
        url,
        folderId: id,
      },
    });
  }

  // remove file once uploaded
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    }
  });

  res.redirect("/upload");
});

const renderFilesPage = expressAsyncHandler(async (req, res) => {
  const { folderId } = req.query;
  let files = [];

  if (folderId) {
    files = await prisma.file.findMany({
      where: { folderId: Number(folderId) },
    });
    res.render("files", { folders: [], files });
  } else {
    files = await prisma.file.findMany({
      where: {
        folderId: null,
      },
    });
    const folders = await prisma.folder.findMany({});
    res.render("files", { folders, files });
  }
});

const renderSpecificFile = expressAsyncHandler(async (req, res) => {
  const { fileId } = req.query;
  const file = await prisma.file.findUnique({
    where: {
      id: Number(fileId),
    },
  });
  file.createdAt = new Date(file.createdAt).toDateString();
  res.render("file", { file });
});

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

module.exports = {
  uploadFile,
  renderFilesPage,
  renderSpecificFile,
  downloadFile,
};
