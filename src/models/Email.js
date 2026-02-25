const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    from: String,
    subject: String,
    emailBody: String,
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", emailSchema);
