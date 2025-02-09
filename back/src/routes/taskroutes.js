import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Task route is working!");
});

export default router; // ✅ Ensure `default` export
