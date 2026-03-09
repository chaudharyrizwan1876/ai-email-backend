const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, "signature-" + Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });

router.post("/signature-image", upload.single("image"), (req, res) => {

  res.json({
    success: true,
    imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
  });

});

module.exports = router;