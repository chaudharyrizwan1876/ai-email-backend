const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./src/app");
const { fetchEmails } = require("./src/services/imapService");
const User = require("./src/models/User");

const PORT = process.env.PORT || 5000;

/* ================= TEST ROUTE (ADD THIS) ================= */

app.get("/test", (req, res) => {
  res.send("Node API working");
});

/* ================= ADMIN AUTO SEED ================= */

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        console.log("⚠ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
        return;
      }

      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });

      console.log("✅ Default admin created successfully");
      console.log(`📧 Admin Email: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log("✔ Admin already exists");
    }
  } catch (err) {
    console.error("Admin seed error:", err.message);
  }
};

/* ================= MONGODB CONNECT ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await seedAdmin();

    /* ================= EMAIL SYNC ================= */

    const startEmailSync = () => {
      console.log("Starting background email sync...");

      fetchEmails().catch((err) =>
        console.error("Initial IMAP sync error:", err.message)
      );

      setInterval(() => {
        console.log("Running scheduled IMAP sync...");

        fetchEmails().catch((err) =>
          console.error("Scheduled IMAP sync error:", err.message)
        );
      }, 60 * 1000);
    };

    startEmailSync();

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