const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
exports.register = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {

    // Check if email already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], async (err, results) => {

      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";

      db.query(insertSql, [name, email, hashedPassword], (err, result) => {

        if (err) {
          return res.status(500).json({ message: "Registration failed" });
        }

        res.status(201).json({
          message: "User registered successfully"
        });

      });

    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


// ================= LOGIN =================
exports.login = (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, plan: user.plan_type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  });

};


// ================= UPGRADE TO PRO =================
exports.upgradeToPro = (req, res) => {

  const userId = req.user.id;

  const sql = "UPDATE users SET plan_type = 'pro' WHERE id = ?";

  db.query(sql, [userId], (err, result) => {

    if (err) {
      return res.status(500).json({ message: "Upgrade failed" });
    }

    const newToken = jwt.sign(
      { id: userId, plan: "pro" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Upgraded to Pro successfully",
      token: newToken
    });

  });

};