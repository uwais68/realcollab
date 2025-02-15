import express from "express";
const taskRoutes = express.Router();

taskRoutes.get("/", (req, res) => {
  res.send("Task route is working!");
});

export default taskRoutes; // ✅ Ensure `default` export
