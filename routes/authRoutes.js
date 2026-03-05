const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
register,
login,
upgradeToPro,
getProfile
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.post("/upgrade", authMiddleware, upgradeToPro);

/* PROFILE ROUTE */

router.get("/profile", authMiddleware, getProfile);

module.exports = router;