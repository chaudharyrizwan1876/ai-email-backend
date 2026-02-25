const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./src/app");
const { fetchEmails } = require("./src/services/imapService");

const PORT = process.env.PORT || 5000;

// 🔹 MongoDB connect FIRST
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // 🔥 BACKGROUND IMAP SYNC (Every 60 seconds)
    const startEmailSync = () => {
      console.log("Starting background email sync...");

      // Run immediately on server start
      fetchEmails().catch((err) =>
        console.error("Initial IMAP sync error:", err.message)
      );

      // Then run every 60 seconds
      setInterval(() => {
        console.log("Running scheduled IMAP sync...");
        fetchEmails().catch((err) =>
          console.error("Scheduled IMAP sync error:", err.message)
        );
      }, 60 * 1000); // 60 seconds
    };

    startEmailSync();

    // 🔹 Start server AFTER DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} (without MongoDB connection)`
      );
    });
  });
