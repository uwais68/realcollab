import express from "express"; 
import rateLimit from "express-rate-limit"; // ✅ Import rate limiter
import { register, login, generateOTP, verifyOTP } from "../controllers/authController.js";

const router = express.Router();

// ✅ Rate limiter to prevent brute-force attacks (5 requests per 15 minutes)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 requests per window per IP
  message: { error: "Too many login attempts, please try again later." },
  headers: true,
});

// ✅ Apply rate limiter to login and OTP routes
router.post("/register", register);
router.post("/login", authLimiter, login);
router.post("/generate-otp", authLimiter, generateOTP);
router.post("/verify-otp", verifyOTP);

export default router;
