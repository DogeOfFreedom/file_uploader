const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { Writable } = require("stream");

const prisma = new PrismaClient();

const uploadFile = expressAsyncHandler(async (req, res) => {
  const { originalname, size, path } = req.file;
  const { id } = req.user;
  const { folderId } = req.query;

  // Upload files to cloudinary
  const { url } = await cloudinary.uploader
    .upload(path, {
      resource_type: "auto",
    })
    .catch((e) => {
      console.log(e);
    });

  // remove file once uploaded
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    }
  });

  if (!folderId) {
    await prisma.file.create({
      data: {
        filename: originalname,
        size,
        url,
        folderId: null,
        userId: id,
      },
    });
    res.redirect("/files");
  } else {
    await prisma.file.create({
      data: {
        filename: originalname,
        size,
        url,
        folderId,
        userId: id,
      },
    });
    res.redirect(`/files?folderId=${folderId}`);
  }
});

const getFilePath = expressAsyncHandler(async (folder) => {
  const parentFolderId = folder.folder;
  if (parentFolderId) {
    const parentFolder = await prisma.folder.findUnique({
      where: {
        id: parentFolderId,
      },
    });
    return `${await getFilePath(parentFolder)}/${folder.foldername}`;
  }
  return `/${folder.foldername}`;
});

const renderFilesPage = expressAsyncHandler(async (req, res) => {
  const { folderId } = req.query;
  const userId = String(req.user.id);
  let dirpath = "Current Path: /root";
  let files = [];
  let folders = [];

  if (folderId) {
    files = await prisma.file.findMany({
      where: { folderId, userId },
    });
    folders = await prisma.folder.findMany({
      where: {
        folder: folderId,
        userId,
      },
    });
    const currentFolder = await prisma.folder.findUnique({
      where: { id: folderId, userId },
    });
    dirpath += await getFilePath(currentFolder);
    res.render("files", { folders, files, dirpath, currentFolder });
  } else {
    // In root folder
    files = await prisma.file.findMany({
      where: {
        folderId: null,
        userId,
      },
    });
    folders = await prisma.folder.findMany({
      where: {
        folder: null,
        userId,
      },
    });
    res.render("files", { folders, files, dirpath });
  }
});

const renderSpecificFile = expressAsyncHandler(async (req, res) => {
  const { fileId } = req.query;
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
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
      id: fileId,
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

const deleteFile = expressAsyncHandler(async (req, res) => {
  const { fileId, folderId } = req.query;
  await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
  res.redirect(`/files?folderId=${folderId}`);
});

const updateFile = expressAsyncHandler(async (req, res) => {
  const { filename } = req.body;
  const { fileId } = req.query;
  await prisma.file.update({
    where: {
      id: fileId,
    },
    data: {
      filename,
    },
  });
  res.redirect(`/files/file?fileId=${fileId}`);
});

const doesFileExist = expressAsyncHandler(async (req, res) => {
  const { filename } = req.query;
  const file = await prisma.file.findFirst({
    where: {
      filename,
    },
  });
  if (file) {
    res.json({
      exists: true,
    });
  } else {
    res.json({
      exists: false,
    });
  }
});

module.exports = {
  uploadFile,
  renderFilesPage,
  renderSpecificFile,
  downloadFile,
  getFilePath,
  deleteFile,
  updateFile,
  doesFileExist,
};
