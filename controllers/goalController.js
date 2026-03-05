const db = require("../config/db");

// Create Goal (with Free vs Pro limit)
exports.createGoal = (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const userPlan = req.user.plan;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const checkSql = "SELECT COUNT(*) as count FROM goals WHERE user_id = ?";

  db.query(checkSql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error checking goal limit" });
    }

    const goalCount = results[0].count;

    if (userPlan === "free" && goalCount >= 3) {
      return res.status(403).json({
        message: "Free plan limit reached. Upgrade to Pro for unlimited goals."
      });
    }

    const insertSql = "INSERT INTO goals (user_id, title, description) VALUES (?, ?, ?)";

    db.query(insertSql, [userId, title, description], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating goal" });
      }

      res.status(201).json({ message: "Goal created successfully" });
    });
  });
};

// Get User Goals
exports.getGoals = (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM goals WHERE user_id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching goals" });
    }

    res.json(results);
  });
};

// Delete Goal
exports.deleteGoal = (req, res) => {
  const goalId = req.params.id;
  const userId = req.user.id;

  const sql = "DELETE FROM goals WHERE id = ? AND user_id = ?";

  db.query(sql, [goalId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting goal" });
    }

    res.json({ message: "Goal deleted successfully" });
  });
};


// Update Goal Progress
exports.updateGoal = (req, res) => {

  const goalId = req.params.id;
  const { progress } = req.body;
  const userId = req.user.id;

  const safeProgress = Math.max(0, Math.min(100, progress));

  const sql = "UPDATE goals SET progress = ? WHERE id = ? AND user_id = ?";

  db.query(sql, [safeProgress, goalId, userId], (err, result) => {

    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ message: "Error updating goal" });
    }

    res.json({ message: "Goal updated successfully" });

  });

};

exports.updateGoal = (req, res) => {

const goalId = req.params.id;
const userId = req.user.id;

const { title, description, deadline } = req.body;

const sql = `
UPDATE goals 
SET title = ?, description = ?, deadline = ?
WHERE id = ? AND user_id = ?
`;

db.query(sql, [title, description, deadline, goalId, userId], (err,result)=>{

if(err){
return res.status(500).json({message:"Error updating goal"});
}

res.json({message:"Goal updated successfully"});

});

};