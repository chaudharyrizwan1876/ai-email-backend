const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const aiRoutes = require("./routes/aiRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");
const replyRoutes = require("./routes/replyRoutes");
const signatureRoutes = require("./routes/signatureRoutes");

// ✅ NEW
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

/* ================= MIDDLEWARES ================= */

app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */

/* serve uploaded images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */

app.use("/auth", authRoutes);
app.use("/emails", emailRoutes);
app.use("/ai", aiRoutes);
app.use("/knowledge", knowledgeRoutes);
app.use("/replies", replyRoutes);

/* signature APIs */
app.use("/signature", signatureRoutes);

/* image upload API */
app.use("/upload", uploadRoutes);

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Support Backend is running",
  });
});

/* ================= 404 ================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

module.exports = app;