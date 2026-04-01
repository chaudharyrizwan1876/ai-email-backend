const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ai-support-signatures",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// ✅ Upload route
router.post("/signature-image", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path, // ✅ Cloudinary URL
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
});

module.exports = router;