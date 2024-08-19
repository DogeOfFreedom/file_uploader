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
  if (!folderId) {
    res.redirect(`/files`);
  } else {
    res.redirect(`/files?folderId=${folderId}`);
  }
});

const checkIfFolderExists = expressAsyncHandler(
  async (foldername, folderId, userId) => {
    const id = folderId === undefined ? null : folderId;
    const folder = await prisma.folder.findFirst({
      where: { foldername, folder: id, userId },
    });
    if (folder) {
      return true;
    }
    return false;
  }
);

const doesFolderExist = expressAsyncHandler(async (req, res) => {
  const { foldername, folderId } = req.query;
  const { id } = req.user;
  const exists = await checkIfFolderExists(foldername, folderId, id);
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

const deleteFolder = expressAsyncHandler(async (req, res) => {
  const { folderId, prevFolder } = req.query;
  await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });
  if (prevFolder !== "null") {
    res.redirect(`/files?folderId=${prevFolder}`);
  } else {
    res.redirect("/files");
  }
});

const updateFolder = expressAsyncHandler(async (req, res) => {
  const { foldername } = req.body;
  const { folderId } = req.query;
  await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      foldername,
    },
  });
  res.redirect(`/files?folderId=${folderId}`);
});

module.exports = {
  createFolder,
  checkIfFolderExists,
  doesFolderExist,
  deleteFolder,
  updateFolder,
};
