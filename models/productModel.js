// import { Model, DataTypes } from "sequelize";
// import {sequelize} from "../config/db.config.js"; // apna sequelize instance

// class Product extends Model {}

// Product.init({
//   name: DataTypes.STRING,
//   description: DataTypes.TEXT,
//   price: DataTypes.FLOAT
// }, {
//   sequelize,
//   modelName: "Product"
// });

// export default Product;



// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/db.config.js"; // apna sequelize instance
// import { User } from "./user.js"; // user import karna zaroori hai

// class Product extends Model {}

// Product.init(
//   {
//     name: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     price: DataTypes.FLOAT,
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "users", // 👈 lowercase table name
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: "Product",
//     tableName: "products", // 👈 force lowercase
//   }
// );

// // Association
// Product.belongsTo(User, { foreignKey: "userId" });

// export default Product;




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
