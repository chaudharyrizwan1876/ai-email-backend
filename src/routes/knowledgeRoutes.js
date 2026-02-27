const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Knowledge = require("../models/Knowledge");

const router = express.Router();

/* ===============================
   ENSURE UPLOAD FOLDER EXISTS
================================= */

const uploadDir = path.join(__dirname, "../uploads/knowledge");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ===============================
   MULTER CONFIG
================================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

/* ===============================
   POST /knowledge/upload
   Upload PDF
================================= */

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(fileBuffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF",
      });
    }

    const knowledge = await Knowledge.create({
      title: req.file.originalname,
      content: extractedText,
      filePath: req.file.path,
    });

    res.json({
      success: true,
      file: knowledge,
    });

  } catch (err) {
    console.error("UPLOAD KNOWLEDGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to upload PDF",
    });
  }
});

/* ===============================
   GET /knowledge
================================= */

router.get("/", async (req, res) => {
  try {
    const knowledge = await Knowledge.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      files: knowledge,
    });

  } catch (err) {
    console.error("FETCH KNOWLEDGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch knowledge",
    });
  }
});

/* ===============================
   DELETE /knowledge/:id
================================= */

router.delete("/:id", async (req, res) => {
  try {
    const knowledge = await Knowledge.findById(req.params.id);

    if (!knowledge) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Delete physical file
    if (knowledge.filePath && fs.existsSync(knowledge.filePath)) {
      fs.unlinkSync(knowledge.filePath);
    }

    // Delete DB entry
    await Knowledge.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "File deleted successfully",
    });

  } catch (err) {
    console.error("DELETE KNOWLEDGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete file",
    });
  }
});

module.exports = router;