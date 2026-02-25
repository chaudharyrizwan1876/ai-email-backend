const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    from: { type: String },
    subject: { type: String },
    emailBody: { type: String },
    aiReply: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
