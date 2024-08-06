const router = require("express").Router();
const multer = require("multer");
const { checkAuth } = require("../controllers/auth");
const { uploadFile } = require("../controllers/upload");

const upload = multer({ dest: "public/uploads/" });

// All routes are protected
router.use(checkAuth);

// file upload
router.get("/upload", (req, res) => {
  res.render("upload");
});

// file upload POST
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
