const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    website: {
      type: String,
    },

    workingHours: {
      type: String,
    },

    photo: {
      type: String, // image url or base64
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Signature", signatureSchema);