const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const goalController = require("../controllers/goalController");

router.post("/", authMiddleware, goalController.createGoal);
router.get("/", authMiddleware, goalController.getGoals);
router.delete("/:id", authMiddleware, goalController.deleteGoal);
router.put("/:id", authMiddleware, goalController.updateGoal);

module.exports = router;