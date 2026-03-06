const db = require("../config/db");

/* ===============================
   CREATE GOAL
================================ */

exports.createGoal = (req, res) => {

  const { title, description, deadline } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  /* STEP 1: GET USER PLAN */

  const planSql = "SELECT plan_type FROM users WHERE id = ?";

  db.query(planSql, [userId], (err, planResult) => {

    if (err) {
      console.error("Plan fetch error:", err);
      return res.status(500).json({ message: "Error fetching user plan" });
    }

    if (!planResult.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPlan = planResult[0].plan_type || "free";

    /* STEP 2: COUNT USER GOALS */

    const countSql = "SELECT COUNT(*) as count FROM goals WHERE user_id = ?";

    db.query(countSql, [userId], (err, results) => {

      if (err) {
        console.error("Goal count error:", err);
        return res.status(500).json({ message: "Error checking goal limit" });
      }

      const goalCount = results[0].count;

      /* STEP 3: FREE PLAN LIMIT (UPDATED TO 5) */

      if (userPlan === "free" && goalCount >= 5) {
        return res.status(403).json({
          message: "Free plan limit reached. Upgrade to Pro for unlimited goals."
        });
      }

      /* STEP 4: CREATE GOAL */

      const insertSql =
        "INSERT INTO goals (user_id, title, description, deadline, progress) VALUES (?, ?, ?, ?, 0)";

      db.query(
        insertSql,
        [userId, title, description || null, deadline || null],
        (err, result) => {

          if (err) {
            console.error("Create goal error:", err);
            return res.status(500).json({ message: "Error creating goal" });
          }

          res.status(201).json({
            message: "Goal created successfully",
            goalId: result.insertId
          });

        }
      );

    });

  });

};



/* ===============================
   GET USER GOALS
================================ */

exports.getGoals = (req, res) => {

  const userId = req.user.id;

  const sql = "SELECT * FROM goals WHERE user_id = ?";

  db.query(sql, [userId], (err, results) => {

    if (err) {
      console.error("Fetch goals error:", err);
      return res.status(500).json({ message: "Error fetching goals" });
    }

    const goals = results.map(goal => ({
      ...goal,
      _id: goal.id
    }));

    res.json({
      goals: goals,
      limit: 5
    });

  });

};



/* ===============================
   DELETE GOAL
================================ */

exports.deleteGoal = (req, res) => {

  const goalId = req.params.id;
  const userId = req.user.id;

  const sql = "DELETE FROM goals WHERE id = ? AND user_id = ?";

  db.query(sql, [goalId, userId], (err, result) => {

    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Error deleting goal" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ message: "Goal deleted successfully" });

  });

};



/* ===============================
   UPDATE GOAL
================================ */

exports.updateGoal = (req, res) => {

  const goalId = req.params.id;
  const userId = req.user.id;

  const { title, description, deadline, progress } = req.body;

  const safeProgress =
    progress !== undefined
      ? Math.max(0, Math.min(100, progress))
      : null;

  const sql = `
    UPDATE goals
    SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      deadline = COALESCE(?, deadline),
      progress = COALESCE(?, progress)
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [title, description, deadline, safeProgress, goalId, userId],
    (err, result) => {

      if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Error updating goal" });
      }

      res.json({ message: "Goal updated successfully" });

    }
  );

};