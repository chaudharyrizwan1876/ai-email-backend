const express = require("express");
const Email = require("../models/Email");

const router = express.Router();

function extractLatestReply(html = "") {
  if (!html) return "";

  const splitPatterns = [
    /<div class="gmail_quote"/i,
    /<blockquote class="gmail_quote"/i,
    /On .* wrote:/i,
    /From:/i,
    /-----Original Message-----/i,
  ];

  let result = html;

  for (let pattern of splitPatterns) {
    const matchIndex = result.search(pattern);
    if (matchIndex !== -1) {
      result = result.substring(0, matchIndex);
      break;
    }
  }

  return result.trim();
}

/**
 * GET /emails
 * Fetch emails from MongoDB (FULL BODY – NO TRUNCATION)
 */
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find()
      .sort({ date: -1 }); // ✅ limit removed

    const formattedEmails = emails.map((email) => {
      let cleanBody = email.emailBody || "";

      // 🔹 Normalize whitespace only (NO TRUNCATION)
      cleanBody = cleanBody
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      return {
        _id: email._id,
        from: email.from,
        subject: email.subject,
        body: extractLatestReply(cleanBody),
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