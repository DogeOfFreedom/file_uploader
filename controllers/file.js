/* eslint-disable no-use-before-define */
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
  let { filename } = req.body;
  const fileExtensionSeperatorIndex = originalname.lastIndexOf(".");
  const type = originalname.substr(fileExtensionSeperatorIndex + 1); // +1 to remove the '.'

  // User did not enter custom file name
  if (!filename) {
    filename = originalname.substr(0, fileExtensionSeperatorIndex);
  }

  // Does the file already exist?
  const exists = await checkIfFileExists(filename, folderId, type);
  if (exists) {
    return res.json({
      message: "filename already taken",
    });
  }

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

  // Add file to database
  await prisma.file.create({
    data: {
      filename,
      type,
      size,
      url,
      folderId,
      userId: id,
    },
  });

  // Redirect
  if (!folderId) {
    return res.redirect("/files");
  }
  return res.redirect(`/files?folderId=${folderId}`);
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

const renderDirectory = expressAsyncHandler(async (req, res) => {
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
    res.render("directory", { folders, files, dirpath, currentFolder });
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
    res.render("directory", { folders, files, dirpath });
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
  const { url, filename, type } = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });

  const path = `public/tmp/${filename}.${type}`;

  fetch(url)
    .then((response) => {
      const ws = Writable.toWeb(fs.createWriteStream(path));
      return response.body.pipeTo(ws);
    })
    .then(() => {
      res.download(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          // Delete after it's sent
          fs.unlink(path, (e) => {
            if (e) {
              console.log(e);
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

const checkIfFileExists = expressAsyncHandler(
  async (filename, folderId, type) => {
    const id = folderId === "" ? null : folderId;
    const file = await prisma.file.findFirst({
      where: { filename, folder: id, type },
    });
    if (file) {
      return true;
    }
    return false;
  }
);

const doesFileExist = expressAsyncHandler(async (req, res) => {
  const { filename, folderId, type } = req.query;
  const exists = await checkIfFileExists(filename, folderId, type);
  if (exists) {
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
  renderDirectory,
  renderSpecificFile,
  downloadFile,
  getFilePath,
  deleteFile,
  updateFile,
  checkIfFileExists,
  doesFileExist,
};
