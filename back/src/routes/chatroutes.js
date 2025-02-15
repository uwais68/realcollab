import express from "express";
const chatRoutes = express.Router();

chatRoutes.get("/", (req, res) => {
  res.send("Chat route is working!");
});

export default chatRoutes; // ✅ Ensure `default` export

