const express = require("express");
const Email = require("../models/Email");

const router = express.Router();

/**
 * GET /emails
 * Fetch emails from MongoDB (FAST)
 */
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find()
      .sort({ date: -1 })
      .limit(50);

    const formattedEmails = emails.map((email) => {
      let cleanBody = email.emailBody || "";

      // 🔹 Remove excessive whitespace
      cleanBody = cleanBody
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      // 🔹 Limit to 5000 characters
      if (cleanBody.length > 5000) {
        cleanBody =
          cleanBody.substring(0, 5000) +
          "\n\n--- Email truncated for display ---";
      }

      return {
        _id: email._id,
        from: email.from,
        subject: email.subject,
        body: cleanBody, // frontend compatibility
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
