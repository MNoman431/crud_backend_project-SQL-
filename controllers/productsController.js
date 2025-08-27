import Product from "../models/productModel.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({
      name,
      price,
      description,
      userId: req.user.id
    });
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Products
// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.json({ products });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get only logged-in user's products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { userId: req.user.id }   // 👈 sirf logged-in user ke products
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Optional: only creator can update
    if (product.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await product.update({ name, price, description });
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
