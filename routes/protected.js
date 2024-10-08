const router = require("express").Router();
const multer = require("multer");
const { body } = require("express-validator");
const { checkAuth } = require("../controllers/auth");
const {
  uploadFile,
  renderSpecificFile,
  downloadFile,
  deleteFile,
  updateFile,
  doesFileExist,
  renderDirectory,
} = require("../controllers/file");
const {
  createFolder,
  checkIfFolderExists,
  doesFolderExist,
  deleteFolder,
  updateFolder,
} = require("../controllers/folder");
const checkForErrors = require("../controllers/errors");

const upload = multer({ dest: "public/uploads/" });

// All routes are protected
router.use(checkAuth);

// file upload POST
router.post("/file", upload.single("file"), uploadFile);

// Create folder POST
router.post(
  "/folder",
  body("foldername")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Foldername cannot be empty")
    .custom(async (value, { req }) => {
      if (value === "") {
        return Promise.resolve();
      }
      const { folderId } = req.query;
      const { id } = req.user;
      const exists = await checkIfFolderExists(value, folderId, id);
      if (exists) {
        return Promise.reject();
      }
      return Promise.resolve();
    })
    .withMessage("Folder already exists"),
  checkForErrors,
  createFolder
);

// Folder exists check
router.post("/folder/exists", doesFolderExist);

// Directory
router.get("/files", renderDirectory);

// Specific File Page
router.get("/files/file", renderSpecificFile);

// Download File
router.get("/files/file/download", downloadFile);

// Delete File
router.post("/file/delete", deleteFile);

// Delete Folder
router.post("/folder/delete", deleteFolder);

// Update File
router.post(
  "/file/update",
  body("filename")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Filename cannot be empty"),
  checkForErrors,
  updateFile
);

// Check if file name already exists
router.post("/file/exists", doesFileExist);

// Update Folder
router.post(
  "/folder/update",
  body("foldername")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Foldername cannot be empty"),
  checkForErrors,
  updateFolder
);

module.exports = router;
