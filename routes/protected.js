const router = require("express").Router();
const multer = require("multer");
const { checkAuth } = require("../controllers/auth");
const { uploadFile, renderUploadPage } = require("../controllers/upload");
const { renderFileDirectory } = require("../controllers/directory");
const { createFolder } = require("../controllers/folder");
const { renderSpecificFile, downloadFile } = require("../controllers/file");

const upload = multer({ dest: "public/uploads/" });

// All routes are protected
router.use(checkAuth);

// file upload
router.get("/upload", renderUploadPage);

// file upload POST
router.post("/file", upload.single("file"), uploadFile);

// Create folder
router.post("/folder", createFolder);

router.get("/files", renderFileDirectory);

router.get("/files/file", renderSpecificFile);

router.get("/files/download", downloadFile);

module.exports = router;
