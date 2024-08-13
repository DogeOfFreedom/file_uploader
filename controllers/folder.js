const { PrismaClient } = require("@prisma/client");
const expressAsyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

const createFolder = expressAsyncHandler(async (req, res) => {
  const { foldername } = req.body;
  const { folderId } = req.query;
  const { id } = req.user;
  await prisma.folder.create({
    data: {
      foldername,
      folder: folderId,
      userId: id,
    },
  });
  res.redirect(`/files?folderId=${folderId}`);
});

const checkIfFolderExists = async (foldername) => {
  const folder = await prisma.folder.findUnique({
    where: { foldername },
  });
  if (folder) {
    return true;
  }
  return false;
};

const doesFolderExist = async (req, res) => {
  const { foldername } = req.query;
  const exists = await checkIfFolderExists(foldername);
  if (exists) {
    res.json({
      exists: true,
    });
  } else {
    res.json({
      exists: false,
    });
  }
};

module.exports = { createFolder, checkIfFolderExists, doesFolderExist };
