require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");   // ✅ ENABLED
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);   // ✅ ENABLED

app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected dashboard 🚀",
    user: req.user
  });
});

app.get("/", (req, res) => {
  res.send("CareerOS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});