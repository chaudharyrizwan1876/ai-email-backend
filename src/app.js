const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const aiRoutes = require("./routes/aiRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");
const replyRoutes = require("./routes/replyRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/emails", emailRoutes);
app.use("/ai", aiRoutes);
app.use("/knowledge", knowledgeRoutes);
app.use("/replies", replyRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Support Backend is running",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

module.exports = app;
