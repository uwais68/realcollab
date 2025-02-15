import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import updateProfile  from "../controllers/userController.js";

const userRoutes = express.Router();

// ✅ Route for Updating User Profile
userRoutes.put("/update-profile", authMiddleware, updateProfile);
  

export default userRoutes;
