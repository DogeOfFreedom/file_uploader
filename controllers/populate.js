const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const populateUser = async () => {
  await prisma.user.deleteMany({});
  const usernames = ["test", "user2"];
  const passwords = ["123", "09wsegyu"];
  for (let i = 0; i < passwords.length; i += 1) {
    bcrypt.hash(passwords[i], 10, async (err, hashedPassword) => {
      if (err) {
        throw new Error("Error hashing populate db passwords");
      }
      await prisma.user.create({
        data: {
          username: usernames[i],
          password: hashedPassword,
        },
      });
    });
  }
};

const populateFolder = async () => {
  await prisma.folder.deleteMany({});
  await prisma.file.deleteMany({});

  // Make Folders
  await prisma.folder.create({
    data: {
      id: 1,
      foldername: "test folder 1",
    },
  });
  await prisma.folder.create({
    data: {
      id: 2,
      foldername: "pictures",
    },
  });

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

const populateDB = async (req, res) => {
  await populateUser();
  await populateFolder();
  res.sendStatus(200);
};

module.exports = { populateDB };
