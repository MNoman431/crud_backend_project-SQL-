
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  // token cookie se read karo
  const token = req.cookies.token;
  console.log("Cookie token =>", token);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded data (id, email, etc.)
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
