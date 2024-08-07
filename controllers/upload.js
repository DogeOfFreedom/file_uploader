const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

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

const renderUploadPage = async (req, res) => {
  // Get folders
  const folders = await prisma.folder.findMany({});
  res.render("upload", { folders });
};

module.exports = { uploadFile, renderUploadPage };
