const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const dropDB = async () => {
  await prisma.file.deleteMany({});
  await prisma.folder.deleteMany({});
  await prisma.user.deleteMany({});
};

const populateUser = async () => {
  const usernames = ["test", "user1"];
  const passwords = ["123", "321"];
  const ids = ["1", "2"];
  for (let i = 0; i < passwords.length; i += 1) {
    bcrypt.hash(passwords[i], 10, async (err, hashedPassword) => {
      if (err) {
        throw new Error("Error hashing populate db passwords");
      }
      await prisma.user.create({
        data: {
          id: ids[i],
          username: usernames[i],
          password: hashedPassword,
        },
      });
    });
  }
};

const createFolder1Files = async () => {
  // Folder 1 Files
  await prisma.file.create({
    data: {
      filename: "file 1",
      size: 123213,
      folderId: 1,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 2",
      size: 123213,
      folderId: 1,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 3",
      size: 123213,
      folderId: 1,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
};

const createFolder2Files = async () => {
  // Folder 2 Files
  await prisma.file.create({
    data: {
      filename: "afile 1",
      size: 123213,
      folderId: 2,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "bfile 2",
      size: 123213,
      folderId: 2,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "cfile 3",
      size: 123213,
      folderId: 2,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
};

const createRootFiles = async () => {
  // Root Files
  await prisma.file.create({
    data: {
      filename: "R file 1",
      size: 123213,
      folderId: null,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "R file 2",
      size: 123213,
      folderId: null,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "R file 3",
      size: 123213,
      folderId: null,
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
    },
  });
};

const createUser1Folders = async () => {
  await prisma.folder.create({
    data: {
      id: "1",
      foldername: "test folder 1",
      userId: "1",
    },
  });
  await prisma.folder.create({
    data: {
      id: "2",
      foldername: "pictures",
      userId: "1",
    },
  });
  await prisma.folder.create({
    data: {
      id: "5",
      foldername: "nested folder 1",
      userId: "1",
      folder: "1",
    },
  });
  await prisma.folder.create({
    data: {
      id: "6",
      foldername: "nested folder 2",
      userId: "1",
      folder: "1",
    },
  });
  await prisma.folder.create({
    data: {
      id: "7",
      foldername: "nested folder 3",
      userId: "1",
      folder: "6",
    },
  });
  await prisma.folder.create({
    data: {
      id: "8",
      foldername: "nested folder 4",
      userId: "1",
      folder: "7",
    },
  });
  await prisma.folder.create({
    data: {
      id: "9",
      foldername:
        "looooooooooooooooooooooooooooooooooooooooooooooooong nested folder 5",
      userId: "1",
      folder: "8",
    },
  });
};

const createUser2Folders = async () => {
  await prisma.folder.create({
    data: {
      id: "3",
      foldername: "classified",
      userId: "2",
    },
  });
  await prisma.folder.create({
    data: {
      id: "4",
      foldername: "down right diabolical",
      userId: "2",
    },
  });
};

const populateFilesAndFolder = async () => {
  await prisma.folder.deleteMany({});
  await prisma.file.deleteMany({});

  await createUser1Folders();
  await createUser2Folders();

  // await createFolder1Files();
  // await createFolder2Files();
  // await createRootFiles();
};

const populateDB = async (req, res) => {
  await dropDB();
  await populateUser();
  await populateFilesAndFolder();
  res.sendStatus(200);
};

module.exports = { populateDB };
