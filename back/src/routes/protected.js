import express from "express";
import authMiddleware from   "../middleware/authMiddleware.js"; // ✅ Ensure .js extension

const router = express.Router();

// Protected route for the dashboard
router.get("/dashboard", authMiddleware, (req, res) => {
  
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});

// ✅ Protected Route (Example: User Profile)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

export default router; // ✅ Use ES6 export
