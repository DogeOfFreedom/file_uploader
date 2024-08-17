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
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 2",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 4",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 5",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 6",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 7",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 8",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 9",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 10",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 11",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 12",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 13",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file dfszdf3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fDzsfile 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filUDe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file FMNV 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiFVYKVe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filCVM CVe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filBMVBM HKe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file.HHKJ 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fileCVN 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiH,VH,le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil N,MNe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiGJGIHKle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiWETle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiZQle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fi13.514le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file4254 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fi523513le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil213213e 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil3463457u5e 1",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file3467347 2",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 346343",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file346346 4",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "f3463474ile 5",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "d64file 6",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filsseysee 7",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil45yyet5he 8",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file35u35er 9",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil2424e 10",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "f3sehgsile 11",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "34y3443file 12",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fidsdfdfle 13",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filqwrqwrqwre dfszdf3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fDzsw4yseetfile 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filwewetggrsUDe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file w4ygeFMNV 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiFVYsweygseKVe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filCVMw4ysey CVe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filBM3ursdhuVBM HKe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file.HHsdhsKJ 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filesehgCVN 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiH,VH46ijdt,le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil Nsyhse,MNe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiGJGIGFahgHKle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiWdrjETle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiZw4tyweyhQle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fi1ejsrhfxh3.514le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fildrjhdste4254 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fi5235dfw4ey13le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil21drhsd3213e 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });

  await prisma.file.create({
    data: {
      filename: "file3gfhkghk5u35er 9",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filfkfg2424e 10",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "f3sehgsidr423le 11",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "34y344322file 12",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fidsdf1111dfle 13",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filqwr111qwrqwre dfszdf3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fDzsw4y111seetfile 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filwewe3423tggrsUDe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file w4yge124FMNV 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiFVYsweyg1265152seKVe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filCVMw4yse11y CVe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "filBM3urs1dhuVBM HKe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file.HHs1dhsKJ 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil1esehgCVN 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiH,V1H46ijdt,le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fil Nsyhs1e,MNe 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiGJG1IGFahgHKle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiWdrj1ETle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fiZ1w4tyweyhQle 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "fi11ejsrhfxh3.514le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "1fildrjhdste4254 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "f1i5235dfw4ey13le 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "f1il21drhsd3213e 3",
      size: 123213,
      folderId: "1",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
};

const createFolder2Files = async () => {
  // Folder 2 Files
  await prisma.file.create({
    data: {
      filename: "file 1",
      size: 123213,
      folderId: "2",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 2",
      size: 123213,
      folderId: "2",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
    },
  });
  await prisma.file.create({
    data: {
      filename: "file 3",
      size: 123213,
      folderId: "2",
      url: "https://res.cloudinary.com/dhtsrj5lb/image/upload/v1723013609/rchxnwp8isficsghgqvr.jpg",
      userId: "1",
      type: "jpg",
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
      userId: "1",
      type: "jpg",
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

  await createFolder1Files();
  await createFolder2Files();
  await createRootFiles();
};

const populateDB = async (req, res) => {
  await dropDB();
  await populateUser();
  await populateFilesAndFolder();
  res.sendStatus(200);
};

module.exports = { populateDB };
