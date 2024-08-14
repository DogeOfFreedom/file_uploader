const router = require("express").Router();
const multer = require("multer");
const { body } = require("express-validator");
const { checkAuth } = require("../controllers/auth");
const {
  uploadFile,
  renderFilesPage,
  renderSpecificFile,
  downloadFile,
  deleteFile,
} = require("../controllers/file");
const {
  createFolder,
  checkIfFolderExists,
  doesFolderExist,
  deleteFolder,
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
    .custom(async (value) => {
      if (value === "") {
        return Promise.resolve();
      }
      const exists = await checkIfFolderExists(value);
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
router.get("/folder/exists", doesFolderExist);

// Directory
router.get("/files", renderFilesPage);

// Specific File Page
router.get("/files/file", renderSpecificFile);

// Download File
router.get("/files/file/download", downloadFile);

// Delete File
router.post("/file/delete", deleteFile);

// Delete Folder
router.post("/folder/delete", deleteFolder);

module.exports = router;
