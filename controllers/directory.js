const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const renderFileDirectory = async (req, res) => {
  // Get all files in the root directory
  const rootFiles = await prisma.file.findMany({
    where: {
      folderId: null,
    },
  });

  // Get all folders
  const folders = await prisma.folder.findMany({
    include: {
      files: true,
    },
  });
  res.render("directory", { files: rootFiles, folders });
};

module.exports = { renderFileDirectory };
