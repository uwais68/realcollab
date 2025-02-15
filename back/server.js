import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js"; // ✅ Ensure correct path
import sendOTP from "./src/services/otpService.js";

// ✅ Import Routes (Ensure filenames match exactly)
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import protectedRoutes from "./src/routes/protected.js"; // Import the protected routes
import userRoutes from "./src/routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Initialize App
const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Ensure JSON parsing is enabled

// Connect to MongoDB
connectDB();


// ✅ Use Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/protected", protectedRoutes); // Use the protected routes
app.use("/api/otp", sendOTP);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ✅ Basic Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Test route to check if the server is working
app.put("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

// ✅ Check if /api/auth/login route is available
app.post("/api/auth/login", (req, res) => {
  res.send("Login route reached");
});

// Handle Port Already in Use Error
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${server.address().port}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(`Port ${PORT} is in use. Trying another port...`);
    app.listen(0, () => console.log(`Server started on a new port`));
  } else {
    console.error("Server error:", err);
  }
});

