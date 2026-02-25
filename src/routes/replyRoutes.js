const express = require("express");
const Reply = require("../models/Reply");

const router = express.Router();

/**
 * POST /replies
 * Save AI reply
 */
router.post("/", async (req, res) => {
  try {
    const { from, subject, emailBody, aiReply } = req.body;

    if (!aiReply) {
      return res.status(400).json({
        success: false,
        message: "AI reply is required",
      });
    }

    const reply = await Reply.create({
      from,
      subject,
      emailBody,
      aiReply,
    });

    res.json({
      success: true,
      reply,
    });
  } catch (err) {
    console.error("SAVE REPLY ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to save reply",
    });
  }
});

/**
 * GET /replies
 * Fetch saved replies
 */
router.get("/", async (req, res) => {
  try {
    const replies = await Reply.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      replies,
    });
  } catch (err) {
    console.error("FETCH REPLIES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch replies",
    });
  }
});

module.exports = router;
