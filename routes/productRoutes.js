import express from "express";
import { authenticate } from "../middleware/auth.js";
import { createProduct, getAllProducts, updateProduct, deleteProduct } from "../controllers/productsController.js";

const router = express.Router();

// Protected CRUD Routes
router.post("/", authenticate, createProduct);
router.get("/", authenticate, getAllProducts);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
