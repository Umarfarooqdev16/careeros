const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, upgradeToPro } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// Protected upgrade route
router.post("/upgrade", authMiddleware, upgradeToPro);

module.exports = router;