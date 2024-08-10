const router = require("express").Router();
const multer = require("multer");
const { checkAuth } = require("../controllers/auth");
const {
  uploadFile,
  renderFilesPage,
  renderSpecificFile,
  downloadFile,
} = require("../controllers/file");
const { createFolder } = require("../controllers/folder");

const upload = multer({ dest: "public/uploads/" });

// All routes are protected
router.use(checkAuth);

// file upload POST
router.post("/file", upload.single("file"), uploadFile);

// Create folder POST
router.post("/folder", createFolder);

// Directory
router.get("/files", renderFilesPage);

// Specific File Page
router.get("/files/file", renderSpecificFile);

// Download File
router.get("/files/file/download", downloadFile);

module.exports = router;
