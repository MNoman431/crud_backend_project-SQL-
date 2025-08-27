// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/db.config.js";

// export class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   },
//   {
//     sequelize,
//     modelName: "User",
//   }
// );



// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/db.config.js";
// import Product from "./product.js"; // import product

// export class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//   },
//   {
//     sequelize,
//     modelName: "User",
//     tableName: "users", // 👈 force lowercase
//   }
// );

// // Association
// User.hasMany(Product, { foreignKey: "userId" });



import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
