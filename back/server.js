import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import   connectDB   from "./src/config/db.js"; // ✅ Ensure correct path
import  sendOTP  from "./src/services/otpService.js";

// Load environment variables
dotenv.config();

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// ✅ Import Routes (Ensure filenames match exactly)
import authRoutes from "./src/routes/authRoutes.js";  
import taskRoutes from "./src/routes/taskRoutes.js";  
import chatRoutes from "./src/routes/chatRoutes.js";  
import protectedRoutes from "./src/routes/protected.js";  // Import the protected routes

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/protected", protectedRoutes);  // Use the protected routes
app.use("/api/otp", sendOTP);
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

