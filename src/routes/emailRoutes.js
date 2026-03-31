const express = require("express");
const Email = require("../models/Email");
const { fetchEmails } = require("../services/imapService"); // ✅ ADDED

const router = express.Router();

function extractLatestReply(text = "") {
  if (!text) return "";

  // Normalize
  let clean = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Split into paragraphs
  const parts = clean.split("\n\n");

  // Take first 2–3 meaningful paragraphs
  let result = parts.slice(0, 3).join("\n\n");

  return result.trim();
}

router.get("/", async (req, res) => {
  try {

    // ✅ NEW: fetch latest emails in background (non-blocking)
    fetchEmails().catch(() => {});

    const emails = await Email.find().sort({ date: -1 });

    const formattedEmails = emails.map((email) => {
      let cleanBody = email.emailBody || "";

      cleanBody = cleanBody
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      return {
        _id: email._id,
        from: email.from,
        subject: email.subject,
        body: extractLatestReply(cleanBody), // ✅ SAME
        date: email.date,
      };
    });

    res.json({
      success: true,
      emails: formattedEmails,
    });

  } catch (err) {

    console.error("FETCH EMAILS ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emails",
    });

  }
});

module.exports = router;