import app from "./app.js";
import { sequelize } from "./config/db.config.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

// Test DB connection and sync models
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // Sync models (use { alter: true } in dev for auto-update)
    // await sequelize.sync();
    // console.log("✅ Models synchronized");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

startServer();
