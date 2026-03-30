const express = require("express");
const Email = require("../models/Email");

const router = express.Router();

function extractLatestReply(text = "") {
  if (!text) return "";

  const splitPatterns = [
    /On .*wrote:/i,
    /From:/i,
    /-----Original Message-----/i,
  ];

  for (let pattern of splitPatterns) {
    const match = text.match(pattern);
    if (match) {
      return text.substring(0, match.index).trim();
    }
  }

  return text.trim();
}

router.get("/", async (req, res) => {
  try {

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
        body: extractLatestReply(cleanBody), // ✅ FIX APPLIED
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