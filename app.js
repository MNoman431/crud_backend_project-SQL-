import express from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser";



const app = express();
app.use(cookieParser());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use((err, req, res, next) => {
  console.error("🔥 Error Handler:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Something went wrong"
  });
});

export default app;
