// import  {User}  from "../models/userModel.js";
import { User } from "../models/index.js";

import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 2️⃣ Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 3️⃣ Minimum password length
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // 4️⃣ Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // 5️⃣ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 6️⃣ Create user
    const user = await User.create({ username, email, password: hashed });

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.log("ye err he ", err)
    res.status(500).json({   error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    const token = generateToken(user);

    // ✅ Set token in cookie
    res.cookie("token", token, {
      httpOnly: true, // frontend JS cannot access it (safe)
      secure: process.env.NODE_ENV === "production", // only https in production
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({ message: "Login successful", user: { id: user.id, email: user.email, username: user.username } ,token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};