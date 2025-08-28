
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

class Product extends Model {}

Product.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export default Product;
