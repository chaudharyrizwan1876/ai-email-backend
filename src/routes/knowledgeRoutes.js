const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Knowledge = require("../models/Knowledge");

const router = express.Router();

/* ---------------- MULTER CONFIG ---------------- */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/knowledge");
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

/* ---------------- ROUTES ---------------- */

/**
 * POST /knowledge
 * Upload PDF + title
 * Automatically extracts text from PDF
 */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title and PDF file are required",
      });
    }

    // Read uploaded PDF file
    const fileBuffer = fs.readFileSync(req.file.path);

    // Extract text from PDF
    const pdfData = await pdfParse(fileBuffer);

    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from PDF",
      });
    }

    // Save to MongoDB
    const knowledge = await Knowledge.create({
      title,
      content: extractedText,
      filePath: req.file.path,
    });

    res.json({
      success: true,
      knowledge,
    });
  } catch (err) {
    console.error("SAVE KNOWLEDGE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to save knowledge",
    });
  }
});

/**
 * GET /knowledge
 * Fetch all knowledge entries
 */
router.get("/", async (req, res) => {
  try {
    const knowledge = await Knowledge.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      knowledge,
    });
  } catch (err) {
    console.error("FETCH KNOWLEDGE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch knowledge",
    });
  }
});

module.exports = router;
