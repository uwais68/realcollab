import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("Authorization Header:", token); // Debugging log
    
    if (!token) return res.status(403).json({ error: "Access denied. No token provided." });

    // Ensure token starts with "Bearer "
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ error: "Invalid token format" });
    }
    console.log(process.env.JWT_SECRET_KEY)
    console.log(tokenParts[1])

    // Verify JWT
    const decoded = jwt.decode(tokenParts[1], process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;

